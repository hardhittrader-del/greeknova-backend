export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;

    if (!token) {
      return Response.json({
        success: false,
        error: "Missing FYERS_ACCESS_TOKEN",
      });
    }

    const appId = "358T0EI1TC-100";

    const response = await fetch(
      "https://api.fyers.in/api/v3/quotes?symbols=NSE:NIFTY50-INDEX",
      {
        method: "GET",
        headers: {
          Authorization: `${appId}:${token}`, // 🔥 FINAL FIX
        },
      }
    );

    const data = await response.json();

    return Response.json({
      success: true,
      data,
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}