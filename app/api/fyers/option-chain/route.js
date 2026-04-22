export async function GET() {
  try {
    const access_token = process.env.FYERS_ACCESS_TOKEN;

    if (!access_token) {
      return Response.json({
        success: false,
        error: "Missing FYERS_ACCESS_TOKEN",
      });
    }

    const response = await fetch(
      "https://api-t1.fyers.in/data/option-chain",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          symbol: "NSE:NIFTY50-INDEX",
          strikecount: 20,
          timestamp: "",
        }),
      }
    );

    const raw = await response.json();

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