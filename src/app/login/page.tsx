"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios, {Axios} from "axios";
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter()
  const [user,setUser]=React.useState({
    email:"",
    password:"",
   
  })
  const [loading, setLoading]=useState(false)
  const[buttonDisabled,setButtonDisabled]=useState(false)
  
  
  const onLogin=async ()=>{
    try {
      setLoading(true)
      const response=await axios.post("/api/users/login",user)
      toast.success("Login Successful")
      console.log("login success",response.data)
      router.push("/profile");
      
    } catch (error:any) {
      console.log("login failed",error.message)
      toast.error(error.message)
      
    }finally{
      setLoading(false)
    }
    
  }
  useEffect(()=>{
    if(user.email.length>0 &&
       user.password.length>0){
         setButtonDisabled(false)
       }else{
         setButtonDisabled(true)
       }
  },[user])
  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    <h1>{loading?"Processign":"Login"}</h1>
   <hr />
   <label htmlFor="email">Email</label>
   <input className=' p-1 rounded-lg text-center text-black' type="email" id="email" placeholder='Email'  onChange={(e)=>setUser({...user,email:e.target.value})} />
   <label htmlFor="password">Password</label>
   <input className=' p-1 rounded-lg text-center text-black' type="password" id="password" placeholder='Password'  onChange={(e)=>setUser({...user,password:e.target.value})} />
   <button  className='p-1  w-1/4 m-2 rounded-lg border border-gray-200 mb-4 focus:outline-none' onClick={onLogin}>{buttonDisabled?"Fill all field":"Login "}</button>
   <Link href="/signup" className='text-gray-500 hover:text-gray-900'>
     Create an account
   </Link>



  </div>
  )
}

export default LoginPage;