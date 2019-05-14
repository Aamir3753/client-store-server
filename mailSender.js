const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const config = require("./config");

const oauth2Client = new OAuth2(
  config.google.clientId,
  config.google.clientSecret,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: config.google.refreshToken
});

const sendMail = (to, from, subject, body) => async (req, res, next) => {
  let handleErr = undefined;
  const tokens = await oauth2Client.refreshAccessToken().catch(err => {
    handleErr = err;
  });

  const accessToken = tokens.credentials.access_token;

  const mailOptions = {
    from,
    to,
    subject,
    html: body
  };
  const mailTransporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "ars3753669@gmail.com",
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
      refreshToken: config.google.refreshToken,
      accessToken: accessToken
    }
  });

  mailTransporter.sendMail(mailOptions, (err, result) => {
    if (err) return next(err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json({ success: true, result, data: req.data });
  });
};

module.exports = sendMail;
