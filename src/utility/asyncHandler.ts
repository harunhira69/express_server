import type { NextFunction, Request, Response } from "express";

const asyncHandler = (callback:any)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
  try {
    await callback(req,res,next)
  } catch (error) {
    next(error)
  }
    }

   
}
export default asyncHandler;