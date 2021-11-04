import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Header, Icon, Loader } from "semantic-ui-react";
import TaskList from "../components/TaskList";
import Task from "../models/task";
import { fetchTaskList } from "../utils/api";

const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setTasks([]);
    var data = await fetchTaskList();
    setTasks(data);
    setLoading(false);
  };

  return (
    <div>
      <Header as="h2" block>
        Tasks Postings
        <Link to="/createtask">
          <Button floated="right" color="teal">
            Create Task
          </Button>
        </Link>
      </Header>
      <br />
      {loading ? <Loader active>Loading</Loader> : <TaskList tasks={tasks} />}
    </div>
  );
};

export default TaskListPage;
