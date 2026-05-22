import type { NextFunction, Request, Response } from "express";
import type { Role } from "../modules/users/user.types";

const authorize = (...roles: Role[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden Access",
      });
    }

    next();
  };
};

export default authorize;