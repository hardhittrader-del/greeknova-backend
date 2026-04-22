export async function GET() {
  try {
    const access_token = process.env.FYERS_ACCESS_TOKEN;

    if (!access_token) {
      return Response.json({
        success: false,
        error: "Missing FYERS_ACCESS_TOKEN",
      });
    }

    // 🔥 STEP 1 — GET SPOT PRICE (POST METHOD)
    const spotRes = await fetch(
      "https://api.fyers.in/api/v3/quotes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          symbols: "NSE:NIFTY50-INDEX",
        }),
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

    // 🔥 STEP 2 — CREATE STRIKES AROUND ATM
    const base = Math.round(spot / 50) * 50;

    const strikes = [];
    for (let i = -5; i <= 5; i++) {
      strikes.push(base + i * 50);
    }

    // ⚠️ TEMP expiry (we will automate later)
    const expiry = "25APR";

    const symbols = [];

    strikes.forEach((strike) => {
      symbols.push(`NSE:NIFTY${expiry}${strike}CE`);
      symbols.push(`NSE:NIFTY${expiry}${strike}PE`);
    });

    // 🔥 STEP 3 — FETCH OPTION DATA (POST METHOD)
    const quotesRes = await fetch(
      "https://api.fyers.in/api/v3/quotes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          symbols: symbols.join(","),
        }),
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