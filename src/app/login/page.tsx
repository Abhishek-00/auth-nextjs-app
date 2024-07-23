"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

export default function loginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisable, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            if (!response.data.success) {
                console.log("Login failed", response.data)
                toast.error(response.data.error)
                return
            }
            console.log("Login success", response.data)
            router.push('/profile')
        } catch (error: any) {
            console.log(error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="bg-black p-8 rounded shadow-xl	" >
                <h1 className="text-white text-xl">{loading ? "Processing" : "Login"}</h1>
                <hr />
                <div className="flex flex-col justify-center gap-1">
                    <label className="mt-4" htmlFor="email">Email</label>
                    <input
                        className="p-2 rounded border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
                        type="text"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                    <label className="mt-4" htmlFor="password">Password</label>
                    <input
                        className="p-2 rounded border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                    <button disabled={buttonDisable} onClick={onLogin} className="p-2 bg-green-200 text-black mt-5 rounded-lg px-5 focus:outline-none  focus:border-gray-600 ">Login</button>
                </div>
                <div className="flex flex-col items-center mt-5 gap-2">
                    <span className="text-blue-400"><Link href={'/forgotpassword'} className="text-blue-400">Forgot password?</Link></span>
                    <span>Don't have an account? <Link href={'/signup'} className="text-blue-400">Signup</Link></span>
                </div>
            </div>
        </div>
    )
}