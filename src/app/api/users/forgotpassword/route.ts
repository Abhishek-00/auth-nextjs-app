import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log('email', email)

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: "Email not found",
                status: 400,
                success: false
            })
        }

        const EmailResponse = await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: "Email sent to reset your password",
            success: true,
            status: 201
        })

    } catch (error: any) {
        console.log('Something went wrong------\n', error)
        NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
