// import { db } from "@/db/drizzle"; // Importing Drizzle database instance
// import { userstable } from "@/db/schema"; // Users schema for Drizzle
// import bcryptjs from "bcryptjs";
// import nodemailer from "nodemailer";
// import { eq } from "drizzle-orm"; // Import `eq` from Drizzle ORM
// import { z } from "zod"; // Import Zod for schema validation

// // Schema validation for the parameters received in the function
// const SendMailSchema = z.object({
//   email: z.string().email(),
//   emailType: z.enum(["VERIFY", "RESET"]),
//   userId: z.number(),
// });

// // Updated sendMail function
// export const sendMail = async (params: any) => {
//   try {
//     // Validate input
//     const { email, emailType, userId } = SendMailSchema.parse(params);

//     // Generate a hashed token using bcrypt
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     // Update user in the database based on email type
//     if (emailType === "VERIFY") {
//       await db
//         .update(userstable)
//         .set({
//           verifyToken: hashedToken,
//           verifyTokenExpiry: new Date(Date.now() + 3600000), // 1-hour expiry time
//         })
//         .where(eq(userstable.id, userId));
//     } else if (emailType === "RESET") {
//       await db
//         .update(userstable)
//         .set({
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // 1-hour expiry time
//         })
//         .where(eq(userstable.id, userId));
//     }

//     // Configure nodemailer transport with environment variables for security
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST || "sandbox.smtp.mailtrap.io", // Host for Mailtrap
//       port: parseInt(process.env.MAIL_PORT || "2525"), // Port for Mailtrap
//       auth: {
//         user: process.env.MAIL_USER, // User from environment variables
//         pass: process.env.MAIL_PASS, // Password from environment variables
//       },
//     });

//     // Check if transporter is configured properly
//     transporter.verify((error, success) => {
//       if (error) {
//         console.error("SMTP Transport Error:", error);
//       } else {
//         console.log("Server is ready to take our messages");
//       }
//     });

//     // Configure the email details
//     const mailOptions = {
//       from: "Nodemailer <example@nodemailer.com>",
//       to: email,
//       subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
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

//     // Send the email using nodemailer
//     const mailResponse = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", mailResponse);
//     return mailResponse;
//   } catch (error: any) {
//     console.error("Error in sendMail:", error);
//     throw new Error(error.message);
//   }
// };
