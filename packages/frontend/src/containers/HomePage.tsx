import React from "react";
import NavBar from "../components/NavBar";
import TaskListPage from "./TaskListPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TaskDetailPage from "./TaskDetailPage";
import { Divider } from "semantic-ui-react";
import CreateTaskPage from "./CreateTaskPage";

import LoginPage from "./LoginPage";
import CreateDraftPage from "./CreateDraftPage";

import RegisterPage from "./RegisterPage";
import PrivateRoute from "../components/PrivateRoute";
import { getUsername } from "../utils/util";
import JobsListPage from "./JobsListPage";
import CreateJobPage from "./CreateJobPage";
import ProfilePage from "./ProfilePage";
const HomePage = () => {
  return (
    <div>
      <Router>
        {getUsername() && <NavBar />}
        <Divider />
        <br />
        <Switch>
          {/* public routes */}
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />

          {/* private routes */}
          <PrivateRoute exact path="/" component={JobsListPage} />
          <PrivateRoute exact path="/jobs/:jobId" component={TaskListPage} />
          <PrivateRoute path="/createjob" component={CreateJobPage} />
          <PrivateRoute path="/createtask/:jobId" component={CreateTaskPage} />
          <PrivateRoute
            path="/createdraft/:taskId"
            component={CreateDraftPage}
          />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/tasks/:taskId" component={TaskDetailPage} />
          <h1>Invalid url </h1>
        </Switch>
      </Router>
    </div>
  );
};

export default HomePage;
