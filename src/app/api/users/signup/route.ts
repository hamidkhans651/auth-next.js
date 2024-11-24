import { db } from "@/db/drizzle"; // Drizzle instance
import { userstable } from "@/db/schema"; // Users schema
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
import { z } from "zod";
import { eq } from "drizzle-orm"; // Import `eq` from Drizzle ORM

export async function POST(request: NextRequest) {
  try {
    // Validate the request body using Zod
    const ReqBodySchema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6), // Minimum 6 characters for password
    });
    const reqBody = ReqBodySchema.parse(await request.json());
    const { username, email, password } = reqBody;

    // Check if the user already exists
    const existingUser = await db
      .select()
      .from(userstable)
      .where(eq(userstable.email, email)); // Use `eq` for comparison
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Insert the new user
    const [newUser] = await db
      .insert(userstable)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning({
        id: userstable.id,
        username: userstable.username,
        email: userstable.email,
      });

    // Send verification email
    await sendMail({ email, emailType: "VERIFY", UserId: newUser.id });

    // Return success response
    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in signup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
