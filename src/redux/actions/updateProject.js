<<<<<<< HEAD
import Swal from "sweetalert2";
=======
>>>>>>> origin
import api from "../../util/apiUtil";
import { UPDATEPROJECT } from "../types/updateProject";
import { getAllProject } from "./getAllProject";

<<<<<<< HEAD
export const updateProject = (id, project, history) => {
  return (dispatch) => {
    api
      .put(`Project/updateProject?projectId=${id}`, project)
      .then(result => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Editted project succefully",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(actUpdateProject(result.data.content.content))
        history.push('/project')
        dispatch(getAllProject())
      })
      .catch((error) => console.log(error));
  }
}
=======
export const updateProject = (projectUpdate) => {
  return (dispatch) => {
    api
      .put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate)
      .then((result) => {
        dispatch(actUpdateProject(result.data.content));
        dispatch(getAllProject());
      })
      .catch((error) => console.log(error));
  };
};
>>>>>>> origin

const actUpdateProject = (project) => {
  return {
    type: UPDATEPROJECT,
    payload: project,
  };
};
