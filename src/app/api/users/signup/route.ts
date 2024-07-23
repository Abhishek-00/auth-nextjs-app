    import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody
        console.log(username, email, password)

        // Check if user already exist
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // Send verification email
        const emailRes = await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        console.log("EmailResponse:-", emailRes)

        return NextResponse.json({
            message: "User created successfully",
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
