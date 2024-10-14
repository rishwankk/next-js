import mongoose from "mongoose";
export async function conect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const conection=mongoose.connection;
        conection.on('conected',()=>{
            console.log("Connected to MongoDB");
        })
        conection.on('error',(error:any)=>{
            console.error("Connection error:", error);
            process.exit();
        })
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
      
        
    }
}