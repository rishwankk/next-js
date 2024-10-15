"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';

const SignupPage = () => {
  const router = useRouter()
  const [user,setUser]=React.useState({
    email:"",
    password:"",
    username:""
  })
  const[buttonDisabled,setButtonDisabled]=React.useState(false)
  const [loading,setLoading]=useState(false)

  const onSignup=async ()=>{
try {
  setLoading(true)
const response=await axios.post("/api/users/signup",user)
  toast.success("Signup Successful")
  router.push("/login");


  
} catch (error:any) {
  console.log("signup failed",error.message)
  toast.error(error.message)
  
}finally{
  setLoading(false)
}


  }
  useEffect(()=>{
    if(user.email.length>0 &&
       user.password.length>0 &&
       user.username.length>0){
         setButtonDisabled(false)
       }else{
         setButtonDisabled(true)
       }
    

  },[user])


  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    <h1>{loading?"Processing":"Signup"}</h1>
   <hr />
   <label htmlFor="userName">Username</label>
   <input className=' p-1 rounded-lg text-center text-black' type="text" placeholder='Username' id="userName" onChange={(e)=>setUser({...user,username:e.target.value})} />
   <label htmlFor="email">Email</label>
   <input className=' p-1 rounded-lg text-center text-black' type="email" id="email" placeholder='Email'  onChange={(e)=>setUser({...user,email:e.target.value})} />
   <label htmlFor="password">Password</label>
   <input className=' p-1 rounded-lg text-center text-black' type="password" id="password" placeholder='Password'  onChange={(e)=>setUser({...user,password:e.target.value})} />
   <button className='p-1  w-1/ m-2 rounded-lg border border-gray-200 mb-4 focus:outline-none' onClick={onSignup}>{buttonDisabled ?"No signup":"Signup"}</button>
   <Link href="/login">Already have an account? Login</Link>

  </div>
  )
}

export default SignupPage