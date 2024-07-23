"use client"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function profilePage() {
    const router = useRouter()
    const [data, setData] = useState('')

    async function logout() {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success(res.data.message)
            setTimeout(() => {
                router.push('/login');
            }, 2500);
        } catch (error) {
            console.log("Not able to logout")
            toast.error("Logout failed")
        }
    }

    useEffect(() => {
        const getUserDetails = async () => {
            const res = await axios.get('/api/users/authenticate')
            console.log(res);
            setData(res.data.data._id)
        }

        getUserDetails()
    }, [])



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="bg-black p-[80px] gap-1 rounded shadow-xl flex items-center flex-col">
                <h2 className="text-xl">
                    Profile page
                </h2>
                <hr />
                {/* <h2>{data === '' ? 'No user data' : <Link href={`/profile/${data}`}><span>User name: </span>{data}</Link>}</h2> */}
                <hr />
                <button onClick={logout} className="px-4 p-2 bg-red-600 text-black rounded mt-5">Logout</button>
                <button className="px-4 p-2 bg-green-600 text-black rounded mt-5">{data === '' ? 'Loading...' : <Link href={`/profile/${data}`}>Get user Id</Link>}</button>
            </div>
        </div>
    )
}