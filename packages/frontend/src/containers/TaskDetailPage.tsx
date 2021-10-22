import React from 'react';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import DraftList from '../components/DraftList';
import TaskDetail from '../components/TaskDetail';

const TaskDetailPage = (props: any) => {
    const taskId = props.match.params.taskId;
    return <div>
        <TaskDetail taskId={taskId} />
        <br />
        <DraftList taskId={taskId}/>
    </div>
}

export default TaskDetailPage;