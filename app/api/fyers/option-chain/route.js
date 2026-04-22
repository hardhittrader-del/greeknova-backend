export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;

    if (!token) {
      return Response.json({
        success: false,
        error: "Missing token",
      });
    }

    // ✅ USE V2 QUOTES (STABLE + WORKS)
    const res = await fetch(
      "https://api.fyers.in/data-rest/v2/quotes?symbols=NSE:NIFTY50-INDEX",
      {
        method: "GET",
        headers: {
          Authorization: token, // ⚠️ NO Bearer
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