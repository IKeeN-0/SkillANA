import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import { Badge } from "@/lib/models/schema";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        
        const badge = await Badge.findById(id);

        if (!badge) {
            return NextResponse.json({ error: "Badge not found!" }, { status: 404 });
        }

        return NextResponse.json({ badge });

    } catch (err: any) {
   
        if (err.name === 'CastError') {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        console.error("API Error:", err);
        return NextResponse.json({ error: "Failed to fetch badge" }, { status: 500 });
    }
}