import User from "@/models/usermodels";
import { error } from "console"
import { verify } from "crypto";
import bycriptjs from 'bcryptjs'
import nodemailer from "nodemailer"


export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bycriptjs.hash(userId.tostring(), 10)
        // todo configure mail for usage
        if (emailType === "VERIFU") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken }
            )
        }

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