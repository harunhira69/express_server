import bcrypt from "bcrypt";
import type { Users } from "./user.types"
import { pool } from "../../db";

const createUserIntoDB = async(payload:Users)=>{
      const {name,email,password,role}= payload;

    //   check existing email
    const existingUser = await pool.query(`
        
        SELECT * FROM users WHERE email=$1
        `,[email]);
        if(existingUser.rows.length>0){
            throw new Error ("Email already exists")
        }

        // hash password
      const hashPassword = await bcrypt.hash(password,10)

      const result = await pool.query(`
        
        INSERT INTO users(name,email,password,role)
        VALUES($1,$2,$3,$4)
        RETURNING id,name,email,role,created_at,updated_at
        `,[name,email,hashPassword,role || 'contributor'])
        return result.rows[0]


}

export const userService = {
    createUserIntoDB,
}