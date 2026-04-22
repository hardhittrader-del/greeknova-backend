export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;

    const response = await fetch("https://api.fyers.in/api/v3/profile", {
      method: "GET",
      headers: {
        Authorization: token, // ✅ ONLY TOKEN
      },
    });

    const text = await response.text();

    return Response.json({
      raw: text,
    });

  } catch (err) {
    return Response.json({
      error: err.message,
    });
  }
}