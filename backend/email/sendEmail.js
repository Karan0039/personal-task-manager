require('dotenv').config();
const Sib = require('sib-api-v3-sdk');

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SEND_IN_BLUE_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
  email: process.env.EMAIL_ID,
};

const sendEmail = async (emailDetails, content) => {
  try {
    let response;
    if (Array.isArray(emailDetails.email)) {
      response = await tranEmailApi.sendTransacEmail({
        sender,
        to: emailDetails.email,
        subject: emailDetails.subject,
        ...content,
      });
    } else {
      response = await tranEmailApi.sendTransacEmail({
        sender,
        to: [{email: emailDetails.email}],
        subject: emailDetails.subject,
        ...content,
      });
    }
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {sendEmail};
