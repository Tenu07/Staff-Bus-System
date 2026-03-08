import nodemailer from  'nodemailer'
import dotnenv from 'dotenv'

dotnenv.config()

export const mailService =  nodemailer.createTransport({
   service: 'gmail',
     auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized: false 
    },
    connectionTimeout:10000,
    socketTimeout:10000,
});

export const bookingMail = async (email, bookingDetails) => {
  try {
    await mailService.sendMail({
      from: `"BusHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Bus Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>🚌 Booking Confirmed!</h2>
          <p>Hello ${bookingDetails.customerName},</p>
          <p>Your bus ticket has been confirmed with the following details:</p>
          <ul>
            <li><strong>Booking ID:</strong> ${bookingDetails.bookingId}</li>
            <li><strong>Route:</strong> ${bookingDetails.location}</li>
            <li><strong>Date:</strong> ${bookingDetails.bookingDate}</li>
            <li><strong>Time:</strong> ${bookingDetails.bookingTime}</li>
            <li><strong>Seats:</strong> ${bookingDetails.seatNumbers}</li>
            <li><strong>Total:</strong> ${bookingDetails.amount}</li>
          </ul>
          <p>Need help? Contact support at ${bookingDetails.supportPhone} or <a href="mailto:${bookingDetails.supportEmail}">${bookingDetails.supportEmail}</a>.</p>
          <p>Thank you,<br>Staff Bus Service.lk</p>
        </div>
      `,
    });

    console.log(`📧 Confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};


