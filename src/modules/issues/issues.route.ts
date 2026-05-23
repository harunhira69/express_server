import { Router } from "express";
import { userIssueController } from "./issues.controller";
import { auth } from "../../middleware/auth.middleware";
import authorize from "../../middleware/authorize";

const router = Router();
router.post('/issues',auth, userIssueController.issueController)
router.get('/issues/:id',userIssueController.getSingleIssue)
router.get('/issues',userIssueController.getALlIssue)

router.patch('/issues/:id',
auth,
authorize("contributor", "maintainer"),
userIssueController.updateIssue)
router.delete('/issues/:id',
auth,
authorize("maintainer"),
userIssueController.deleteIssue)



export const issuesRoute = router;
    
