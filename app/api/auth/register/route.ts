import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema"
import { PendingUser } from "@/lib/models/schema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(req : Request){ // Create Account
    try{
        await dbConnect();
        const {email} = await req.json();

        const pendingUser = await PendingUser.findOne({email})

        if(!pendingUser) return NextResponse.json({message : "Missing pending user!"}, {status : 400})
        
        const {firstName, lastName, password} = pendingUser

        if(!firstName || !lastName || !email || !password){
            return NextResponse.json({message : "Missing information!"}, {status : 400})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                { message: "Email have already existed!" },
                { status: 400 }
            );
        }

        const newUser = await User.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
        });

        const token = jwt.sign(
            { id: newUser._id }, //payload
            process.env.JWT_SECRET!, 
            { expiresIn: '1d' });

        await PendingUser.deleteOne({email})
        
        return NextResponse.json({
        message: "Create user successfully",
        token: token
        }, { status: 201 });



    }
    catch(error: any){
        console.log("Register Error : ", error)
        return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    }
}

// ลบ , {params} ด้านหลังออกไปเลย
export async function GET(req : Request){
    try {
        await dbConnect();

        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. ถอดรหัสหา id จาก token ตรงๆ
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {id : string};
        
        // 2. เอา payload.id ไปค้นหาใน Database ได้เลย (ปลอดภัยกว่าเพราะอ้างอิงจาก token ที่ Login)
        const user = await User.findById(payload.id);

       if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
       }
       return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 

// ฝั่ง PUT ก็ปรับให้ใช้ payload.id เช่นกันครับ
export async function PUT(req: Request) {
  try {
    await dbConnect();
    
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const body = await req.json();

    // อัปเดตโดยใช้ decoded.id จาก Token
    const updatedUser = await User.findByIdAndUpdate(decoded.id, body, { new: true });

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}