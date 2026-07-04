export const onRequestGet: PagesFunction<{ AVATAR_STORAGE: KVNamespace }> = async (context) => {
  const fileHash = context.params.id as string;
  if (!fileHash) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const { value, metadata } = await context.env.AVATAR_STORAGE.getWithMetadata<{ type: string }>(fileHash, "arrayBuffer");

    if (!value) {
      return new Response("Image Not Found", { status: 404 });
    }

    const contentType = metadata?.type || "image/png";

    return new Response(value, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, immutable"
      }
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
