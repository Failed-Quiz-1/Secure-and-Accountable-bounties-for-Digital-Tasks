import User from "./user";

export default interface Task {
  id: number;
  name: string;
  description: string;
  poster: User;
  status: string;
  approval_draft_id: number;
  payment_signature: string;
  payment_sig_message: string;
  ip_signature: string;
  ip_sig_message: string;
  server_signature: string;
  server_sig_message: string;
}
