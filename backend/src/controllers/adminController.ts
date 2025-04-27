import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import { JWT_ADMIN_SECRET } from "../config/constants";
import jwt from "jsonwebtoken";

export const adminSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await db.admin.findUnique({
      where: { email },
    });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Email is already in use" });
    }
    if (!name) {
      return res.status(400).json({ msg: "Please provide your name" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await db.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      msg: "Admin created successfully",
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

export const adminSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await db.admin.findUnique({
    where: {
      email,
    },
  });
  if (!admin) {
    res.status(404).json({ msg: "admin not found" });
    return;
  }
  const passwordCheck = await bcrypt.compare(password, admin.password);
  if (!passwordCheck) {
    res.status(401).json({ msg: "Invalid credentials" });
    return;
  }
  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    JWT_ADMIN_SECRET
  );

  return res.status(200).json({
    msg: "Sign-in successful",
    token,
  });
};

export const fetchAdminCourses = async (req: Request, res: Response) => {
  const adminId = req.adminId as string;

  try {
    const courses = await db.course.findMany({
      where: {
        adminId,
      },
    });
    return res.status(200).json(courses);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
export const createCourse = async (req: Request, res: Response) => {
  const adminId = req.adminId as string
  const { name, description, price, imgUrl } = req.body;
  try {
    const course = await db.course.create({
      data: {
        name,
        description,
        adminId,
        price,
        imgUrl,
      },
    });
    return res.status(200).json({
      msg:"course created successfully", course
    })
  } catch (error) {
    return res.json(error);
  }
};
export const updateCourse = async (req: Request, res: Response) => {
  const adminId = req.adminId as string
  const {id, name,description,price,imgUrl} = req.body
  try {
   
    const updateCourse = await db.course.update({
      where:{
        id,adminId
      },data:{
        name,description,price, imgUrl
      }
    })
    return res.status(200).json({msg:"course updated successfully",updateCourse})
  } catch (error) {
    return res.json(error)
  }
};

export const deleteCourse = async (req:Request,res:Response)=>{
  const {courseId} = req.body;
  try{
    await db.course.delete({
      where:{
        id:courseId
      }
    })
    res.json({msg:"course deleted successfully"})
  }catch(error){
    return res.json({msg:"course does not exist anymore"})
  }


}
