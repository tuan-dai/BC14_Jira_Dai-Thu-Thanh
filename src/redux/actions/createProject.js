import api from "../../util/apiUtil";
import { CREATEPROJECT } from '../types/createProject'

export const createProject = (project, history,message) => {
    return (dispatch) => {
        api
            .post('Project/createProjectAuthorize', project)
            .then(result => {
                dispatch(actCreateProject(result.data.content))
                
                setTimeout(() => history.push("/project"), 2000);
            })
            .catch(error => console.log(error))
    }
}

const actCreateProject = (project) => {
    return {
        type: CREATEPROJECT,
        payload: project
    }
}