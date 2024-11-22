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
                { verifyToken: hashedToken, verifTokenExpiry: Date.now() + 3600000 }


            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })


        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const Transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "da6a1cab28999b",
                pass: "15e0940be982aa"
            }
        });

        const mailOption = {
            from: 'Nodemailer <example@nodemailer.com>',
            to: email,
            subject: emailType === 'VERIFY' ? "VERIFY your email" : "RESET your password",
            text: 'hellow',

            // verifyemail
            html: `<p>click <a href="${process.env.DOMAIN}
            verifyemail?token=${hashedToken}"> here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p> `,

        }

        // ForgotPassword




        
        const mailResponse = await Transporter.sendMail
            (mailOption);
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}