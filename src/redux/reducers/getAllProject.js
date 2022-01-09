import * as ActionType from "../types/Project";
const initialState = {
  loading: false,
  data: null,
  error: null,
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
    case ActionType.GETPROJECTDETAIL_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.GETPROJECTDETAIL_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GETPROJECTDETAIL_ERROR: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    case ActionType.CREATEPROJECT: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.EDITPROJECT: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.DELETEPROJECT: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.REMOVE_USERPROJECT: {
      state.data = action.payload
      return { ...state }
    }

    case ActionType.ASSIGN_USERPROJECT: {
      state.data = action.payload
      return { ...state }
    }

    default:
      return { ...state };
  }
};
export default getAllProject_Reducer;
