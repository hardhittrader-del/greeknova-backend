export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;

    if (!token) {
      return Response.json({
        success: false,
        error: "Missing FYERS_ACCESS_TOKEN",
      });
    }

    // ✅ SIMPLE TEST CALL (NO COMPLEXITY)
    const res = await fetch(
      "https://api.fyers.in/api/v3/quotes?symbols=NSE:NIFTY50-INDEX",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

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