import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { use } from 'react';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connect();
        const reqBody = await req.json();
        
        console.log(reqBody);
        const{token}=reqBody;
        console.log('Received token:', token)
     const user= await User.findOne({
            verifyToken:token,
            verifyTokenExpiry:{
                $gt:  Date.now()}});
                if(!user){
            return NextResponse.json({
                error: "Invalid token",
            }, { status: 401 });
        }
        console.log(user);
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({
            message: "User verified successfully",
            success: true,
        }, { status: 200 });
      


    }catch(error:any){
        return NextResponse.json({
            error: error.message,
        }, { status: 500 });
    }
}