import React, { useEffect, useState } from "react";
import { Button, Header, Label, Loader, Segment } from "semantic-ui-react";
import DraftList from "../components/DraftList";
import MnemonicModal from "../components/MnemonicModal";
import TaskDetail from "../components/TaskDetail";
import Task from "../models/task";
import { fetchTaskDetail } from "../utils/api";

const TaskDetailPage = (props: any) => {
  const taskId = props.match.params.taskId;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTask(taskId);
  }, []);

  const fetchTask = async (id: number) => {
    setLoading(true);
    setTask(null);
    var task: Task = await fetchTaskDetail(id);
    setTask(task);
    setLoading(false);
  };

  if (loading || task == null) {
    return <Loader active>Loading</Loader>;
  }

  return (
    <div>
      <TaskDetail task={task} />
      <br />
      <DraftList task={task} />
    </div>
  );
};

export default TaskDetailPage;
