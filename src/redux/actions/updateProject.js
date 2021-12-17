import api from "../../util/apiUtil";
import { UPDATEPROJECT } from '../types/updateProject'
import { getAllProject } from "./getAllProject";

export const updateProject = (projectUpdate) => {
    return (dispatch) => {
        api
            .put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate)
            .then(result => {
                dispatch(actUpdateProject(result.data.content))
                dispatch(getAllProject())
            })
            .catch(error => console.log(error))
    }
}

const actUpdateProject = (project) => {
    return {
        type: UPDATEPROJECT,
        payload: project
    }
}