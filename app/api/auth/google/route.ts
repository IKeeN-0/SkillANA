import dbConnect from "@/lib/db";
import { User } from "@/lib/models/schema";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { credential } = await req.json();

        if (!credential) {
            return NextResponse.json({ message: "Credential is required" }, { status: 400 });
        }

        // Verify Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return NextResponse.json({ message: "Invalid token payload" }, { status: 400 });
        }

        const { email, given_name, family_name, picture } = payload;

        // Find or create user
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                firstName: given_name || "First",
                lastName: family_name || "Last",
                email: email,
                profileImg: picture || "",
                // password is not required now
            });
        }

        // Create JWT token (consistent with existing login)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        return NextResponse.json({
            message: "Google login successful",
            token,
            user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName }
        }, { status: 200 });

    } catch (error) {
        console.error("Google Auth Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
