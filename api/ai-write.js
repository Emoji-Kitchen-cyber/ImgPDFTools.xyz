export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    
    if (!body) {
      return new Response(JSON.stringify({ error: 'No data provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let prompt;
    try {
      const parsed = JSON.parse(body);
      prompt = parsed.prompt;
    } catch (e) {
      prompt = body;
    }

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'No prompt provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call Cloudflare AI
    const aiResponse = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.7
    });

    // Extract text from response
    let text = '';
    if (typeof aiResponse === 'string') {
      text = aiResponse;
    } else if (aiResponse && aiResponse.response) {
      text = aiResponse.response;
    } else if (aiResponse && aiResponse.result) {
      text = aiResponse.result;
    } else if (aiResponse && aiResponse.text) {
      text = aiResponse.text;
    } else {
      text = JSON.stringify(aiResponse);
    }

    // Send response
    const responseData = JSON.stringify({ text: text });
    
    return new Response(responseData, {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('AI Error:', error.message);
    return new Response(JSON.stringify({ error: 'Generation failed: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
