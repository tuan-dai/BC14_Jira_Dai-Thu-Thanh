import api from "../../util/apiUtil";

export const createTask = (data) => {
    return (dispatch) => {
        api
            .post(`Project/createTask`, data)
            .then((result) => dispatch(actCreateTask(result.data.content)))
            .catch((error) => console.log(error.response.data.message));
    };
};

const actCreateTask = (data) => {
    return {
        type: 'CREATETASK',
        payload: data,
    };
};