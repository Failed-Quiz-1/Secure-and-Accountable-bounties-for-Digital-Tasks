export default interface Task {
    id: number, 
    name: string, 
    description: string, 
    status: string,
    approval_draft_id: string, 
    payment_signature: string,
    ip_signature: string
}