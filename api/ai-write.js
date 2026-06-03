export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ text: 'Error: No prompt provided' }));
    }

    const answer = await context.env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [{ role: 'user', content: prompt }]
    });

    return new Response(JSON.stringify({ text: answer }));
  } catch (err) {
    return new Response(JSON.stringify({ text: 'Error: ' + err.message }));
  }
}
