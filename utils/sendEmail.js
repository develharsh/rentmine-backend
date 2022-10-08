const SendEmail = require("../services/email");
const EmailTemplate = require("../utils/email-template");

module.exports = (templateId, payload) => {
  let template = { subject: "", body: "" };
  switch (templateId) {
    case "visitor":
      template = EmailTemplate.visitor(payload.message);
      break;
    case "event":
      template = EmailTemplate.event(payload.message);
      break;
    case "userOnboard":
      template = EmailTemplate.userOnboard(payload.name);
      break;
    default:
      console.log("W");
  }

  let mailOptions = {
    to: payload.email,
    subject: template.subject,
    html: template.body,
  };
  // payload.bcc == undefined ? "" : payload.bcc
  console.log("Sending mail to:", payload.email, ` for ${template.subject}`);
  SendEmail(mailOptions);
};
