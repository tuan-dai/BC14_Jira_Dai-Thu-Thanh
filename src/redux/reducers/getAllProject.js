import { DELETEPROJECT } from "../types/deleteProject";
import { UPDATEPROJECT } from "../types/updateProject";
import { GETUSER } from "../types/getUser";
import * as ActionType from "../types/getAllProject";
const initialState = {
  loading: false,
  data: null,
  error: null,
  userSearch: [],
};

const getAllProject_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GETALLPROJECT_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.GETALLPROJECT_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GETALLPROJECT_ERROR: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    case GETUSER: {
      state.userSearch = action.payload;
      console.log("StateUser", state);
      return { ...state };
    }

    case UPDATEPROJECT: {
      state.data = state.data.map(project => {
        if (project.id === action.payload.id) {
          return action.payload;
        }
        return project;
      });
      return { ...state };
    }

    case DELETEPROJECT: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
export default getAllProject_Reducer;
