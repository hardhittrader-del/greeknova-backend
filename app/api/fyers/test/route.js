export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;
    const appId = "358T0EI1TC-100";

    const response = await fetch("https://api.fyers.in/api/v3/profile", {
      method: "GET",
      headers: {
        Authorization: `${appId}:${token}`,
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