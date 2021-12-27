import * as ActionType from "../types/getAllProject";
import { DELETEPROJECT } from "../types/deleteProject";
import api from "../../util/apiUtil";

export const getAllProject = () => {
  return (dispach) => {
    dispach(actGetAllProject_Request());
    api
      .get("Project/getAllProject")
      .then((result) => dispach(actGetAllProject_Success(result.data.content)))
      .catch((error) => dispach(actGetAllProject_Error(error)));
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    api
      .delete(`Project/deleteProject?projectId=${id}`)
      .then((result) => {
        dispatch(actDeleteProject(result.data.content));
        dispatch(getAllProject())
      })
      .catch((error) => console.log(error));
  };
};


const actGetAllProject_Request = () => {
  return {
    type: ActionType.GETALLPROJECT_REQUEST,
  };
};

const actGetAllProject_Success = (data) => {
  return {
    type: ActionType.GETALLPROJECT_SUCCESS,
    payload: data,
  };
};

const actGetAllProject_Error = (error) => {
  return {
    type: ActionType.GETALLPROJECT_ERROR,
    payload: error,
  };
};

const actDeleteProject = (project) => {
  return {
    type: DELETEPROJECT,
    payload: project,
  };
};


