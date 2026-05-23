import type { Request } from "express";
import type { Role } from "../modules/users/user.types";

export type JwtUserPayload = {
 id: number;
  name: string;
  email: string;
  role: Role;
}

export type RequestWithUser = Request & {
  user?: JwtUserPayload;
};

export interface AppError extends Error {
    statusCode?: number;
}