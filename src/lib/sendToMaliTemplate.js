const sendToMailTemplate = ({
  service,
  fullName,
  email,
  phone,
  propertyAddress
}) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
        
        <!-- Header -->
        <div style="background:#007bff; color:#ffffff; padding:16px; text-align:center;">
          <h2 style="margin:0; font-size:22px;">New Assessment Submitted</h2>
        </div>
        
        <!-- Body -->
        <div style="padding:20px; color:#333333;">
          <p style="font-size:16px;">Hello Borrelli,</p>
          <p style="font-size:15px;">A new assessment inquiry has been submitted. Here are the details:</p>
          
          <table style="width:100%; border-collapse:collapse; margin-top:15px;">
            <tr>
              <td style="padding:8px; border:1px solid #ddd; background:#f4f7fc;"><b>Service</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${service.name}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd; background:#f4f7fc;"><b>Name</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd; background:#f4f7fc;"><b>Email</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd; background:#f4f7fc;"><b>Phone</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd; background:#f4f7fc;"><b>Property Address</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${propertyAddress}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd; background:#f4f7fc;"><b>Category</b></td>
              <td style="padding:8px; border:1px solid #ddd;">${service.category}</td>
            </tr>
          </table>

          <p style="font-size:14px; margin-top:20px;">You can also view this through the admin panel.</p>
        </div>
        
        <!-- Footer -->
        <div style="background:#f1f1f1; text-align:center; padding:12px; font-size:12px; color:#777;">
          <p style="margin:0;">This is an automated notification from <b>Borelli31</b>.</p>
        </div>
      </div>
    </div>
  `;
};

export default sendToMailTemplate;
