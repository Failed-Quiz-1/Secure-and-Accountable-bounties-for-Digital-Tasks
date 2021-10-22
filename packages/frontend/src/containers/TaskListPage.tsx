import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import TaskList from '../components/TaskList';

const TaskListPage = () => {
    return (
    <div>
        <Header as='h2' block>
            Tasks Postings
        </Header>
        <br />
        <TaskList / >
    </div>
    );
}

export default TaskListPage;