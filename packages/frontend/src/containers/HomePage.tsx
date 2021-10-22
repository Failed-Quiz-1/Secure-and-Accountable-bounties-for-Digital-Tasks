import NavBar from "../components/NavBar"
import TaskListPage from "./TaskListPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TaskDetailPage from "./TaskDetailPage";
import { Divider } from "semantic-ui-react";
import CreateTaskPage from "./CreateTaskPage";


const HomePage = () => {
    return <div>
        <Router>
        <NavBar />
        <Divider />
        <br />
        <Switch>
          <Route path="/home">
            <TaskListPage />
          </Route>
          <Route path="/createtask">
            <CreateTaskPage />
          </Route>
          <Route path="/profile">
            <h1>profile page</h1>
          </Route>
          <Route path="/tasks/:taskId" component={TaskDetailPage}>
          </Route>
          <Route path="/">
            <TaskListPage />
          </Route>
        </Switch>
        </Router>  
    </div>
   
}

export default HomePage;