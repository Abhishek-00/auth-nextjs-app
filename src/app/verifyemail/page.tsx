"use client"
import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"


export default function verifyEmail() {
    const searchParams = useSearchParams()
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const token = searchParams.get('token');


    const verifyUserEmail = async () => {
        try {
            const res = await axios.post("/api/users/verifyEmail", {
                token,
                email: searchParams.get('email')
            })
            console.log(res)
            if (!res.data.success) {
                toast.error("Invalid token")
                setError(true)
                return
            }
            setLoading(false)
            toast.success(res.data.message)
            // setError(false)
            setVerified(true)
        } catch (error: any) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (token) {
            verifyUserEmail()
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="bg-black p-8 rounded shadow-xl">
                <h1 className="text-4xl">{`${loading ? 'Verifying email...' : 'Verified'}`}</h1>
                {
                    verified && (
                        <div className="flex flex-col items-center mt-5 gap-2 py-2">
                            <h2 className="text-2xl text-green-500">Email verified</h2>
                            <span className="text-blue-400"> <Link href={"/login"}>Login</Link></span>
                        </div>
                    )
                }
                {
                    error && (
                        <div className="flex flex-col items-center mt-5 gap-2 py-2">
                            <h2 className="text-2xl text-red-600">Email not verified</h2>
                            <span className="text-blue-400"> <Link href={"/login"}>Login</Link></span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

