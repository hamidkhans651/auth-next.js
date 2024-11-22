import { connect } from "@/db/dbConfig"
import User from "@/models/usermodels"
import { NextRequest, NextResponse } from "next/server"
import bycriptjs from 'bcryptjs'
import { sendMail } from "@/helpers/mailer"
import { ReqBody } from "@/types/index";
import { z } from "zod";



connect()

export async function POST(request: NextRequest) {
    try {
        const ReqBodySchema = z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string().min(6), // Minimum 6 characters for password
          });


   
       // Validate the payload
       const reqBody = ReqBodySchema.parse(await request.json());
       const { username, email, password } = reqBody;
   


        // Validation and logic go here
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }


        const salt = await bycriptjs.genSaltSync(10);
        const hashedPassword = await bycriptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // save user
        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email
        await sendMail({ email, emailType: "VERIFY", UserId: savedUser._id })
        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            savedUser


        }), { status: 201 }

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }

}
