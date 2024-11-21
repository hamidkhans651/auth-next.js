import { error } from "console"
import { verify } from "crypto";
import nodemailer from "nodemailer"


export const sendMail = async ({ email, emailType, userId }: any) => {
    try {

        // todo configure mail for usage



        const Transporter = nodemailer.createTransport({
            host: "smtp.example.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: "username",
                pass: "password",
            },

        });


        const mailOption = {
            from: 'Nodemailer <example@nodemailer.com>',
            to: email,
            subject: emailType === 'VERIFY' ? "VERIFY your email" : "RESET your password",
            text: 'jellow',
            html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid',

        }
        const mailResponse = await Transporter.sendMail
            (mailOption);
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}