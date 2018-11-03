import { Email } from "./models/email";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS
    }
});

export const sendEmail = (email: Email) => {
    transporter.sendMail({
        to: process.env.TO_EMAIL,
        subject: `Personal Website Email from ${email.name} at ${email.fromEmail}`,
        text: `From: ${email.name}\nEmail: ${email.fromEmail}\nBody: ${email.body}`
    });
};
