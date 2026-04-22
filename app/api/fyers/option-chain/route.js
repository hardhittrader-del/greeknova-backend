export async function GET() {
  try {
    const token = process.env.FYERS_ACCESS_TOKEN;

    if (!token) {
      return Response.json({
        success: false,
        error: "Missing FYERS_ACCESS_TOKEN",
      });
    }

    const url = "https://api.fyers.in/api/v3/quotes?symbols=NSE:NIFTY50-INDEX";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return Response.json({
      success: true,
      data: data,
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}