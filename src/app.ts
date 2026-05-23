import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.route";
import notFound from "./middleware/notFound";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors"



const app:Application = express()
// middleware
app.use(cors())
app.use(express.json());

app.use('/api/auth',userRoute)
app.use('/api/auth',authRoute)
app.use('/api',issuesRoute)




app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use(notFound)
app.use(globalErrorHandler)

export default app