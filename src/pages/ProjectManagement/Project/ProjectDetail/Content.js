import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetail } from "../../../../redux/actions/Task";
import InfoModal from "./InfoModal";

export default function Content(props) {
  const { projectDetail } = props
  const dispatch = useDispatch()

  const renderListTask = () => {
    return projectDetail?.lstTask?.map((task, index) => {
      return (
        <div key={index} className="card w-1/2 h-auto mr-4 mt-5" >
          <div className="card-header p-3">{task.statusName}</div>
          <ul className="list-group list-group-flush">
            {task?.lstTaskDeTail?.map((taskDetail, index) => {
              return (
                <li key={index}
                  className="list-group-item"
                  data-toggle="modal"
                  data-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  onClick={() => { dispatch(getTaskDetail(taskDetail?.taskId)) }}
                >
                  <p>{taskDetail.taskName}</p>
                  <div className="flex justify-between block">
                    <div className="block-left mr-2" >
                      <p>{taskDetail.priorityTask.priority}</p>
                    </div>
                    <div className="block-right">
                      {taskDetail?.assigness?.map((assign, index) => {
                        return <Avatar key={index} taskId={taskDetail?.taskId} className="mr-2" src={assign.avatar} />
                      })}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }

  return (
    <div className="content flex mr-8">
      {renderListTask()}
      <InfoModal />
    </div>
  );
}
