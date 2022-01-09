import api from "../../util/apiUtil";
import * as ActionType from "../types/Task";
import { getAllProject, getProjectDetail } from '../actions/getAllProject'

//GET ALL STATUS
export const getAllStatus = () => {
  return (dispatch) => {
    api
      .get("/Status/getAll")
      .then((result) => dispatch(actGetAllStatus(result.data.content)))
      .catch((error) => console.log(error));
  };
};

//UPDATE STATUS
export const updateStatus = (_status, projectId) => {
  return (dispatch) => {
    api
      .put("Project/updateStatus", _status)
      .then((result) => {
        dispatch(actUpdateStatus(result.data.content));
        dispatch(getProjectDetail(projectId))
      })
      .catch((error) => console.log(error));
  };
};

//GET ALL PRIORITY
export const getAllPriority = () => {
  return (dispatch) => {
    api
      .get("Priority/getAll")
      .then((result) => dispatch(actGetAllPriority(result.data.content)))
      .catch((error) => console.log(error));
  };
};

//UPDATE PRIORITY
export const updatePriority = (priority) => {
  return (dispatch) => {
    api
      .put("Project/updatePriority", priority)
      .then((result) => {
        dispatch(actUpdatePriority(result.data.content));
        dispatch(getAllProject());
      })
      .catch((error) => console.log(error));
  };
};

//UPDATE DESCRIPTION
export const updateDescription = (description) => {
  return (dispatch) => {
    api
      .put("Project/updateDescription", description)
      .then((result) => {
        dispatch(actUpdateDescription(result.data.content));
        dispatch(getAllProject());
      })
      .catch((error) => console.log(error));
  };
};

//GET ALL TASKTYPE
export const getAllTaskType = () => {
  return (dispatch) => {
    api
      .get("TaskType/getAll")
      .then((result) => dispatch(actGetAllTaskType(result.data.content)))
      .catch((error) => console.log(error));
  };
};

//ASSIGN USER TASK
export const assignUserTask = (userTask) => {
  return (dispatch) => {
    api
      .post("Project/assignUserTask", userTask)
      .then((result) =>
        dispatch(actAssignUserTask(result.data.content.content))
      )
      .catch((error) => console.log(error));
  };
};

//REMOVE USER TASK
export const removeUserTask = (userTask) => {
  return (dispatch) => {
    api
      .post("Project/removeUserFromTask", userTask)
      .then((result) =>
        dispatch(actRemoveUserTask(result.data.content.content))
      )
      .catch((error) => console.log(error));
  };
};

//GET TASK DETAIL
export const getTaskDetail = (id) => {
  return (dispatch) => {
    api
      .get(`Project/getTaskDetail?taskId=${id}`)
      .then((result) => dispatch(actGetTaskDetail(result.data.content)))
      .catch((error) => console.log(error));
  };
};

const actGetAllStatus = (_status) => {
  return {
    type: ActionType.GETALLSTATUS,
    _status,
  };
};

const actUpdateStatus = (_status) => {
  return {
    type: ActionType.UPDATESTATUS,
    _status,
  };
};

const actGetAllPriority = (priority) => {
  return {
    type: ActionType.GETALLPRIORITY,
    priority,
  };
};

const actUpdatePriority = (priority) => {
  return {
    type: ActionType.UPDATEPRIORITY,
    priority,
  };
};

const actUpdateDescription = (description) => {
  return {
    type: ActionType.UPDATE_DESCRIPTION,
    description,
  };
};

const actGetAllTaskType = (taskType) => {
  return {
    type: ActionType.GETALLTASKTYPE,
    taskType,
  };
};

const actAssignUserTask = (userTask) => {
  return {
    type: ActionType.ASSIGN_USERTASK,
    userTask,
  };
};

const actRemoveUserTask = (userTask) => {
  return {
    type: ActionType.REMOVE_USERTASK,
    userTask,
  };
};


const actGetTaskDetail = (taskDetail) => {
  return {
    type: ActionType.GETTASKDETAIL,
    taskDetail,
  };
};
