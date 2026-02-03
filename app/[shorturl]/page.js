import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"


export default async function Page({ params }) {
    const url_param = (await params);
    const shorturl = url_param.shorturl.replace("%20", "-").toLowerCase();
    console.log("Url:", shorturl);

    const client = await clientPromise;
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    const doc = await collection.findOne({shorturl: shorturl})
    console.log("Doc", doc);
    
    if(doc){
        redirect(doc.url)
    }
    else{
        redirect(`${process.env.NEXT_PUBLIC_HOST}/notfound`)
    }

  }
