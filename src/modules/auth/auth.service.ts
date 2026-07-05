import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { ILoginUser } from "./auth.interface";
import jwt, { type SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtSign } from "../../Utils/jwt";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  // is exists;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
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

export const authService = {
  loginUser,
};
