export function validateApiKey(request) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey) {
    return Response.json(
      {
        success: false,
        message: "API key is required",
      },
      { status: 401 }
    );
  }

  if (!process.env.API_KEY || apiKey !== process.env.API_KEY) {
    return Response.json(
      {
        success: false,
        message: "Invalid API key",
      },
      { status: 403 }
    );
  }

  return null;
}