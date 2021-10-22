import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Header, Icon, Loader } from 'semantic-ui-react';
import TaskList from '../components/TaskList';
import Task from '../models/task';

const TaskListPage = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = () => {
        setLoading(true)
        setTasks([]);
        fetch('http://localhost:3000/task')
            .then(response => response.json())
            .then((data: Task[]) => {setTasks(data); setLoading(false)});
    }

    return (
    <div>
        <Header as='h2' block>
            Tasks Postings
            <Link to='/createtask'>
                <Button floated='right' color='teal'>Create Task</Button>
            </Link>
        </Header>
        <br />
        {loading ?  <Loader active>Loading</Loader> : <TaskList tasks={tasks} />}
    </div>
    );
}

export default TaskListPage;