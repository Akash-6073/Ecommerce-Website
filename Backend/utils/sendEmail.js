const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,  // Correct variable name
        auth: {
            user: process.env.SMTP_MAIL,    // Correct variable name
            pass: process.env.SMTP_PASSWORD   // Correct variable name
        }
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // This will send the email 
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
