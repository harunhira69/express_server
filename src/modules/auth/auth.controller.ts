import type { Request, Response } from "express";
import { authService } from "./auth.service";
import asyncHandler from "../../utility/asyncHandler";



const loginUser = asyncHandler (
    async(req:Request,res:Response)=>{
       const result = await authService.loginUserIntoDB(req.body)
        res.status(200).json({
        success:true,
        message:"Login successful",
        data:result
    })
    }
)
export const authController = {
    loginUser,
}