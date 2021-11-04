import Task from "./task";
import User from "./user";

export default interface Draft {
  id: number;
  draft_signature: string;
  draft_sig_message: string;
  reject_signature: string;
  reject_sig_message: string;
  createdOn: string;
  task: Task;
  author: User;
}
