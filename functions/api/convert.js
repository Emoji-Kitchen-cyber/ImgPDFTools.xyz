// functions/api/convert.js — Cloudflare Pages Function
// PDF → DOCX via Adobe PDF Services API (hardened, production-grade)

const ADOBE = "https://pdf-services.adobe.io";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

// Block non-POST methods cleanly
export function onRequestGet() {
  return json({ error: "Method not allowed. Use POST." }, 405);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.ADOBE_CLIENT_ID || !env.ADOBE_CLIENT_SECRET) {
      return json({ error: "Server not configured (missing Adobe credentials)." }, 500);
    }

    // 1) Read incoming PDF bytes
    const inBuf = await request.arrayBuffer();
    if (!inBuf || inBuf.byteLength === 0) {
      return json({ error: "No file received. Please choose a PDF." }, 400);
    }
    if (inBuf.byteLength > 25 * 1024 * 1024) {
      return json({ error: "File too large (max 25 MB)." }, 413);
    }
    // FIX #1 — validate it's really a PDF (avoids Adobe CORRUPT_DOCUMENT)
    const head = new Uint8Array(inBuf.slice(0, 5));
    if (!(head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46)) {
      return json({ error: "This file is not a valid PDF (or is corrupted)." }, 400);
    }

    // 2) Access token
    const tokenRes = await fetch(`${ADOBE}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.ADOBE_CLIENT_ID,
        client_secret: env.ADOBE_CLIENT_SECRET,
      }),
    });
    if (!tokenRes.ok) {
      // FIX #5 — clear auth error
      return json({ error: "Conversion service authentication failed. Please check API keys." }, 502);
    }
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) return json({ error: "Could not obtain access token." }, 502);

    const auth = { Authorization: `Bearer ${accessToken}`, "x-api-key": env.ADOBE_CLIENT_ID };

    // 3) Create asset (get presigned upload URL)
    const assetRes = await fetch(`${ADOBE}/assets`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ mediaType: "application/pdf" }),
    });
    if (assetRes.status === 429) return quotaError();
    if (!assetRes.ok) return json({ error: await adobeMsg(assetRes, "Failed to prepare upload.") }, 502);
    const { uploadUri, assetID } = await assetRes.json();
    if (!uploadUri || !assetID) return json({ error: "Upload preparation failed." }, 502);

    // 4) Upload the PDF to the presigned URL (NO auth header here — it's presigned)
    const upRes = await fetch(uploadUri, {
      method: "PUT",
      headers: { "Content-Type": "application/pdf" },
      body: inBuf,
    });
    if (!upRes.ok) return json({ error: "File upload failed. Please try again." }, 502);

    // 5) Start Export job (PDF → DOCX, with OCR for scanned files)
    const jobRes = await fetch(`${ADOBE}/operation/exportpdf`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ assetID, targetFormat: "docx", ocrLang: "en-US" }),
    });
    if (jobRes.status === 429) return quotaError();
    if (jobRes.status !== 201) return json({ error: await adobeMsg(jobRes, "Could not start conversion.") }, 502);
    const pollUrl = jobRes.headers.get("location");
    if (!pollUrl) return json({ error: "Conversion job did not start correctly." }, 502);

    // 6) Poll until done (max ~50s; safe under subrequest limits)
    let downloadUri = null;
    for (let i = 0; i < 25; i++) {
      await sleep(2000);
      const pRes = await fetch(pollUrl, { headers: auth });
      if (pRes.status === 429) return quotaError();
      if (!pRes.ok) return json({ error: "Lost connection while converting." }, 502);
      const pData = await pRes.json();
      const status = String(pData.status || "").toLowerCase();

      if (status === "done") {
        // FIX #3 — robust downloadUri lookup (Adobe shapes vary)
        downloadUri =
          (pData.asset && pData.asset.downloadUri) ||
          pData.downloadUri ||
          (pData.outputs && pData.outputs[0] && pData.outputs[0].downloadUri) ||
          null;
        break;
      }
      if (status === "failed") {
        return json({ error: "Adobe could not convert this PDF. It may be encrypted or unsupported." }, 502);
      }
    }
    if (!downloadUri) return json({ error: "Conversion timed out. Try a smaller PDF." }, 504);

    // 7) Download the DOCX and stream it back to the browser
    const docxRes = await fetch(downloadUri);
    if (!docxRes.ok) return json({ error: "Could not retrieve the converted file." }, 502);
    const docxBuf = await docxRes.arrayBuffer();
    if (!docxBuf || docxBuf.byteLength === 0) return json({ error: "Received an empty result." }, 502);

    return new Response(docxBuf, {
      status: 200,
      headers: {
        ...CORS,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="converted.docx"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return json({ error: "Unexpected server error: " + String(err && err.message || err) }, 500);
  }
}

/* ---------- helpers ---------- */
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// FIX #2 — friendly quota / rate-limit message
function quotaError() {
  return json(
    { error: "Free monthly limit reached or too many requests. Please try again later." },
    429
  );
}

// FIX #4 — extract Adobe's real error message when available
async function adobeMsg(res, fallback) {
  try {
    const t = await res.text();
    const j = JSON.parse(t);
    if (j && j.error && j.error.message) return j.error.message;
    if (j && j.message) return j.message;
    return fallback;
  } catch (_) {
    return fallback;
  }
}