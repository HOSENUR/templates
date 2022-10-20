require('dotenv').config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
})
transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: "ihosenur@proton.me", // recipient email
    subject: "Test message subject", // Subject line
    html: {
        path: "mails/Halloween.html"
    }
}, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
