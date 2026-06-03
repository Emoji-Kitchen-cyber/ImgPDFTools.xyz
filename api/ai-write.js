export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ text: 'Error: No prompt provided' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${context.env.ACCOUNT_ID}/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${context.env.API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.success && data.result) {
      return new Response(JSON.stringify({ text: data.result.response }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ text: 'Error: ' + (data.errors?.[0]?.message || 'Unknown error') }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (err) {
    return new Response(JSON.stringify({ text: 'Error: ' + err.message }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}