import dotenv from 'dotenv'
import { env } from 'node:process'

dotenv.config({quiet:true})
const config ={
    port:env.PORT,
    database_url:env.DATABASE_URL,
    jwt_secret:env.JWT_SECRET
}

export default config;