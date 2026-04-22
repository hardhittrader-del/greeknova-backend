export async function GET() {
  try {
    const access_token = process.env.FYERS_ACCESS_TOKEN;

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

    const raw = await response.json();

    // 🔴 RETURN FULL RAW DATA (IMPORTANT)
    return Response.json({
      success: true,
      raw,
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}