"use client"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function userProfile({ params }: any) {
    const router = useRouter()
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="bg-black p-8 rounded shadow-xl">
                <h1 className="text-2xl">Welcome to profile</h1>
                <hr />
                <p className="text-xl text-center">Your user id:- <span className="text-[20px] text-green-100">{params.id}</span></p>

                <button onClick={logout} className="px-4 mt-5 p-2 bg-red-600 text-black rounded mt-5">Logout</button>
            </div>
        </div>
    )
}