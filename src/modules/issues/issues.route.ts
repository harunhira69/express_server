import { Router } from "express";
import { userIssueController } from "./issues.controller";
import { auth } from "../../middleware/auth.middleware";
import authorize from "../../middleware/authorize";

const router = Router();
router.post('/issues',auth, userIssueController.issueController)
router.get('/issues/:id',userIssueController.getSingleIssue)
router.patch('/issues/:id',
authorize("contributor", "maintainer"),
auth,
userIssueController.updateIssue)
router.delete('/issues/:id',
auth,
authorize("maintainer"),
userIssueController.deleteIssue)



export const issuesRoute = router;
    
