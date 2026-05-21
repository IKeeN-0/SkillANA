import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req : Request){
    try{
        await dbConnect();
        const {email, password} = await req.json();

        const user = await User.findOne({email}).lean() as any;
        if(!user){
            return Response.json({ message: "Email or password incorrect" }, { status: 401 })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return Response.json({message : "Email or password incorrect"}, {status : 401})
        }
        const token = jwt.sign(
        { id: user._id }, //payload
        process.env.JWT_SECRET!, 
        { expiresIn: '1d' }
        );
        
        return Response.json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email } // อย่าส่ง password
        },{status : 200});
    }
    catch(err){
        console.log("Internal server error", err);
        return Response.json({error : "Internal server error"},{status : 500})
    }

}