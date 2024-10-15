import {connect} from "@/dbconfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"


export async function POST(req: NextRequest, res: NextResponse) {
    try { 
    await connect()
    const reqBody=await req.json()
    console.log(reqBody);
    
    const {username, email, password} = reqBody
    if(!username ||!email ||!password) return NextResponse.json({error:"Please provide all fields"})
        
    const user = await User.findOne({email})
    if(user) return NextResponse.json({error:"User already exists"},{status:400})
        
    const hashedPassword = await bcryptjs.hash(password, 10)
    
    const newUser = new User({username, email, password: hashedPassword})
    const savedUser=await newUser.save()
    console.log(savedUser);
    
    return NextResponse.json({message:"User registered successfully",success:true,savedUser},{status:201})


    

    
    
} catch (error:any) {
    return NextResponse.json({
        error:error.message
    },{status:500})
    
}
}
