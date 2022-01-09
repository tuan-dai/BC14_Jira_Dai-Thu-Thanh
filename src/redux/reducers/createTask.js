const initialState = {
    data: null
}

const createTask_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATETASK': {
            return { ...state, data: action.payload }
        }

        default:
            return { ...state };
    }
}
export default createTask_Reducer