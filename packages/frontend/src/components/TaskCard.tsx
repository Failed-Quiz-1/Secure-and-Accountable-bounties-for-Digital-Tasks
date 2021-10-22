import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Item, Label } from 'semantic-ui-react';

const TaskCard = () => (
    <Item>
        <Item.Content>
            <Item.Header as='a'>Help to build a new social media app</Item.Header>
            <Item.Meta>
            <span className='cinema'>Posted 1 hour ago</span>
            </Item.Meta>
            <Item.Description>I need someone to help to build me another billion dollar app</Item.Description>
            <Item.Extra>
                <Label>APPROVED</Label>
                <Link to='tasks/123'>
                <Button primary floated='right'>
                    View Details
                </Button>
                </Link>
            </Item.Extra>
        </Item.Content>
    </Item>
  )

export default TaskCard;