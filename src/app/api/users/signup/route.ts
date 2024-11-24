import { connect } from "@/db/drizzle"; // Drizzle-Neon connection
import { userstable } from "@/db/schema"; // Drizzle schema for the users table
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm"; // Import `eq` from Drizzle ORM

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log("Request Body:", reqBody);

    // Connect to the database
    const db = await connect();

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(userstable)
      .where(eq(userstable.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
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

    console.log("User inserted:", newUser);

    // Return a success response without sending an email
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });

  } catch (error: any) {
    console.error("Error in user registration:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
