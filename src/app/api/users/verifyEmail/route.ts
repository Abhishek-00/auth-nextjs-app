import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, email } = reqBody;
        console.log(email)


        const user = await User.findOne({ verifiedToken: token, verifiedTokenExpiry: { $gt: Date.now() } })

        console.log("token in db", user)

        if (!user) {
            const user = await User.findOne({ email })
            if (user.isVerified) {
                return NextResponse.json({ message: "Email already verified", success: true, status: 201 })
            }
            return NextResponse.json({ error: "Invalid token", success: false, status: 400 })
        }
        console.log(user)

        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true, status: 201 })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false,
            status: 500
        })
    }
}
