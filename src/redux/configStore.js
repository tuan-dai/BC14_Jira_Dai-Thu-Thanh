import { combineReducers } from "redux";
import getAllProject_Reducer from "../redux/reducers/getAllProject";
import userLogin_Reducer from "../redux/reducers/signin";
import signUp_Reducer from "./reducers/signup";
import ProjectCategory_Reducer from "./reducers/getProjectCatagory";
import getListUser_Reducer from "./reducers/User";
import Drawer_Reducer from "./reducers/Drawer";
import Task_Reducer from "./reducers/Task";
import createTask_Reducer from "./reducers/createTask";

const rootReducer = combineReducers({
  getAllProject_Reducer,
  userLogin_Reducer,
  signUp_Reducer,
  ProjectCategory_Reducer,
  getListUser_Reducer,
  Drawer_Reducer,
  Task_Reducer,
  createTask_Reducer,
});
export default rootReducer;
