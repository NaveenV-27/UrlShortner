import clientPromise from "@/lib/mongodb";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("bitlinks")
    const collection = db.collection("url")
    const docs = await collection.find({}).limit(10).toArray();
    return Response.json(docs)
}

export async function POST(request) {

    const body = await request.json()
    const client = await clientPromise;
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    const doc = await collection.findOne({shorturl: body.shorturl})
    if(doc){
        return Response.json({success: false, error: true,  message: 'URL already exists!' })
    }
    let url = body.url
    if(!url.startsWith("https://")) {
        url = `https://${url}`;
    }
        const result = await collection.insertOne({
            url:url,
            shorturl:body.shorturl
        })

    return Response.json({success: true, error: false,message: "URL generated successfully"})
}


// export async function DELETE(request) {
//     const body = await request.json()
//     const client = await clientPromise;
//     const db = client.db("bitlinks")
//     const collection = db.collection("url")
    
// }