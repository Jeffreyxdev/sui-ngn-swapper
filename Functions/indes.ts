const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass,
  },
});

exports.sendWaitlistEmail = functions.firestore
  .document("waitlist/{id}")
  .onCreate(async (snap, context) => {
    const { email } = snap.data();

    const mailOptions = {
      from: "Suiver suiverhq@gmail.com",
      to: email,
      subject: "🎉 Welcome to the Suiver Waitlist!",
      text: `Thanks for signing up! You are now part of the founding members. We'll let you know as soon as we launch.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🎉 Welcome to the Suiver Waitlist!</h2>
          <p>Thanks for signing up! You are now part of the <strong>founding members</strong>.</p>
          <p>We'll let you know as soon as we launch.</p>
          <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTNvZ212a2Q4cndmemY4OHZjMHI4Nm91dWFydTZqMXJia3VjNTUwcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IzVwOO8xZsfks/giphy.gif" alt="Welcome" style="width:300px; border-radius:8px; margin-top:20px;">
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", email);
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  });
