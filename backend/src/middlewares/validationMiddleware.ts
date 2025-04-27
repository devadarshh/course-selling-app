import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateSigninCreds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredBody = z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().max(100),
    password: z.string().min(5).max(100),
  }); 

  const parsedBody = requiredBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid input",
      error: parsedBody.error.errors,
    });
  }

  req.body = parsedBody.data;
  next();
};

