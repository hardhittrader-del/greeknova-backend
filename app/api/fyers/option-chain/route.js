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

    const raw = await response.json();

    // 🔥 CORE TRANSFORMATION (THIS IS YOUR ENGINE BASE)
    const chain = raw.data?.optionsChain || [];

    const structured = chain.map((strike) => ({
      strike: strike.strike_price,

      CE: {
        ltp: strike.call_option?.ltp,
        oi: strike.call_option?.oi,
        volume: strike.call_option?.volume,
        change_oi: strike.call_option?.change_oi,
      },

      PE: {
        ltp: strike.put_option?.ltp,
        oi: strike.put_option?.oi,
        volume: strike.put_option?.volume,
        change_oi: strike.put_option?.change_oi,
      },
    }));

    return Response.json({
      success: true,
      count: structured.length,
      data: structured,
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}