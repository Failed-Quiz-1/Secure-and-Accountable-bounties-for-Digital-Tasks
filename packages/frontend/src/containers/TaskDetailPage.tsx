import React from 'react';

const TaskDetailPage = (props: any) => {
    const taskId = props.match.params.taskId;
    return <p>TaskDetailPage: {taskId}</p>
}

export default TaskDetailPage;