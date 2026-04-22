import crypto from "crypto";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const auth_code = searchParams.get("auth_code");

    if (!auth_code) {
      return Response.json({ error: "Missing auth_code" });
    }

    const appIdHash = crypto
      .createHash("sha256")
      .update(`${process.env.FYERS_APP_ID}:${process.env.FYERS_SECRET}`)
      .digest("hex");

    const response = await fetch(
      "https://api.fyers.in/api/v3/validate-authcode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          appIdHash,
          code: auth_code,
        }),
      }
    );

    const data = await response.json();

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