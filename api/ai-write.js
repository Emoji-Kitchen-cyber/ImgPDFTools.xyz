export async function onRequestPost(context) {
  const { prompt } = await context.request.json();
  
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${context.env.ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: prompt })
    }
  );
  
  const data = await res.json();
  return new Response(JSON.stringify({ text: data.result.response }), {
    headers: { 'Content-Type': 'application/json' }
  });
}