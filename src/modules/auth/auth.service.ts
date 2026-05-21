import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { Users } from "../users/user.types";

const loginUserIntoDB = async(payload:
    {email:string,password:string}
)=>{

    const {email,password}= payload;
    const userData = await pool.query(`
        SELECT * FROM users WHERE email = $1`,[email]);
    
    if(userData.rows.length===0){
        throw new Error("Invalid Credential")
    }

      const user = userData.rows[0];
    console.log(user)
    const matchPassword = await bcrypt.compare(password,user.password);
    if(!matchPassword){
          throw new Error("Invalid Credential")
    }


}


export const authService = {
    loginUserIntoDB,
}