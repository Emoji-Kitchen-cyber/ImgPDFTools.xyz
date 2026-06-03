// Cloudflare Pages Function — Background Removal via Cloudflare AI
export async function onRequestPost(context) {
  try {
    const { image } = await context.request.json();

    if (!image) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call Cloudflare AI — @cf/black-forest-labs/flux-1-schnell for background removal
    const aiResponse = await context.env.AI.run('@cf/black-forest-labs/flux-1-schnell', {
      prompt: 'Remove background from this image, make background transparent, keep only the main subject',
      image: image,
      num_steps: 4,
      guidance_scale: 1.0,
      output_format: 'png'
    });

    return new Response(JSON.stringify({ image: aiResponse.image }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Cloudflare AI Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'AI processing failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
