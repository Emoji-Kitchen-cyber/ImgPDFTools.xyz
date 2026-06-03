export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ text: 'Error: No prompt provided' }));
    }

    // Use the most reliable, available model
    const answer = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      prompt: prompt,
      max_tokens: 512
    });

    // Response is always a string from this model
    const text = typeof answer === 'string' ? answer : (answer.response || JSON.stringify(answer));

    return new Response(JSON.stringify({ text: text }));

  } catch (err) {
    return new Response(JSON.stringify({ text: 'Error: ' + err.message }));
  }
}
