export async function GET() {
  const clientId = "358T0EI1TC-100";

  const redirectUri =
    "https://greeknova-backend.vercel.app/api/fyers/callback";

  const url =
    `https://api-t1.fyers.in/api/v3/generate-authcode?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&state=greeknova`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
    },
  });
}