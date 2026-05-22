import type { Request, Response } from "express";
import { issueService } from "./issues.service";

const issueController =async(req:Request,res:Response)=>{

    try {
        const {title,description,type} = req.body;

        // field validation
        if(!title || !description|| !type){
           return res.status(400).json({
                success:false,
                Message:"All field are required"
            })
        }
        // title validation
        if(title.length>150){
            return res.status(400).json({
                success:false,
                message:"Title maximum length is 150"
            })
        }
        // description validation
        if(description.length<20){
            return res.status(400).json({
                success:false,
                message:"description length minimum 20"
            })
        }
        // type validation
        if(!['bug','feature_request'].includes(type)){
            return res.status(400).json({
                success:false,
                message:"Invalid Issues type"
            })
        
        }
            // reporter id from jwt middleware
          const reporter_id = (req as any).user.id;
     

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

    } catch (error:any) {
       return res.status(500).json({
        success:false,
        message:error.message || "Something went wrong"
       })

    }


}

export const userIssueController = {
    issueController,
}