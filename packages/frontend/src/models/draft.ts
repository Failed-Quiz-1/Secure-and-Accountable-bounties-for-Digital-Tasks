import Task from "./task";
import User from "./user";

export default interface Draft {
    id: number,
    draft_signature: string,
    reject_signature: string, 
    createdOn: string,
    task: Task,
    author: User
}