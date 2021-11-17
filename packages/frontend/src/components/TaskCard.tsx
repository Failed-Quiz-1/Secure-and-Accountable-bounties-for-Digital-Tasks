import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  Header,
  Icon,
  Item,
  Label,
  Segment,
  Step,
} from "semantic-ui-react";
import Task from "../models/task";
import TaskProgress from "./TaskProgress";

interface TaskCardInterface {
  task: Task;
}

const TaskCard = (props: TaskCardInterface) => (
  <Segment>
    <div style={{ padding: "16px" }}>
      <Item>
        <Item.Content>
          <Header as="a">{props.task.name}</Header>
          <div style={{ margin: "16px" }} />
          <Item.Description>{props.task.description}</Item.Description>
          <div style={{ margin: "16px" }} />
          <Divider />
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "4px",
              fontSize: "15px",
            }}
          >
            <Icon name="money" />
            {`      USD ${props.task.price}.00`}
          </div>

          <TaskProgress task={props.task} />
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
    </div>
  </Segment>
);

export default TaskCard;
