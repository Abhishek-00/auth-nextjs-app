"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

export default function signupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisable, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)
            toast.success(`${response.data.message}`)
            setTimeout(() => {
                toast.success(`Check your email`)
            }, 2000);

            setTimeout(() => {
                router.push('/login');
            }, 4000);
        } catch (error: any) {
            console.log("Signup failed", error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="bg-black p-8 rounded shadow-xl">
                <h1 className="text-white text-xl">{loading ? "Processing..." : "Signup"}</h1>
                <hr />
                <div className="flex flex-col justify-center gap-1">
                    <label className="mt-4" htmlFor="username">Username</label>
                    <input
                        className="p-2 rounded border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
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
                    <button onClick={onSignup} disabled={buttonDisable} className="p-2 bg-green-200 text-black mt-5 rounded-lg px-5 focus:outline-none  focus:border-gray-600 ">Signup</button>
                </div>
                <div className="flex flex-col items-center mt-5 gap-2">
                    <span className="text-blue-400"><Link href={'/forgotpassword'} className="text-blue-400">Forgot password?</Link></span>
                    <span>Visit <Link href={'/login'} className="text-blue-400">Login page</Link></span>
                </div>
            </div>
        </div>
    )
}