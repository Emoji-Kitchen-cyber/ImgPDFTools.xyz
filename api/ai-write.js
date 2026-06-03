export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    
    if (!prompt) {
      return new Response(JSON.stringify({ text: 'Error: No prompt' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await context.env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    return new Response(JSON.stringify({ text: result.response || 'No response' }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ text: 'Error: ' + err.message }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}