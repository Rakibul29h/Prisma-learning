import express, { type Application, type Request, type Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import config from "./config";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import {  userRoutes } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";
const app: Application = express();

app.use(cors({
    origin:config.app_url,
    credentials:true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get("/", async(req:Request,res:Response)=>{
    res.send("Welcome to the portal")
})

app.use("/api/users",userRoutes)

app.use("/api/auth",authRoute)

export default app