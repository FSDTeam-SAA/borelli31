const companyName = 'Borrelli Roofing';

const sendMessageTemplate = ({ email, subject, phone, message }) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 640px; margin: auto; padding: 24px; background-color: #f9fafb;">
    <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">

      <!-- Header -->
      <header style="padding: 20px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        <h2 style="margin: 0; font-size: 20px; color: #111827;">${companyName}</h2>
        <p style="margin: 6px 0 0; font-size: 14px; color: #6b7280;">New message via contact form</p>
      </header>

      <!-- Body -->
      <section style="padding: 20px; font-size: 15px; color: #111827; line-height: 1.6;">
        <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p><strong>Message:</strong></p>
        <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
      </section>

      <!-- Footer -->
      <footer style="padding: 16px 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 13px; color: #6b7280;">
        This message was sent via the <strong>${companyName}</strong> contact form.<br/>
        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
      </footer>

    </div>
  </div>
  `;
};

export default sendMessageTemplate;
