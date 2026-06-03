/**
 * Cloudflare Pages Function: /api/ai-write
 * Handles POST requests to generate blog/SEO content via Cloudflare AI.
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

    // Call Cloudflare AI
    const result = await context.env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      {
        prompt: prompt.trim(),
        max_tokens: 512,
      }
    );

    // The AI response may be a string or an object — handle both
    const text =
      typeof result === 'string'
        ? result
        : result.response || result.text || JSON.stringify(result);

    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
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
