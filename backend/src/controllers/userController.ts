import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import { JWT_USER_SECRET } from "../config/constants";
import jwt from "jsonwebtoken";

export const userSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already in use" });
    }
    if (!name) {
      return res.status(400).json({ msg: "Please provide your name" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      msg: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
export const userSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(404).json({ msg: "user not found" });
    return;
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    res.status(401).json({ msg: "Invalid credentials" });
    return;
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_USER_SECRET);

  return res.status(200).json({
    msg: "Sign-in successful",
    token,
  });
};

export const fetchUserCourses = async(req:Request, res:Response)=>{
    const userId = req.userId;
    try {
        const data = await db.purchasedCourseDetails.findMany({
            where:{userId}
        })
        const courses = await Promise.all(
          data.map(async (i) => {
            return await db.course.findUnique({ where: { id: i.courseId } });
          })
        );
        console.log(courses)
        return res.json({
            courses
        })
        
    } catch (error) {
        return res.json({error})
    }
}
