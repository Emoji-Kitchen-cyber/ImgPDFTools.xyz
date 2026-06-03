export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ text: 'Error: No prompt' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(
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

    const data = await response.json();
    
    // Handle different response formats
    let text = '';
    if (data.result && data.result.response) {
      text = data.result.response;
    } else if (data.result) {
      text = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
    } else if (data.response) {
      text = data.response;
    } else {
      text = 'No response from AI';
    }

    return new Response(JSON.stringify({ text: text }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ text: 'Error: ' + err.message }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}