import type { Request, Response } from "express";
import { issueService } from "./issues.service";
import asyncHandler from "../../utility/asyncHandler";
import type { AppError, RequestWithUser } from "../../types";

const issueController =asyncHandler(
async(req:RequestWithUser,res:Response)=>{



   const {title,description,type} = req.body;

        // field validation
        if(!title || !description|| !type){
          const error = new Error(
    "All Field are required"
  ) as AppError;

  error.statusCode = 400;

  throw error;
        }
        // title validation
        if(title.length>150){
          const error = new Error("Title maximum length is 150") as AppError;
           error.statusCode = 400;
           throw error
        }
        // description validation
        if(description.length<20){
   const error =
        new Error(
          "Description minimum length is 20"
        ) as AppError;

      error.statusCode = 400;

      throw error;
        }
        // type validation
        if(!['bug','feature_request'].includes(type)){
            const error =
        new Error(
          "Invalid issue type"
        ) as AppError;

      error.statusCode = 400;

      throw error;
        
        }

          const reporter_id = req.user.id;
     

        const result =
  await issueService.createIssueIntoDB({
    title,
    description,
    type,
    reporter_id,
  });

  return res.status(201).json({
    success:true,
    message:"Issues created successfully",
    data:result
  })

})
// get single issue
const getSingleIssue = asyncHandler(
    async(req:Request,res:Response)=>{
        const {id}= req.params;

        if(isNaN(Number(id))){
        const error = new Error("Invalid issue id") as AppError
        error.statusCode = 400
        throw error
    }
    const result = await issueService.getSingleIssueFromDB(Number(id))
    if(!result){
        const error = new Error("Issue Not Found") as AppError
        error.statusCode = 404
        throw error 
    }
    return res.status(200).json({
        success:true,
        data:result
    })

    }
)
// update issue
const updateIssue = asyncHandler(
    async(req:RequestWithUser,res:Response)=>{
     const {id} = req.params;

      const user = req.user

    //   check id
        if(isNaN(Number(id))){
        const error = new Error("Invalid issue id") as AppError
        error.statusCode = 400
        throw error
    }
    const result =await issueService.getIssueRowFromDB(Number(id))
    if(!result){
        const error = new Error("Issue Not Found") as AppError
        error.statusCode = 404
        throw error

    }



 if(user.role === "contributor"){
        if(result.reporter_id !== user.id){
            const error = new Error("You can only update your own issues") as AppError
            error.statusCode = 403
            throw error
        }
        if(result.status !== "open"){
            const error = new Error("You can only update issues with open status") as AppError
            error.statusCode = 409
            throw error
        }
    }
 
    const {title,description,type} = req.body
  
    if(type && !["bug","feature_request"].includes(type)){
        const error = new Error("Invalid issue type") as AppError
        error.statusCode = 400
        throw error
    }


    const updateResult = await issueService.updateIssueIntoDb(Number(id),{title,description,type})
      return res.status(200).json({
        success:true,
        message:"Issue updated successfully",
        data:updateResult
    })

    }


)

// delete issue

const deleteIssue = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;

    const user = req.user;

    // id validation
    if (isNaN(Number(id))) {
      const error = new Error("Invalid issue id") as AppError;
      error.statusCode = 400;
      throw error;
    }

    // issue exists
    const issueResult =
      await issueService.getIssueRowFromDB(Number(id));

    if (!issueResult) {
      const error = new Error("Issue not found") as AppError;
      error.statusCode = 404;
      throw error;
    }

    await issueService.deleteIssueIntoDB(
      Number(id)
    );

    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  }
);

export const userIssueController = {
    issueController,
    getSingleIssue,
    updateIssue,
    deleteIssue,

}