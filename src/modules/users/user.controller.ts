import { Router, type NextFunction, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";
import { catchAsync } from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import jwt from "jsonwebtoken"
import { verifyJWT } from "../../Utils/jwt";


const registerUser=async (req: Request, res: Response) => {
 
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res,{
      success:true,
      statusCode:201,
      message:"User registered Successfully",
      data:{
        user
      }
    })
  
}

const getMyProfile=async(req:Request,res:Response)=>{


  const profile = await userService.getMyprofileFromDB(req.user?.id as string )

  sendResponse(res,{
    success:true,
    statusCode:200,
    message:"User retrieve successfully",
    data:profile
  })
}

const updateMyProfile=async(req:Request,res:Response)=>{
    const userId= req.user?.id as string;
    const payload = req.body;
    const updatedProfile= await userService.updateMyProfile(userId,payload);
     sendResponse(res,{
         success:true,
         statusCode:200,
         message:"User profile updated successfully",
         data:updatedProfile
     })
}
export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile,
};
