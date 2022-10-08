module.exports.visitor = (message) => {
  return {
    subject: `Visit Alert - Rentmine`,
    body: `Visit Alert Type: ${message}`,
  };
};

module.exports.event = (message) => {
  return {
    subject: `Event Alert - Rentmine`,
    body: `Event Alert Type: ${message}`,
  };
};
module.exports.userOnboard = (name) => {
  return {
    subject: "Welcome to Rentmine - India's Leading Rental Apartment Finder",
    body: `<p>Dear ${name},<br/>Thanks for Registering to Rentmine.<br/>If you face any issue, Please, Let us know at +91-8077015752 or rentmine@gmail.com</p>`,
  };
};
