import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid"; // Install this: npm install nanoid

export async function POST(request) {
    const body = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return Response.json({ success: false, message: "Unauthorized. Please sign in." }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const client = await clientPromise;
        const db = client.db("bitlinks");
        const collection = db.collection("url");

        // 2. Handle Short URL Logic
        let finalShortUrl = body.shorturl ? body.shorturl.replace(/\s+/g, "-").toLowerCase() : null;

        if (finalShortUrl) {
            // Check if custom URL is taken
            const existing = await collection.findOne({ shorturl: finalShortUrl });
            if (existing) {
                return Response.json({ success: false, error: true, message: 'Custom URL already exists!' });
            }
        } else {
            // Generate a random 6-15 character ID if no custom URL provided
           const randomInt = Math.floor(Math.random() * (15 - 6 + 1)) + 6;

            finalShortUrl = nanoid(randomInt);
        }

        // 3. Clean the long URL
        let longUrl = body.url;
        if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
            longUrl = `https://${longUrl}`;
        }

        // 4. Insert into DB (including the userId so we know who owns it)
        await collection.insertOne({
            url: longUrl,
            shorturl: finalShortUrl,
            userId: userId,
            createdAt: new Date()
        });

        return Response.json({ 
            success: true, 
            shorturl: finalShortUrl, 
            message: "URL generated successfully" 
        });

    } catch (error) {
        return Response.json({ success: false, message: "Invalid session. Please login again." }, { status: 403 });
    }
}


export async function GET() {
    const client = await clientPromise;
    const db = client.db("bitlinks")
    const collection = db.collection("url")
    const docs = await collection.find({}).limit(10).toArray();
    return Response.json(docs)
}

export async function DELETE(request) {
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("bitlinks")
    const collection = db.collection("url")
    const result = await collection.deleteOne({ shorturl: body.shorturl })
    if (result.deletedCount === 0) {
        return Response.json({ success: false, error: true, message: "URL not found!" })
    }
    return Response.json({ success: true, error: false, message: "URL deleted successfully" })
}