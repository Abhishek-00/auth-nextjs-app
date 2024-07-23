"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

export default function resetPassword() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [user, setUser] = useState({
        password: "",
        confirmPassword: "",
        token: searchParams.get('token')
    })
    const [buttonDisable, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [matched, setMatched] = useState(false)


    const handleSubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/resetPassword", user)
            if (!response.data.success) {
                console.log("password not changed", response.data)
                toast.error(response.data.error)
                return
            }
            toast.success(response.data.message)
            console.log("Login success", response.data)
            setTimeout(() => {
                router.push('/login');
            }, 2500);
        } catch (error: any) {
            console.log(error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (user.confirmPassword === user.password && user.confirmPassword.length > 0 && user.password.length > 0) {
            setMatched(true)
        } else {
            setMatched(false)
        }
        if (user.confirmPassword.length > 0 && user.password.length > 0) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="bg-black p-8 rounded shadow-xl">
                <h1 className="text-white text-xl">{loading ? "Processing" : "Enter your password"}</h1>
                <hr />
                <div className="flex flex-col justify-center gap-1">
                    <label className="mt-4" htmlFor="password">Password</label>
                    <input
                        className={`p-2 rounded border-[2px] focus:outline-none focus:border-gray-600 text-gray-800 ${matched ? ' border-green-400 focus:border-green-500' : ' border-gray-300'} `}
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                    <label className="mt-4" htmlFor="password">Confirm password</label>
                    <input
                        className={`p-2 rounded border-[2px] focus:outline-none focus:border-gray-600 text-gray-800 ${matched ? ' border-green-400 focus:border-green-500' : ' border-gray-300'} `}
                        type="password"
                        id="confirtPassword"
                        value={user.confirmPassword}
                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        placeholder="confirmPassword"
                    />
                    <button disabled={buttonDisable} onClick={handleSubmit} className="p-2 bg-green-200 text-black mt-5 rounded-lg px-5 focus:outline-none  focus:border-gray-600 ">Submit</button>
                </div>
            </div>
        </div>
    )
} 