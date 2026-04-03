import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("bitlinks");
        const collection = db.collection("users");

        const { email, password } = await request.json();

        // 1. Find user by email
        const user = await collection.findOne({ email });
        if (!user) {
            return Response.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // 2. Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return Response.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // 3. Create JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 4. Set the cookie
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 86400,
        });

        return Response.json({ message: "Login successful" }, { status: 200 });

    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}