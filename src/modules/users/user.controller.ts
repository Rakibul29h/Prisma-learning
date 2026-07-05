import { Router, type NextFunction, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";
import { catchAsync } from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";
import jwt from "jsonwebtoken"
import { verifyJWT } from "../../Utils/jwt";


const registerUser=catchAsync( async (req: Request, res: Response,next:NextFunction) => {
 
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res,{
      success:true,
      statusCode:201,
      message:"User registerd Successfully",
      data:{
        user
      }
    })
  
})

const getMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

  const {accessToken}=req.cookies;

  const verifiedToken= verifyJWT(accessToken,config.jwt_access_secret)
  
  if(typeof verifiedToken==="string")
    throw new Error(verifiedToken);


  const profile = await userService.getMyprofileFromDB(verifiedToken.id )

  sendResponse(res,{
    success:true,
    statusCode:200,
    message:"User retrive succesfully",
    data:profile
  })
})
export const userController = {
  registerUser,
  getMyProfile,
};
