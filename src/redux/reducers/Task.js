import * as ActionType from "../types/Task";

const initialState = {
  _status: null,
  priority: null,
  description: null,
  taskType: null,
  userTask: null,
  task: null,
  newTask: null,
  taskDetail: {
    "priorityTask": {
      "priorityId": 1,
      "priority": "High"
    },
    "taskTypeDetail": {
      "id": 2,
      "taskType": "new task"
    },
    "assigness": [],
    "lstComment": [],
    "taskId": 2036,
    "taskName": "start",
    "alias": "start",
    "description": "",
    "statusId": "2",
    "originalEstimate": 0,
    "timeTrackingSpent": 0,
    "timeTrackingRemaining": 0,
    "typeId": 2,
    "priorityId": 1,
    "projectId": 2317
  },
};

const Task_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GETALLSTATUS: {
      return { ...state, _status: action._status };
    }

    case ActionType.UPDATESTATUS: {
      return { ...state, _status: action._status };
    }

    case ActionType.GETALLPRIORITY: {
      return { ...state, priority: action.priority };
    }

    case ActionType.UPDATEPRIORITY: {
      return { ...state, priority: action.priority };
    }

    case ActionType.UPDATE_DESCRIPTION: {
      return { ...state, description: action.description }
    }

    case ActionType.GETALLTASKTYPE: {
      return { ...state, taskType: action.taskType };
    }

    case ActionType.ASSIGN_USERTASK: {
      return { ...state, userTask: action.userTask };
    }

    case ActionType.CREATETASK: {
      return { ...state, newTask: action.newTask };
    }

    case ActionType.GETTASKDETAIL: {
      return { ...state, taskDetail: action.taskDetail };
    }

    default:
      return { ...state };
  }
};
export default Task_Reducer;
