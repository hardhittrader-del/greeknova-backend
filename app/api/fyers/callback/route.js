export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const auth_code = searchParams.get("auth_code");

    if (!auth_code) {
      return Response.json({
        success: false,
        error: "No auth_code received",
      });
    }

    const response = await fetch(
      "https://api.fyers.in/api/v3/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          appId: "358T0EI1TC", // ✅ WITHOUT -100 (CRITICAL FIX)
          code: auth_code,
          redirect_uri:
            "https://greeknovabeta.vercel.app/api/fyers/callback",
        }),
      }
    );

    const data = await response.json();

    return Response.json({
      success: true,
      fyers: data,
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}