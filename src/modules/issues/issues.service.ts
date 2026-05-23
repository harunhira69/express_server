import { pool } from "../../db";
import { type Issue, type CreateIssue, type IssueResponse, type IssueStatus, type IssueType, type Reporter } from "./issues.type";

// create issue
const createIssueIntoDB = async(payload:CreateIssue)=>{

    const {title,description,type,reporter_id} =payload;
    const result = await pool.query(`
    INSERT INTO issues(
    title,description,type,reporter_id
    )VALUES ($1,$2,$3,$4) RETURNING *    
        `,[title,description,type,reporter_id])

        return result.rows[0]


}

// allissue from db by sort

const getAllissueFromDB = async(
    sort:"newest"|"oldest" = "newest",
    type?:IssueType,
    status?:IssueStatus
):Promise<IssueResponse[]>=>{

let query = `
SELECT * FROM issues
`;

const values:(string|number)[]=[];

const condition:string[] = [];

if(type){
    values.push(type);
    condition.push(`type=$${values.length}`);


}

if(status){
    values.push(status);
    condition.push(`status = $${values.length}`);
}

if(condition.length){
   query += ` WHERE ` + condition.join(" AND ");
}

query += sort ==='oldest'?`ORDER BY created_at ASC`:`ORDER BY created_at DESC`

const {rows:issues} = await pool.query<Issue>(query,values)

const reporterId = [...new Set(issues.map((i)=>i.reporter_id))];

const reporterMap : Record<number,Reporter> = {};

if(reporterId.length>0){
    const placeholder = reporterId.map((_,i)=>`$${i+1}`).join(",");

    const {rows:users} = await pool.query<Reporter>(
        `
        SELECT id,name,role FROM users WHERE id IN (${placeholder})
        `,reporterId

    );

    for(const user of users){
        reporterMap[user.id] = user;
    }
}

return issues.map((issue) => ({
  id: issue.id,
  title: issue.title,
  description: issue.description,
  type: issue.type,
  status: issue.status,
  reporter: reporterMap[issue.reporter_id] || null,
  created_at: issue.created_at,
  updated_at: issue.updated_at,
}));
}

// get single issues by id
const getSingleIssueFromDB = async(id:number)=>{ 
const result = await pool.query(`
   SELECT * FROM issues WHERE id=$1 
    `,[id])
    if(result.rows.length===0){
        return null
    }
    const issue = result.rows[0];

    const reporter_result = await pool.query(`
     SELECT id,name,role FROM users WHERE id = $1   
        `,[issue.reporter_id])
    
        const reporter = reporter_result.rows[0]||null;
         
    return {
        id:issue.id,
        title:issue.title,
        description:issue.description,
        type:issue.type,
        status:issue.status,
        reporter,
        created_at:issue.created_at,
        updated_at:issue.updated_at,
    }

    // 
}

// check issue id
const getIssueRowFromDB = async(id:number)=>{
 
    const result = await pool.query(`
        SELECT * FROM issues WHERE id = $1
        `,[id])
 
    if(result.rows.length===0) return null
 
    return result.rows[0]
 
}

// update issue into db

const updateIssueIntoDb = async(id:number,payload:{title?:string,description?:string,type?:string})=>{
const {title,description,type} = payload;

const result = await pool.query(`
  UPDATE issues 
  SET
  title = COALESCE($1,title),
  description = COALESCE($2,description),
  type = COALESCE($3,type),
  status = 'in_progress',
  updated_at = NOW() WHERE id = $4
  RETURNING *


    `,[title, description, type, id])
    return result.rows[0]
}

// delete issue into db

const deleteIssueIntoDB = async(id:number)=>{
   await pool.query(`
  DELETE FROM issues WHERE id = $1  
    `,[id])
}
export const issueService = {
    createIssueIntoDB,
    getSingleIssueFromDB,
    updateIssueIntoDb,
    deleteIssueIntoDB,
    getIssueRowFromDB,
    getAllissueFromDB

}