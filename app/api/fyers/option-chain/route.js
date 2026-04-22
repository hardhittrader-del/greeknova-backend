export async function GET() {
  try {
    const access_token = process.env.FYERS_ACCESS_TOKEN;

    if (!access_token) {
      return Response.json({
        success: false,
        error: "Missing FYERS_ACCESS_TOKEN",
      });
    }

    // 🔥 Step 1: Fetch NIFTY spot
    const spotRes = await fetch(
      "https://api.fyers.in/data-rest/v2/quotes?symbols=NSE:NIFTY50-INDEX",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const spotData = await spotRes.json();
    const spot = spotData?.d?.[0]?.v?.lp;

    if (!spot) {
      return Response.json({
        success: false,
        error: "Failed to fetch spot price",
        spotData,
      });
    }

    // 🔥 Step 2: Generate strikes around ATM
    const base = Math.round(spot / 50) * 50;

    const strikes = [];
    for (let i = -5; i <= 5; i++) {
      strikes.push(base + i * 50);
    }

    // 🔥 Step 3: Build option symbols (weekly expiry example)
    const expiry = "25APR"; // ⚠️ update dynamically later

    const symbols = [];

    strikes.forEach((strike) => {
      symbols.push(`NSE:NIFTY${expiry}${strike}CE`);
      symbols.push(`NSE:NIFTY${expiry}${strike}PE`);
    });

    // 🔥 Step 4: Fetch quotes
    const quotesRes = await fetch(
      `https://api.fyers.in/data-rest/v2/quotes?symbols=${symbols.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const quotesData = await quotesRes.json();

    return Response.json({
      success: true,
      spot,
      strikes,
      raw: quotesData,
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}