import { Router } from "express";
import { fetchAllCourses, purchaseCourse } from "../controllers/courseController";
import { isUserLoggedIn } from "../middlewares/userMiddleware";

const courseRouter = Router();

courseRouter.get("/", fetchAllCourses);

courseRouter.post("/purchase",isUserLoggedIn, purchaseCourse);

export default courseRouter
