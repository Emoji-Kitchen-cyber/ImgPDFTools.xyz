/**
 * Cloudflare Pages Function: functions/api/ai-write.js
 * 
 * SETUP REQUIRED:
 * 1. This file must be at: functions/api/ai-write.js  (inside /functions folder)
 * 2. In Cloudflare Dashboard → Pages → Settings → Functions → AI Bindings
 *    Add binding: Variable name = AI
 */

export async function onRequestPost(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Check AI binding exists
    if (!context.env.AI) {
      return new Response(
        JSON.stringify({ text: 'Error: AI binding not configured. Go to Cloudflare Dashboard → Pages → Settings → Functions → AI Bindings → Add binding with variable name "AI".' }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Parse body
    let prompt;
    try {
      const body = await context.request.json();
      prompt = body.prompt;
    } catch (e) {
      return new Response(
        JSON.stringify({ text: 'Error: Invalid request body.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ text: 'Error: No prompt provided.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Call Cloudflare AI — messages format (required for llama-3)
    const aiResponse = await context.env.AI.run(
      '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
      {
        messages: [
          {
            role: 'system',
            content: 'You are a professional blog writer and SEO content expert. Write clear, engaging, well-structured content. Use proper paragraphs.'
          },
          {
            role: 'user',
            content: prompt.trim()
          }
        ],
        max_tokens: 1024,
      }
    );

    // Log raw response for debugging (visible in CF Pages dashboard logs)
    console.log('[ai-write] raw response:', JSON.stringify(aiResponse));

    // Extract text — CF returns { response: "..." } for chat models
    let text = '';
    if (typeof aiResponse === 'string') {
      text = aiResponse;
    } else if (aiResponse?.response) {
      text = aiResponse.response;
    } else if (aiResponse?.text) {
      text = aiResponse.text;
    } else if (aiResponse?.choices?.[0]?.message?.content) {
      text = aiResponse.choices[0].message.content;
    } else if (aiResponse?.choices?.[0]?.text) {
      text = aiResponse.choices[0].text;
    } else {
      // Fallback: return raw so we can debug
      text = JSON.stringify(aiResponse);
    }

    text = text.trim();
    if (!text) {
      text = 'Error: AI returned empty response. Raw: ' + JSON.stringify(aiResponse);
    }

    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    console.error('[ai-write] error:', err);
    return new Response(
      JSON.stringify({ text: 'Error: ' + (err.message || 'Unknown server error') }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
