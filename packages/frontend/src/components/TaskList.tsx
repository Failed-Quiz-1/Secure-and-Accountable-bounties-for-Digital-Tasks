import React from 'react';
import { Card, Header, Item, Label } from 'semantic-ui-react';
import Task from '../models/task';
import TaskCard from './TaskCard';

interface TaskListProps {
    tasks: Task[];
}

const TaskList = (props: TaskListProps) => {
    return <div>
        <Item.Group divided>
            {props.tasks.map(task => <TaskCard task={task}/>)}
        </Item.Group>
    </div>;
}

export default TaskList;