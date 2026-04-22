export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;

    if (!token) {
      return Response.json({
        success: false,
        error: "Missing token",
      });
    }

    const response = await fetch(
      "https://api.fyers.in/api/v3/quotes?symbols=NSE:NIFTY50-INDEX",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = await response.text();

    // 🔴 IMPORTANT: return raw text (not JSON)
    return Response.json({
      success: true,
      raw_response: text,
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}