export const onRequestGet: PagesFunction<{ KIE_API_KEY: string }> = async (context) => {
  const apiKey = context.env.KIE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing KIE_API_KEY configuration." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const response = await fetch("https://api.kie.ai/api/v1/chat/credit", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.text();
    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
