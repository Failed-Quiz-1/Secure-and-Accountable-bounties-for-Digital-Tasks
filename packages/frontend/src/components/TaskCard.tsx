import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Item, Label } from 'semantic-ui-react';
import Task from '../models/task';

interface TaskCardInterface {
    task: Task
}

const TaskCard = (props: TaskCardInterface) => (
    <Item>
        <Item.Content>
            <Item.Header as='a'>{props.task.name}</Item.Header>
            <Item.Meta>
            <span className='cinema'>Posted 1 hour ago</span>
            </Item.Meta>
            <Item.Description>{props.task.description}</Item.Description>
            <Item.Extra>
                <Label>{props.task.status}</Label>
                <Link to={`tasks/${props.task.id}`}>
                <Button primary floated='right'>
                    View Details
                </Button>
                </Link>
            </Item.Extra>
        </Item.Content>
    </Item>
  )

export default TaskCard;