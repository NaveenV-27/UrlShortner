import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("bitlinks");
        const collection = db.collection("users");

        console.log("Received signup request", request);

        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return Response.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await collection.insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        const token = jwt.sign(
            { userId: newUser.insertedId, email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 86400, // 1 day in seconds
        });

        return Response.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Signup Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}