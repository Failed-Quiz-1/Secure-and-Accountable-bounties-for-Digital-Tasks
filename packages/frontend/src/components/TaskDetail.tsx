import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import Task from "../models/task";

interface TaskDetailProp {
    task: Task
}

const TaskDetail = (props: TaskDetailProp) => {
    const task = props.task;
    return <div>
        <Header as='h2' attached='top'>
            {task.name}
        </Header>
        <Segment attached>
            {task.description}
            <div>
                <br/>
                <br/>
                {
                    task.status === "POSTED" ? <Label as='a' tag>Posted</Label> : task.status === "APPROVED" ? <Label as='a' color='teal' tag>Approved</Label> : <Label as='a' color='blue' tag>Completed</Label>
                }
            </div>
            <br />
            <br />
            <p>Approval draft id: {task.approval_draft_id}</p>
            <p>IP signature: {task.ip_signature}</p>
            <p>Payment signature: {task.payment_signature}</p>
            <br />
            <br />
            <span style={{color: 'grey'}}>Posted 1 hour ago</span>
        </Segment>
        <br/>
    </div>
}

export default TaskDetail;