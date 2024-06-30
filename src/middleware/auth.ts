import { auth } from "express-oauth2-jwt-bearer";
import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global{
  namespace Express{
    interface Request{
      userId:string;
      auth0Id:string;
    }
  }
}

 export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

// parsing to get the userId
 export const jwtprse = async(req:Request,res:Response,next:NextFunction)=>{
  const {authorization} = req.body
  if(!authorization || !authorization.startsWith("Bearer")){
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];
  try{
    const decodetoken = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decodetoken.sub;
    const user = await User.findOne({auth0Id})
    if(!user){
      return res.sendStatus(401)
    }
    // typescript doesnt understand when we change something in req
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  }catch(e){
    // not authorized

    return res.sendStatus(401);
  }
}

// export default{
//   jwtCheck,jwtprse
// }