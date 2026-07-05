import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { ILoginUser } from "./auth.interface";
import jwt, {type JwtPayload, type SignOptions} from "jsonwebtoken";
import config from "../../config";
import {jwtSign, verifyJWT} from "../../Utils/jwt";
import {verify} from "node:crypto";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  // is exists;

  const user = await prisma.user.findUniqueOrThrow({
    where: {email}
  });

     if(user.activeStatus==="BLOCKED"){
        throw new Error("Your account has been blocked. Please contact support")
    }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password not match");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  const accessToken = jwtSign(jwtPayload,config.jwt_access_secret,config.jwt_access_expires_in as SignOptions)

  const refreshToken = jwtSign(jwtPayload,config.jwt_refresh_secret,config.jwt_refresh_expires_in as SignOptions)
  return {
    accessToken,
    refreshToken, 
  };
}; 


const refreshToken = async ( refresh_token:string)=>{

  const verified= verifyJWT(refresh_token, config.jwt_refresh_secret);

  if(!verified.success){
    throw new Error(verified.error);
  }
  const {id}= verified.data as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {id}
  })

  if (user.activeStatus==="BLOCKED"){
    throw new Error("Your account has been blocked. Please contact support")
  }

  const jwtPayload = {
    id,
    name:user.name,
    email:user.email,
    role:user.role,
  }

  const accessToken = jwtSign(jwtPayload,config.jwt_access_secret,config.jwt_access_expires_in as SignOptions)

  return accessToken;
}
export const authService = {
  loginUser,
  refreshToken,
};
