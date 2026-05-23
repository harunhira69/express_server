import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../types";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler = (err:AppError,req:Request,res:Response,next:NextFunction):void=>{
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        success:false,
        message:err.message||"Something went wrong",
        errors:err.message || "Internal server error"

    })

}
export default globalErrorHandler;