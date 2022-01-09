import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { JiraTemplate } from "./templates/JiraTemplate";

import SignIn from "./pages/User/SignIn";

import MainBoard from "./pages/ProjectManagement/MainBoard/MainBoard";
import Project from "./pages/ProjectManagement/Project/Project";
import { UserTemplate } from "./templates/UserTemplate";
import CreateProject from "./pages/ProjectManagement/CreateProject/CreateProject";
import UserManagement from "./pages/User/UserManagement/UserManagement";
import EditUser from "./pages/User/UserManagement/EditUser";
import CreateTask from "./pages/Task Management/CreateTask/CreateTask";
import ProjectDetail from "./pages/ProjectManagement/Project/ProjectDetail/ProjectDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <UserTemplate path="/signin" exact Component={SignIn} />

          <JiraTemplate path="/project" exact Component={Project} />
          <JiraTemplate path="/createproject" exact Component={CreateProject} />
          <JiraTemplate path="/usermanagement" exact Component={UserManagement} />
          <JiraTemplate path="/projectdetail/:id" exact Component={ProjectDetail} />
          <JiraTemplate path="/edituser/:id" exact Component={EditUser} />
          <JiraTemplate path="/createtask" exact Component={CreateTask} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
