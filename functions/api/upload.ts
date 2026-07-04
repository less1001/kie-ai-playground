export const onRequestPost: PagesFunction<{ AVATAR_STORAGE: KVNamespace }> = async (context) => {
  try {
    const formData = await context.request.formData();
    const file = formData.get("file");
    
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file uploaded." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const buffer = await file.arrayBuffer();
    
    // Generate SHA-256 hash as the key
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const fileHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    
    const meta = {
      name: file.name,
      type: file.type || "image/png"
    };

    // Store in Cloudflare KV (expire in 7 days to conserve space)
    await context.env.AVATAR_STORAGE.put(fileHash, buffer, {
      metadata: meta,
      expirationTtl: 86400 * 7
    });

    const url = `/api/avatar/${fileHash}`;
    
    return new Response(JSON.stringify({ code: 200, url }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
