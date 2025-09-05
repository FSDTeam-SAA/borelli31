import nodemailer from 'nodemailer';
import { emailAddress, emailPass } from '../core/config/config.js';

const sendEmailMessage = async ({ to, subject, html, from }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailAddress,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `${from} <${emailAddress}>`,
      to,
      subject,
      html,
      replyTo: from
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default sendEmailMessage;
