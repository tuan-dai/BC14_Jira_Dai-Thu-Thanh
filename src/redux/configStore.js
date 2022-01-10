import { combineReducers } from "redux";
import getAllProject_Reducer from "../redux/reducers/getAllProject";
import userLogin_Reducer from "../redux/reducers/signin";
import signUp_Reducer from "./reducers/signup";
import ProjectCategory_Reducer from "./reducers/getProjectCatagory";
import createProject_Reducer from "./reducers/createProject";
import { popupReducer } from "./reducers/popupProject";
import { projectReducer } from "./reducers/projectReducer";
import getProjectDetail_Reducer from '../redux/reducers/getProjectDetail';
import Drawer_Reducer from './reducers/Drawer';
import getListUser_Reducer from "./reducers/User";
import Task_Reducer from './reducers/Task';
import Comment_Reducer from './reducers/comment'

const rootReducer = combineReducers({
  getAllProject_Reducer,
  userLogin_Reducer,
  signUp_Reducer,
  ProjectCategory_Reducer,
  createProject_Reducer,
  popupReducer,
  projectReducer,
  getProjectDetail_Reducer,
  Drawer_Reducer,
  getListUser_Reducer,
  Task_Reducer,
  Comment_Reducer,

});
export default rootReducer;
