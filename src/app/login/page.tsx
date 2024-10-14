"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {Axios} from "axios";

const LoginPage = () => {
  const [user,setUser]=React.useState({
    email:"",
    password:"",
   
  })
  const onLogin=async ()=>{

  }
  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    <h1>Login</h1>
   <hr />
   <label htmlFor="email">Email</label>
   <input className='p-1 rounded-lg text-center' type="email" id="email" placeholder='Email'  onChange={(e)=>setUser({...user,email:e.target.value})} />
   <label htmlFor="password">Password</label>
   <input className='p-1 rounded-lg text-center' type="password" id="password" placeholder='Password'  onChange={(e)=>setUser({...user,password:e.target.value})} />
   <button  className='p-1  w-1/4 m-2 rounded-lg border border-gray-200 mb-4 focus:outline-none' onClick={onLogin}>Login</button>
   <Link href="/signup" className='text-gray-500 hover:text-gray-900'>
     Create an account
   </Link>



  </div>
  )
}

export default LoginPage;