import { Router} from "express";
import {validateSigninCreds} from "../middlewares/validationMiddleware";
import { fetchUserCourses, userSignin, userSignup } from "../controllers/userController";
import { isUserLoggedIn } from "../middlewares/userMiddleware";

const userRouter = Router();

userRouter.post("/signup",validateSigninCreds,userSignup);

userRouter.post("/signin", validateSigninCreds,userSignin);

userRouter.get("/courses",isUserLoggedIn,fetchUserCourses)

export default userRouter;
