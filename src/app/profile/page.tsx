"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const ProfilePage=()=>{
  const router=useRouter();
  const[data,setData]=useState("nothing")
   
    const handleLogout = async()=>{
        try {
            const response = await axios.post("/api/users/logout");
            toast.success("Logged Out Successfully");
            router.push("/login");

          
            
        } catch (error:any) {
            console.error("Error logging out", error.message);
            toast.error(error.message);


            
        }


    }

    const getUserDetails=async()=>{
        try {
            const response = await axios.get("/api/users/me");
            console.log("User Details:", response.data);
            setData(response.data.data.username);

        }
            catch (error:any) {
                console.error("Error getting user details", error.message);
                toast.error(error.message);

            }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <p>User Details:</p>{data&&

            <h2 className="bg-white text-black w-1/4 text-center rounded-lg h-auto">{data==="nothing"?"nothing":<Link href={`/profile/${data}`}>{data}
             </Link>}</h2>
            }
            
            <hr />
            <button className="bg-blue-600 mt-4 rounded-lg w-20 h-10 text-lg font-bold" onClick={handleLogout} >Logout</button>
            <button className="bg-green-600 mt-4 rounded-lg w-28 h-10 text-lg font-bold" onClick={getUserDetails} >UserDetails</button>
            
        </div>

    )
}
export default ProfilePage