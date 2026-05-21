import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import {PendingUser} from "@/lib/models/schema"

export async function POST(req: Request){ // Create pending user
    try{
        await dbConnect();
        const {firstName, lastName, email, password} = await req.json()

        const existedUser = await PendingUser.findOne({email});
        if(existedUser) return NextResponse.json({message: "Pending user is existed"}, {status : 200});

        const salt= await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        

        const newUser = await PendingUser.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })

        return NextResponse.json({pendingUser:{
            firstName: firstName,
            lastName: lastName,
            email: email
        }},{status: 201})
    }
    catch(err){
        console.error(err);
        return NextResponse.json({message:"Internal server error"},{status: 500})
    }
}