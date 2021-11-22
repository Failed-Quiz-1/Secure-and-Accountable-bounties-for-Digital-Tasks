import React from "react";
import { Card, Header, Item, Label } from "semantic-ui-react";
import Task from "../models/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = (props: TaskListProps) => {
  if (!props.tasks || props.tasks.length === 0) {
    return (
      <div style={{ marginLeft: "6px" }}>
        <br />
        <p>No tasks available yet</p>
      </div>
    );
  }
  return (
    <div>
      <Item.Group divided>
        {props.tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </Item.Group>
      <br />
      <br />
    </div>
  );
};

export default TaskList;
