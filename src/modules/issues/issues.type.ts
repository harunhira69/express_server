export type IssueType = {
    title:string,
    description:string,
    type: "bug" | "feature_request";
    reporter_id:number
}