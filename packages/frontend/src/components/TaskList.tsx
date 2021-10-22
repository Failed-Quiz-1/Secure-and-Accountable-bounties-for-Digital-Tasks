import React from 'react';
import { Card, Header, Item, Label } from 'semantic-ui-react';
import TaskCard from './TaskCard';

const TaskList = () => {
    return <div>
        <Header as='h2' attached='top'>
            Tasks Postings
        </Header>
        <Item.Group divided>
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
        </Item.Group>
    </div>;
}

export default TaskList;