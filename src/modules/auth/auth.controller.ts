import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../Utils/sendResponse";

const loginUser= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload=req.body;

    const {accessToken,refreshToken}= await authService.loginUser(payload);

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge: 24*1000*60*60
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge: 24*1000*60*60*7
    })

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"User login successfully",
        data:{accessToken,refreshToken},
    })
})

export const authController={
    loginUser
}