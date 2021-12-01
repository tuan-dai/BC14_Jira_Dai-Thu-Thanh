import { combineReducers } from "redux";
import getAllProject_Reducer from "../redux/reducers/getAllProject";
import userLogin_Reducer from "../redux/reducers/signin";
import ProjectCategory_Reducer from "./reducers/getProjectCatagory";
import createProject_Reducer from "./reducers/createProject";

const rootReducer = combineReducers({
  getAllProject_Reducer,
  userLogin_Reducer,
  ProjectCategory_Reducer,
  createProject_Reducer,
});
export default rootReducer;