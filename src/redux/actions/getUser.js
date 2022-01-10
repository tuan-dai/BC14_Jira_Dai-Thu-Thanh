import { GETUSER, ADDUSERPROJECT } from "../types/getUser";
import { getAllProject } from "./getAllProject";
import { DELETEUSERPROJECT } from "../types/deleteUserProject";
import api from "../../util/apiUtil";

export const getUser = (idProject) => {
  return (dispatch) => {
    api
      .get(`Users/getUser`)
      .then((result) => {
        dispatch(actGetUser(result.data.content));
      })
      .catch((error) => console.log(error));
  };
};

export const assignUserProject = (userProject) => {
  return (dispatch) => {
    api
      .post('Project/assignUserProject', userProject)
      .then((result) => {
        dispatch(actAddUserProject(result.data.content));
        dispatch(getAllProject());
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUserProject = (userProject) => {
  return (dispatch) => {
    api
      .post(`Project/removeUserFromProject`, userProject)
      .then((result) => {
        dispatch(actDeleteUserProject(result.data.content));
        dispatch(getAllProject())
      })
      .catch((error) => console.log(error));
  };
};

const actGetUser = (user) => {
  return {
    type: GETUSER,
    payload: user,
  };
};

const actAddUserProject = (user) => {
  return {
    type: ADDUSERPROJECT,
    payload: user,
  };
};

const actDeleteUserProject = (user) => {
  return {
    type: DELETEUSERPROJECT,
    payload: user,
  };
};
