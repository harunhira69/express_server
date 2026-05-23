import type { Request, Response } from "express"
import type { Users } from "./user.types"
import { userService } from "./user.service";
import asyncHandler from "../../utility/asyncHandler";
import { StatusCodes } from "http-status-codes";

const createUser = asyncHandler(
     async(req:Request,res:Response)=>{
 
  

     const result = await userService.createUserIntoDB(req.body)
        // console.log(result)

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User registered successfully",
            data: result

        });

}
)

export const userController = {
    createUser,
}