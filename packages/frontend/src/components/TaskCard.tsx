import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Header,
  Icon,
  Item,
  Label,
  Segment,
  Step,
} from "semantic-ui-react";
import Task from "../models/task";

interface TaskCardInterface {
  task: Task;
}

const TaskCard = (props: TaskCardInterface) => (
  <Segment>
    <Item>
      <Item.Content>
        <Header as="a">{props.task.name}</Header>
        <Item.Meta>
          <span className="cinema">Posted 1 hour ago</span>
        </Item.Meta>
        <Item.Description>{props.task.description}</Item.Description>
        <ProgressStep />
        <Item.Extra>
          <Label>{props.task.status}</Label>
          <Link to={`/tasks/${props.task.id}`}>
            <Button primary floated="right">
              View Details
            </Button>
          </Link>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Segment>
);

const ProgressStep = () => {
  return (
    <Step.Group widths={5} ordered>
      <Step completed>
        <Step.Content>
          <Step.Title>Posted</Step.Title>
          <Step.Description>Draft submitted successfully</Step.Description>
        </Step.Content>
      </Step>

      <Step completed>
        <Step.Content>
          <Step.Title>Approved</Step.Title>
          <Step.Description>Payment submitted to Fiver</Step.Description>
        </Step.Content>
      </Step>

      <Step active>
        <Step.Content>
          <Step.Title>Completed</Step.Title>
          <Step.Description>IP released to Fiver</Step.Description>
        </Step.Content>
      </Step>

      <Step active>
        <Step.Content>
          <Step.Title>Release IP & Payment</Step.Title>
          <Step.Description>Fiver released IP and payment</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default TaskCard;
