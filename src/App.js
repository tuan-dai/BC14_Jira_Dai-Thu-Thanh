import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { JiraTemplate } from "./templates/JiraTemplate";

import SignIn from "./pages/User/SignIn";
import UserManagement from "./pages/User/UserManagement/UserManagement";
import EditUser from "./pages/User/UserManagement/EditUser";

import Project from "./pages/ProjectManagement/Project/Project";
import { UserTemplate } from "./templates/UserTemplate";
import CreateProject from "./pages/ProjectManagement/CreateProject/CreateProject";
import PopupProject from "./pages/ProjectManagement/PopupProject/PopupProject"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PopupProject />
        <Switch>
          <UserTemplate path="/signin" exact Component={SignIn} />

          <JiraTemplate path="/project" exact Component={Project} />
          <JiraTemplate path="/createproject" exact Component={CreateProject} />
          {/* <JiraTemplate path="/editproject/:id" exact Component={EditProject} /> */}

          <JiraTemplate path="/user-management" exact Component={UserManagement} />
          <JiraTemplate path="/edituser/:id" exact Component={EditUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
