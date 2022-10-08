const { OAuth2Client } = require("google-auth-library");

module.exports.generateOtp = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
module.exports.getDecodedOAuthJwtGoogle = async (token) => {
  //reference: https://stackoverflow.com/questions/68524360/how-can-i-decode-a-google-oauth-2-0-jwt-credential-token
  try {
    const client = new OAuth2Client(process.env.NODE_APP_GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NODE_APP_GOOGLE_CLIENT_ID,
    });
    // console.log("Ticket", ticket);
    return { success: true, data: ticket.payload };
  } catch (error) {
    return { success: false, data: error.message };
  }
};
