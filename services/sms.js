// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set region
AWS.config.update({
  accessKeyId: process.env.NODE_APP_AWS_ACCESSKEYID,
  secretAccessKey: process.env.NODE_APP_AWS_SECRETACCESSKEY,
  region: "ap-south-1",
});

function SendSMS(Message, PhoneNumber) {
  // Create publish parameters
  var params = {
    Message /* required */,
    PhoneNumber,
    //   TopicArn: "TOPIC_ARN",
  };
  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function (data) {
      // console.log(`Message ${params.Message} sent`);
      // console.log("MessageID is " + data.MessageId);
      console.log("SMS", data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
}

module.exports = SendSMS;
