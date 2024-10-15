import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";

export async function GET(req: NextRequest, res: NextResponse) {
    await connect()
    
    try {
        const userId=await getDataFromToken(req);
        console.log(userId,"userid");
        
        const user=await User.findById(userId).select("-password")
        console.log("this is user",user);
        
        return NextResponse.json({
            message:"User Found",
            data:user
        })


    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
        },{ status: 500})
        
    }
}