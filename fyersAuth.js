const { fyersModel } = require("fyers-api-v3");

const fyers = new fyersModel();

fyers.setAppId("358T0EI1TC-100");

// 🔴 IMPORTANT — SET REDIRECT URI HERE
fyers.setRedirectUrl(
  "https://greeknovabeta.vercel.app/api/fyers/callback"
);

const authURL = fyers.generateAuthCode();

console.log("\nOPEN THIS URL IN BROWSER:\n");
console.log(authURL);