// src/types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      adminId?: string | JwtPayload; // Add adminId to the Request type
      userId:string
    }
  }
}
