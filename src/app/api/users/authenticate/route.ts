import { geetDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect()

export async function GET(request: NextRequest) {
    try {
        const userInToken = await geetDataFromToken(request);
        console.log('user in token', userInToken)
        const user = await User.findOne({ _id: userInToken.id }).select("-password");
        return NextResponse.json({
            message: "User Found",
            data: user,
            status: 201,
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 400,
            success: false
        })
    }
}

