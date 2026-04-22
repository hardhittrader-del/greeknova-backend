export async function GET() {
  try {
    const access_token = process.env.FYERS_ACCESS_TOKEN;

    if (!access_token) {
      return Response.json({
        success: false,
        error: "Missing FYERS_ACCESS_TOKEN",
      });
    }

    const symbol = "NSE:NIFTY50-INDEX";

    const response = await fetch(
      `https://api.fyers.in/data-rest/v2/options-chain?symbol=${symbol}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

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