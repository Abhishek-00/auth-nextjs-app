import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            const user = await User.findByIdAndUpdate(userId, {
                verifiedToken: hashedToken,
                verifiedTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === "RESET") {
            const user = await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'abhishek@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?email=${email}&token=${hashedToken}">here</a> to verify your email.<br/>or paste the link in browser <br/> <span>${process.env.DOMAIN}/verifyemail?email=${email}&token=${hashedToken}</spnan></p>` : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password.<br/>or paste the link in browser <br/> <span>${process.env.DOMAIN}/resetpassword?email=${email}&token=${hashedToken}</spnan></p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}