import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";




const app:Application = express()

app.use(express.json());

app.use('/api/auth',userRoute)
app.use('/api/auth',authRoute)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app