import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        // 1. Get the token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Verify and decode the JWT to get the userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // 3. Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("bitlinks");
        const collection = db.collection("url");

        // 4. Fetch only URLs that match this userId
        // We sort by createdAt -1 to show the newest links first
        const userUrls = await collection
            .find({ userId: userId })
            .sort({ createdAt: -1 })
            .toArray();

        return Response.json(userUrls);

    } catch (error) {
        console.error("GET URLs Error:", error);
        
        // If the token is expired or invalid
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return Response.json({ error: "Invalid session" }, { status: 403 });
        }

        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}