export async function onRequestPost(context) {
  try {
    const { image } = await context.request.json();

    if (!image) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use @cf/runwayml/stable-diffusion-v1-5-inpainting for background removal
    const aiResponse = await context.env.AI.run(
      '@cf/runwayml/stable-diffusion-v1-5-inpainting',
      {
        prompt: 'transparent background, no background, isolated object',
        image: image,
        mask: image, // Using same image as mask for full removal
        num_steps: 20,
        guidance_scale: 7.5,
        strength: 1.0
      }
    );

    // Return the processed image as base64
    const base64Image = aiResponse.image || aiResponse;

    return new Response(JSON.stringify({ image: base64Image }), {
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
