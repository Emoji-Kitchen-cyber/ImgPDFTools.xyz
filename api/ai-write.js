export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'No prompt provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const aiResponse = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: 'You are a professional content writer. Write detailed, well-structured, engaging content. Use markdown formatting with headings, bullet points, and paragraphs.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1024,
      temperature: 0.7
    });

    // AI response can be in different formats — handle all cases
    let text = '';
    if (typeof aiResponse === 'string') {
      text = aiResponse;
    } else if (aiResponse.response) {
      text = aiResponse.response;
    } else if (aiResponse.choices && aiResponse.choices[0]) {
      text = aiResponse.choices[0].message?.content || aiResponse.choices[0].text || '';
    } else if (aiResponse.content) {
      text = aiResponse.content;
    } else {
      text = JSON.stringify(aiResponse);
    }

    return new Response(JSON.stringify({ text: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('AI Write Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Generation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
