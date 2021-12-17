import api from "../../util/apiUtil";
import { UPDATEPROJECT } from '../types/updateProject'

export const updateProject = (projectUpdate) => {
    return (dispatch) => {
        api
            .put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate)
            .then(result => {
                dispatch(actUpdateProject(result.data.content))
                console.log('result', result);
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