import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_ADMIN_SECRET } from "../config/constants";
import db from "../db";

export const isAdminLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).json({ msg: "Admin not signed in" });
    return;
  }
  const tokenString = Array.isArray(token) ? token[0] : token;

  try {
    const decodedToken = jwt.verify(tokenString, JWT_ADMIN_SECRET) as JwtPayload;
    req.adminId = decodedToken.adminId;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" , token});
  }
};

export const isCourseExists = async(req:Request, res:Response, next:NextFunction)=>{
  const adminId = req.adminId as string;
  const {id} = req.body;
  if(!adminId || !id){
    return res.json({
      msg:"adminId or courseId is missing",
      adminId,id
    })
  }
  try{

    const foundCourse = await db.course.findUnique({
      where:{
        id, adminId
      }
    })
    next();
  }catch(error){
    return res.json({msg:"no course found"})
  }
}
