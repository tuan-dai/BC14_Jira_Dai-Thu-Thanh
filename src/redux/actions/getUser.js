import { GETUSER, ADDUSERPROJECT } from "../types/getUser";
import { getAllProject } from "./getAllProject";
import api from "../../util/apiUtil";

export const getUser = (idProject) => {
  return (dispatch) => {
    api
      .get(`Users/getUserByProjectId?idProject=${idProject}`)
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
