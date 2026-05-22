import { Router } from "express";
import { userIssueController } from "./issues.controller";
import { auth } from "../../middleware/auth.middleware";

const router = Router();
router.post('/issues',auth, userIssueController.issueController)

export const issuesRoute = router;
    
