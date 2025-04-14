import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER, // "8a1b9c001@smtp-brevo.com"
    pass: process.env.SMTP_PASS, // "2bGqt6wR7VyhaJL4"
  },
});

export default transporter;
