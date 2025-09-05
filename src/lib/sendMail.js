import nodemailer from 'nodemailer';

const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'cb@borrelliroofing.com',
        pass: 'add your password here'
      }
    });

    const mailOptions = {
      from: 'cb@borrelliroofing.com',
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
