export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;
    const appId = "358T0EI1TC-100";

    if (!token) {
      return Response.json({
        success: false,
        error: "Missing token",
      });
    }

    const url = "https://api.fyers.in/api/v3/quotes?symbols=NSE:NIFTY50-INDEX";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${appId}:${token}`,
      },
    });

    const data = await response.json();

    return Response.json({
      success: true,
      data,
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}