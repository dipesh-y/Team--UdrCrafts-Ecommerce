import nodemailer from 'nodemailer';

let transporter = null;
let usingTestAccount = false;

// Initialize transporter with timeout to avoid blocking startup
const initializeTransporter = async () => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  };

  const primary = nodemailer.createTransport(smtpConfig);
  try {
    await Promise.race([
      primary.verify(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
    ]);
    transporter = primary;
    usingTestAccount = false;
    console.log('✅ SMTP transporter is ready (using configured SMTP)');
    return;
  } catch (err) {
    console.error('❌ SMTP transporter verification failed:', err.message || err);
  }

  // Fallback to Ethereal with timeout
  try {
    const testAccount = await Promise.race([
      nodemailer.createTestAccount(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Ethereal timeout')), 5000))
    ]);
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    usingTestAccount = true;
    console.log('ℹ️ Falling back to Ethereal test account for email testing');
    console.log('Ethereal account credentials:', { user: testAccount.user, pass: testAccount.pass });
  } catch (createErr) {
    console.error('❌ Failed to create Ethereal test account:', createErr.message || createErr);
    // Create a dummy transporter that logs emails instead
    transporter = {
      sendMail: async ({ to, subject, text, html }) => {
        console.log('📧 Email (dummy transporter):', { to, subject });
        return { messageId: 'dummy-' + Date.now() };
      }
    };
  }
};

// Start initialization without blocking server startup
initializeTransporter().catch(err => console.error('Initialization error:', err));

//Function to send email
async function sendEmail(to, subject, text, html) {
    if (!transporter) {
        const err = 'No mail transporter available';
        console.error(err);
        return { success: false, error: err };
    }

    try {
        const fromAddress = process.env.EMAIL || (usingTestAccount ? 'no-reply@example.com' : 'no-reply@example.com');
        const info = await transporter.sendMail({
            from: fromAddress,
            to,
            subject,
            text,
            html,
        });

        const result = { success: true, messageId: info.messageId };
        if (usingTestAccount) {
            const preview = nodemailer.getTestMessageUrl(info);
            if (preview) result.previewUrl = preview;
        }

        console.log('Email send result:', { to, subject, messageId: info.messageId, preview: result.previewUrl });
        return result;
    } catch (error) {
        console.error('Error sending email', error);
        return { success: false, error: error.message || String(error) };
    }
}

export { sendEmail };