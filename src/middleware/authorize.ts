import type { NextFunction, Request, Response } from "express";
import type { Role } from "../modules/users/user.types";
import type { RequestWithUser } from "../types";

const authorize = (...roles: Role[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ):void => {
    const user = req.user;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: "Forbidden Access",
      });
      return
    }

    next();
  };
};

export default authorize;