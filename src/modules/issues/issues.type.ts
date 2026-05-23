export type CreateIssue = {
    title:string,
    description:string,
    type: "bug" | "feature_request";
    reporter_id:number
}


export type IssueType = 'bug' | 'feature_request';
export type IssueStatus = 'open'|'in_progress'|'resolved';
export type Reporter = {
id: number;
  name: string;
  role: "maintainer" | "contributor";
}




export type Issue = {
  id: number;
  title: string;
  description: string;
  type: "bug" | "feature_request";
  status: "open" | "in_progress" | "resolved";
  reporter_id: number;
  created_at: string;
  updated_at: string;
};


export type IssueResponse = {
    id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  reporter: {
    id: number;
    name: string;
    role: string;
  } | null;
  created_at: string;
  updated_at: string;
}