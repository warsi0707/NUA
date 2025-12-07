import mongoose from "mongoose"
import { MONGO_URL } from "./utils.js"

const ConnectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Database connected")
    }catch(error){
       console.log("DB connection failed")
    }
}

export default ConnectDB;