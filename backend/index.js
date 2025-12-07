import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import userRouter from './routes/userRoutes.js'
import ConnectDB from './utils/MongoConnect.js'
import cors from 'cors'
import { FRONTEND_URL } from './utils/utils.js'
import path from 'path'
import { fileURLToPath } from "url";
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
    origin: FRONTEND_URL
}))

app.get("/", (req, res)=>{
    return res.send("Hellow world")
})
app.use("/user", userRouter)

const main =()=>{
    try{
        app.listen(3000)
        console.log("App listing on port 3000")
        ConnectDB()
    }catch(er){
        console.log("Connetion failed, ", er)
    }
}
main()