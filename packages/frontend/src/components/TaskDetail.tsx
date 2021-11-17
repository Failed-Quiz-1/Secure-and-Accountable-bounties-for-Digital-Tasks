import React from "react";
import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import Task from "../models/task";
import TaskProgress from "./TaskProgress";

interface TaskDetailProp {
  task: Task;
}

const TaskDetail = (props: TaskDetailProp) => {
  const task = props.task;
  return (
    <div>
      <Header as="h2" attached="top">
        {task.name}
      </Header>
      <Segment attached>
        {task.description}
        <br />
        <br />
        <br />
        <TaskProgress task={props.task} />
        <br />
      </Segment>
      <br />
    </div>
  );
};

export default TaskDetail;
