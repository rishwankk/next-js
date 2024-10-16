"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function verifyEmailPage(){
    const [token,setToken]=useState("");
    const [verified,setVerified]=useState(false);
    const [error,setError]=useState(false);
    const verifyUserEmail = async () => {
        try {
            console.log('Token being sent:', token); // Log the token
            const response = await axios.post('/api/users/verifyemail', { token });
            console.log('Response from server:', response.data); // Log response
            if (response.status === 200 && response.data.success) {
                setVerified(true);
            }
        } catch (error: any) {
            setError(true);
            console.error('Error verifying email:', error.response?.data || error.message);
        }
    };
    
  
        useEffect(()=>{
            const urlToken=window.location.search.split("=")
            setToken(urlToken[1]|| "");


        },[])



        useEffect(()=>{
            if(token.length>0){
                verifyUserEmail();
            }
        },[token])

        return(
            <div>
            {verified ? (
                <div>
                    <div>Email verified successfully! You can now login.</div>
                    <div>Your token: <span className="text-green-600">{token}</span></div>
                </div>
            ) : (
                <div>
                    {error ? (
                        <div className="text-red-600">Error verifying email. Please try again.</div>
                    ) : (
                        <div>Please wait while we verify your email.</div>
                    )}
                </div>
            )}
        </div>
          
        )

}


