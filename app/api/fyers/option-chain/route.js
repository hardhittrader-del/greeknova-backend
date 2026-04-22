import { getToken } from "@/utils/tokenStore";

export async function GET(req) {
  try {
    const token = getToken();

    if (!token) {
      return Response.json({
        success: false,
        error: "No access token. Login first.",
      });
    }

    const { searchParams } = new URL(req.url);

    // Default: NIFTY
    const symbol = searchParams.get("symbol") || "NSE:NIFTY50-INDEX";

    // Step 1: Get underlying LTP
    const quoteRes = await fetch(
      `https://api.fyers.in/api/v2/quotes?symbols=${symbol}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const quoteData = await quoteRes.json();

    const ltp = quoteData?.d?.[0]?.v?.lp;

    // Step 2: Get option chain
    const chainRes = await fetch(
      `https://api.fyers.in/api/v2/options-chain?symbol=${symbol}&strikecount=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const chainData = await chainRes.json();

    return Response.json({
      success: true,
      underlying: symbol,
      ltp,
      chain: chainData,
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}