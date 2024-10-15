import {connect} from "@/dbconfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connect()
        const reqBody=await req.json()
        console.log(reqBody);
        
        const{email,password}=reqBody;
        const existingUser=await User.findOne({email});
        if(!existingUser){
            console.log("not exist")
            return NextResponse.json({
                error: "User does not exist",
            },{ status: 404})
        }
        const isMatch=bcryptjs.compareSync(password,existingUser.password);
        if(!isMatch){
            return NextResponse.json({
                error: "Invalid credentials",
            },{ status: 401})
        }
        const tokenData={
            id:existingUser._id,
            username:existingUser.username,
            email:existingUser.email,
           
        }
        const token= await jwt.sign(tokenData,process.env.SECRET_KEY!
            ,{ expiresIn:"1d"});
    const response= NextResponse.json({message:"User logged in successfully",success:true,token},{status:200})
    response.cookies.set(
        "token",token,{
            httpOnly:true,
            expires:new Date(Date.now()+1000*60*60*24),
        }

    )
    return response;

        


                            





        
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
        },{ status: 500})
        
    }
}