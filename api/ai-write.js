export async function onRequestPost(context) {
  const { prompt } = await context.request.json();

  if (!prompt) {
    return new Response(JSON.stringify({ text: 'Error: No prompt' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${context.env.ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    }
  );

  const data = await res.json();
  
  return new Response(JSON.stringify({ text: data.result.response || 'No response' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}