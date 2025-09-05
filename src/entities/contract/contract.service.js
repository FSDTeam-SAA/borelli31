import { emailAddress } from '../../core/config/config.js';
import sendEmailMessage from '../../lib/sendEmailMessage.js';
import sendMessageTemplate from '../../lib/sendMessageTemplate.js';

const sendMessage = async (payload) => {
  const { email, message, phone } = payload;
  if ((!email || !message, !phone)) {
    throw new Error('Please fill all the fields');
  }
  const result = await sendEmailMessage({
    from: email,
    to: emailAddress,
    subject: 'Contract Inquiry',
    html: sendMessageTemplate({ email, message })
  });
  if (!result.success) {
    throw new Error(`Failed to send email: ${result.error}`);
  }
  return;
};

const contractService = {
  sendMessage
};

export default contractService;
