import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req : Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const { badgeId, badgeName, imgUrl } = await req.json();
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid ID format" }, 
                { status: 400 }
            );
        }

        const updatedUser = await User.findOneAndUpdate(
            {
                _id: id,                                    /*หา user */
                "badges.badgeId": { $ne: badgeId }          /*เช็ค badgeId ว่ามีก่อนมั้ย */
            }, 
            {
                $push: {                                    /*เพิ่มเข้าท้าย aray */
                    badges: { 
                        badgeId: badgeId, 
                        badgeName: badgeName, 
                        imgUrl: imgUrl,
                        earnedAt: new Date()
                    } 
                } 
            }, 
            { returnDocument: 'after', runValidators: true }    /*แก้เสร็จ ส่ง user มาดู + เช็คว่าตรงตาม schema */
        ).select("-password");

        if (!updatedUser) {
            const userExists = await User.findById(id);
            if (!userExists) return NextResponse.json({ message: "User not found" }, { status: 404 });
    
            return NextResponse.json({ message: "User already has this badge" }, { status: 400 });
        }

        return NextResponse.json({ message: "Badge added successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        console.log("Update error: ", error);
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
}