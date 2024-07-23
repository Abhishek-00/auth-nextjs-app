import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { password, confirmPassword, token } = reqBody;

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                error: "Invalid token",
                success: false,
                status: 400
            })
        }
        console.log(user)

        if (password !== confirmPassword) {
            return NextResponse.json({
                error: "Password not matched",
                success: false,
                status: 201
            })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save()


        return NextResponse.json({
            message: "Password changed successfully", success: true,
            status: 201
        })


    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false,
            status: 500
        })
    }
}