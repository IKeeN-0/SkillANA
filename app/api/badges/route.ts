import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import { Badge } from "@/lib/models/schema";

export async function GET() {
    try {
        await dbConnect();
        const badges = await Badge.find({}).lean();

        return NextResponse.json(badges, {status: 200});

    } catch (err: any) {
        console.error("API Error:", err);
        return NextResponse.json({ error: "Failed to fetch badges" }, { status: 500 });
    }

}  