import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Header,
  Icon,
  Loader,
  Segment,
  Step,
} from "semantic-ui-react";
import JobDetail from "../components/JobDetail";
import TaskList from "../components/TaskList";
import Task from "../models/task";
import { fetchTaskList } from "../utils/api";

const TaskListPage = (props: any) => {
  const jobId = props.match.params.jobId;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setTasks([]);
    var data = await fetchTaskList(jobId);
    setTasks(data);
    setLoading(false);
  };

  return (
    <div>
      <JobDetail jobId={jobId} />
      <Header as="h2" block>
        Tasks
      </Header>
      {loading ? <Loader active>Loading</Loader> : <TaskList tasks={tasks} />}
    </div>
  );
};

export default TaskListPage;
