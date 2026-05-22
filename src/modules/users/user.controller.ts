import type { Request, Response } from "express"
import type { Users } from "./user.types"
import { userService } from "./user.service";
import asyncHandler from "../../utility/asyncHandler";

const createUser = asyncHandler(
     async(req:Request,res:Response)=>{
    //    try {
    //     const result = await userService.createUserIntoDB(req.body)
    //     // console.log(result)

    //     res.status(201).json({
    //         success: true,
    //         message: "User registered successfully",
    //         data: result

    //     });
    // } catch (error: any) {

    //     res.status(500).json({
    //         success: false,
    //         message: error.message,
    //         data: error

    //     });
    // }
  

     const result = await userService.createUserIntoDB(req.body)
        // console.log(result)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result

        });

}
)

export const userController = {
    createUser,
}