import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_USER_SECRET } from "../config/constants";

export const isUserLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).json({ msg: "user not signed in" });
    return;
  }
  const tokenString = Array.isArray(token) ? token[0] : token;

  try {
    const decodedToken = jwt.verify(tokenString, JWT_USER_SECRET) as JwtPayload;
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};
