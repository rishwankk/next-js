"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {Axios} from "axios";

const SignupPage = () => {
  const [user,setUser]=React.useState({
    email:"",
    password:"",
    userName:""
  })
  const onSignup=async ()=>{

  }
  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    <h1>Signup</h1>
   <hr />
   <label htmlFor="userName">Username</label>
   <input className='p-1 rounded-lg text-center' type="text" placeholder='Username' id="userName" onChange={(e)=>setUser({...user,userName:e.target.value})} />
   <label htmlFor="email">Email</label>
   <input className='p-1 rounded-lg text-center' type="email" id="email" placeholder='Email'  onChange={(e)=>setUser({...user,email:e.target.value})} />
   <label htmlFor="password">Password</label>
   <input className='p-1 rounded-lg text-center' type="password" id="password" placeholder='Password'  onChange={(e)=>setUser({...user,password:e.target.value})} />
   <button className='p-1  w-1/ m-2 rounded-lg border border-gray-200 mb-4 focus:outline-none' onClick={onSignup}>Signup</button>
   <Link href="/login">Already have an account? Login</Link>

  </div>
  )
}

export default SignupPage