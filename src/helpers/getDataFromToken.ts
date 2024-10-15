import { NextRequest } from "next/server";
import  Jwt  from "jsonwebtoken";
import { request } from "http";
export const getDataFromToken=(request:NextRequest)=>{
    try {
        const token:any=request.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("Token is missing");
          }
          const decoded = Jwt.verify(token, process.env.SECRET_KEY!);
    
          return (decoded as { id: string }).id;

         
        
    } catch (error:any) {
        console.error("Error:", error.message);
        return null;
        
    }
}
