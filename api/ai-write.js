export async function onRequestPost(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    // 1. AI binding check
    if (!context.env.AI) {
      return new Response(
        JSON.stringify({ text: 'Error: AI binding not found. Add binding in Cloudflare Dashboard → Settings → Functions → AI Bindings.' }),
        { status: 500, headers: corsHeaders }
      );
    }

    // 2. Parse request body safely
    let prompt;
    try {
      const body = await context.request.text();
      if (!body) throw new Error('Empty body');
      const parsed = JSON.parse(body);
      prompt = parsed.prompt?.trim();
    } catch (e) {
      return new Response(
        JSON.stringify({ text: 'Error: Invalid request. Please provide a prompt.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!prompt) {
      return new Response(
        JSON.stringify({ text: 'Error: Prompt is empty.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Call AI - this returns response object
    const aiResult = await context.env.AI.run(
      '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
      {
        messages: [
          { role: 'system', content: 'You are a professional writer. Write engaging content.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800
      }
    );

    // 4. Extract text - the result is an object like {response: "text"}
    let text = '';
    if (aiResult && aiResult.response) {
      text = aiResult.response;
    } else if (typeof aiResult === 'string') {
      text = aiResult;
    } else {
      text = JSON.stringify(aiResult);
    }

    // 5. Return plain JSON
    const responseJson = JSON.stringify({ text: text });
    return new Response(responseJson, { status: 200, headers: corsHeaders });

  } catch (err) {
    const errorJson = JSON.stringify({ text: 'Error: ' + (err.message || 'Unknown error') });
    return new Response(errorJson, { status: 500, headers: corsHeaders });
  }
}