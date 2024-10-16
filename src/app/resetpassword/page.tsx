"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"

export default function resetEmail(){
    try {
        
        
    } catch (error:any) {
        console.error('Error sending reset email:', error.message)
        toast.error('Error sending reset email')
        
    }
}

