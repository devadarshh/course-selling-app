import { Router} from "express";
import {validateSigninCreds} from "../middlewares/validationMiddleware";
import { adminSignin, adminSignup, createCourse, deleteCourse, fetchAdminCourses, updateCourse } from "../controllers/adminController";
import { isAdminLoggedIn, isCourseExists } from "../middlewares/adminMiddleware";

const adminRouter = Router();

adminRouter.post("/signup",validateSigninCreds,adminSignup );
adminRouter.post("/signin", validateSigninCreds,adminSignin);
adminRouter.get("/course", isAdminLoggedIn, fetchAdminCourses)
adminRouter.post("/course", isAdminLoggedIn, createCourse)    //todo
adminRouter.put("/course", isAdminLoggedIn,isCourseExists, updateCourse)   //todo
adminRouter.delete("/course", isAdminLoggedIn,isCourseExists, deleteCourse)   //todo

export default adminRouter;
