import { Request, Response } from "express";
import db from "../db";

export const fetchAllCourses = async (req:Request, res:Response) => {
    try {
      const courses = await db.course.findMany();
      return res.status(200).json(courses);
    } catch (e) {
      return res.status(500).json({msg:"no course found"});
    }
  }

export const purchaseCourse = async(req:Request, res:Response)=>{
    const {courseId}= req.body;
    const userId = req.userId as string;
    try{
      const buy = await db.purchasedCourseDetails.create({
        data:{
          userId,courseId
        }
      })
      return res.status(200).json({
        msg:"course successfully purchased",
        buy
      })
    }catch(error){
      res.json({error})
    }

    
}