import { Button, Header, Item, Label, Segment } from "semantic-ui-react";

interface TaskDetailProp {
    taskId: string
}

const TaskDetail = (props: TaskDetailProp) => {
    const taskId = props.taskId;
    return <div>
        <Header as='h2' attached='top'>
            Task Name here with id: {taskId}
        </Header>
        <Segment attached>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
            <div>
                <br/>
                <br/>
                <Label as='a' tag>
                    Posted
                </Label>
                <Label as='a' color='teal' tag>
                    Approved
                </Label>
                <Label as='a' color='blue' tag>
                    Completed
                </Label>
            </div>
            <br />
            <br />
            <span style={{color: 'grey'}}>Posted 1 hour ago</span>
        </Segment>
        <br/>
    </div>
}

export default TaskDetail;