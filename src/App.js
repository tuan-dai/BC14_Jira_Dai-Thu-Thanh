import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { JiraTemplate } from "./templates/JiraTemplate";

import SignIn from "./pages/User/SignIn";

import MainBoard from "./pages/ProjectManagement/MainBoard/MainBoard";
import Project from "./pages/ProjectManagement/Project/Project";
import { UserTemplate } from "./templates/UserTemplate";
import CreateProject from "./pages/ProjectManagement/CreateProject/CreateProject";
// import EditProject from "./pages/ProjectManagement/EditProject/EditProject";
import PopupProject from "./pages/ProjectManagement/PopupProject/PopupProject"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <PopupProject />
        <Switch>
          <UserTemplate path="/signin" exact Component={SignIn} />


          <JiraTemplate path="/" exact Component={MainBoard} />
          <JiraTemplate path="/project" exact Component={Project} />
          <JiraTemplate path="/createproject" exact Component={CreateProject} />
          {/* <JiraTemplate path="/editproject/:id" exact Component={EditProject} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
