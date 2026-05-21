import type { Request, Response } from "express"
import type { Users } from "./user.types"
import { userService } from "./user.service";

const createUser = async(req:Request,res:Response)=>{
       try {
        const result = await userService.createUserIntoDB(req.body)
        // console.log(result)

        res.status(201).json({
            success: true,
            message: "Create user successfully",
            data: result.rows[0],

        });
    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message,
            data: error

        });
    }
  
    

}

export const userController = {
    createUser,
}