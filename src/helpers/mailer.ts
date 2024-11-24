// import { db } from "@/db/drizzle";
// import { userstable } from "@/db/schema";
// import bcryptjs from "bcryptjs";
// import nodemailer from "nodemailer";
// import { eq } from "drizzle-orm";
// import { z } from "zod";

// const SendMailSchema = z.object({
//   email: z.string().email(),
//   emailType: z.enum(["VERIFY", "RESET"]),
//   userId: z.number(),
// });

// export const sendMail = async (params: any) => {
//   try {
//     // Validate input
//     const { email, emailType, userId } = SendMailSchema.parse(params);

//     // Generate hashed token
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     // Update user in database
//     if (emailType === "VERIFY") {
//       await db
//         .update(userstable)
//         .set({
//           verifyToken: hashedToken,
//           verifyTokenExpiry: new Date(Date.now() + 3600000),
//         })
//         .where(eq(userstable.id, userId));
//     } else if (emailType === "RESET") {
//       await db
//         .update(userstable)
//         .set({
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
//         })
//         .where(eq(userstable.id, userId));
//     }

//     // Configure email transporter
//     const transporter = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "da6a1cab28999b",
//         pass: "15e0940be982aa",
//       },
//     });

//     // Email options
//     const mailOption = {
//       from: "Nodemailer <example@nodemailer.com>",
//       to: email,
//       subject:
//         emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
//       html: `
//         <p>
//           Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
//           here</a> to ${
//             emailType === "VERIFY" ? "verify your email" : "reset your password"
//           }.
//           Or copy and paste this link into your browser:
//         </p>
//         <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
//       `,
//     };

//     // Send email
//     const mailResponse = await transporter.sendMail(mailOption);
//     return mailResponse;
//   } catch (error: any) {
//     console.error("Error in sendMail:", error);
//     throw new Error(error.message);
//   }
// };
