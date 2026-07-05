import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"
import config from "../config";

export const jwtSign=(payload:JwtPayload,secret:string,expire:SignOptions)=>{
    return  jwt.sign(payload, secret, {
    expiresIn: expire,
  } as SignOptions);
}

export const verifyJWT=(token:string,secret:string)=>{
  try {
    const verifiedToken= jwt.verify(token,secret)
    return {
      success:true,
      data:verifiedToken
    }
  } catch (error) {
    console.log(error);
    return {
      success:false,
      error:(error as Error).message
    }
  }
}