import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";
import config from "../config";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     console.log("Authorization Header:", req.headers.authorization);
    const token =
      req.headers.authorization;

    // token check
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    );
       console.log("Decoded User:", decoded);
    // attach user
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};