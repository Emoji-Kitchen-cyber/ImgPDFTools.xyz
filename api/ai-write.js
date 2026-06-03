/**
 * Cloudflare Pages Function: /api/ai-write
 * Handles POST requests to generate blog/SEO content via Cloudflare AI.
 *
 * FIX: llama-3-8b-instruct requires "messages" array format, NOT "prompt".
 *       Also logs raw result to debug any future format changes.
 */
export async function onRequestPost(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Parse request body
    let prompt;
    try {
      const body = await context.request.json();
      prompt = body.prompt;
    } catch (parseError) {
      return new Response(
        JSON.stringify({ text: 'Error: Invalid JSON in request body' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return new Response(
        JSON.stringify({ text: 'Error: No prompt provided' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Call Cloudflare AI using MESSAGES format (required for llama-3-8b-instruct)
    const result = await context.env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      {
        messages: [
          {
            role: 'system',
            content: 'You are a professional blog writer and SEO content expert. Write clear, engaging, well-structured content based on the user\'s request. Use proper paragraphs and formatting.',
          },
          {
            role: 'user',
            content: prompt.trim(),
          },
        ],
        max_tokens: 1024,
      }
    );

    // Debug: log the raw result shape so we can see exactly what CF returns
    console.log('[ai-write] raw result type:', typeof result);
    console.log('[ai-write] raw result:', JSON.stringify(result));

    // Extract text — CF llama chat returns { response: "..." }
    let text = '';

    if (typeof result === 'string') {
      text = result;
    } else if (result && typeof result.response === 'string') {
      text = result.response;
    } else if (result && typeof result.text === 'string') {
      text = result.text;
    } else if (result && result.choices && result.choices[0]) {
      // OpenAI-compatible shape fallback
      text = result.choices[0].message?.content || result.choices[0].text || '';
    } else if (result !== null && result !== undefined) {
      text = JSON.stringify(result);
    }

    text = text.trim();

    if (!text) {
      // Last resort: return the raw stringified result so frontend can show something
      text = '[Debug] Raw AI result: ' + JSON.stringify(result);
    }

    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('[ai-write] error:', error);
    return new Response(
      JSON.stringify({ text: 'Error: ' + (error.message || 'Internal server error') }),
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * Handle CORS preflight OPTIONS requests
 */
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
