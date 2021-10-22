import React, { useEffect, useState } from 'react';
import { Button, Header, Label, Loader, Segment } from 'semantic-ui-react';
import DraftList from '../components/DraftList';
import TaskDetail from '../components/TaskDetail';
import Task from '../models/task';

const TaskDetailPage = (props: any) => {
    const taskId = props.match.params.taskId;

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTask(taskId);
    }, [])

    const fetchTask = (id: number) => {
        setLoading(true)
        setTask(null);
        fetch('http://localhost:3000/task/' + id.toString())
            .then(response => response.json())
            .then((data: Task) => {console.log(data); setTask(data); setLoading(false)});
    }

    if (loading || task == null) {
        return <Loader active>Loading</Loader>
    }

    return <div>
        <TaskDetail task={task} />
        <br />
        <DraftList taskId={taskId}/>
    </div>
}

export default TaskDetailPage;