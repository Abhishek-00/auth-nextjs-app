"use client"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"


export default function forgotPassword() {
    const [loading, setLoading] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)
    const [email, setEmail] = useState({
        email: ""
    })

    const handleForgotButton = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/forgotpassword', email);

            console.log(response.data)
            if (!response.data.success) {
                toast.error(response.data.error)
                return
            }

            toast.success(response.data.message)
            return

        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)

        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="bg-black p-8 rounded shadow-xl">
                <h1 className="text-white text-xl">{loading ? "Processing" : "Password Reset"}</h1>

                <hr />
                <div className="flex flex-col justify-center gap-1">
                    <p className="w-[350px] text-xs mt-1 mb-2">Provide the email address associated with your account to recover your password.</p>
                    <label className="mt-4" htmlFor="email">Email</label>
                    <input
                        className="p-2 rounded border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
                        type="text"
                        id="email"
                        value={email.email}
                        onChange={(e) => setEmail({ ...email, email: e.target.value })}
                        placeholder="Enter your email"
                    />
                    <button disabled={buttonDisable} onClick={handleForgotButton} className="p-2 bg-green-200 text-black mt-5 rounded-lg px-5 focus:outline-none  focus:border-gray-600 ">Reset Password</button>
                </div>
                <div className="flex flex-col items-center mt-8 gap-2">
                    <span className="text-blue-400"><Link href={'/login'} className="text-blue-400">Login</Link></span>
                    <span><Link href={'/signup'} className="text-blue-400">Signup</Link></span>
                </div>
            </div>
        </div>
    )
}