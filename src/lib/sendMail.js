import nodemailer from 'nodemailer';
import { adminMail, adminPass } from '../core/config/config.js';

const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: adminMail,
        pass: adminPass
      }
    });

    const mailOptions = {
      from: adminMail,
      to,
      subject,
      html
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

export default sendMail;
