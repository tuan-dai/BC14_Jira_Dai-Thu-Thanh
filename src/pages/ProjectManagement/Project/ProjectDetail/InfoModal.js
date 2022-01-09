import { Avatar, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";

import {
  getAllPriority,
  getAllStatus,
  getAllTaskType,
  removeUserTask,
  updateDescription,
  updatePriority,
  updateStatus,
} from "../../../../redux/actions/Task";

export default function InfoModal() {
  const { taskDetail, taskType, _status, priority } = useSelector((state) => state.Task_Reducer);
  let projectId = taskDetail.projectId
  console.log(taskDetail, priority);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTaskType());
    dispatch(getAllStatus());
    dispatch(getAllPriority());
  }, []);

  const [state, setState] = useState({ visible: false })
  const [text, setText] = useState(taskDetail?.description)
  const [time, setTime] = useState({ TimeSpent: 0, TimeRemaining: 0, Estimated: 0 })


  // VISIBLE DESCRIPTION
  const renderDescription = () => {
    const description = ReactHtmlParser(taskDetail?.description);
    return description;
  };


  const renderTaskType = () => {
    return taskType?.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.taskType}
        </option>
      );
    });
  };

  const renderStatus = () => {
    return _status?.map((item, index) => {
      return (
        <option key={index} value={item.statusId}>
          {item.statusName}
        </option>
      );
    });
  };

  const renderAssigness = () => {
    return taskDetail?.assigness.map((assign, index) => {
      return (
        <div className="item flex justify-between w-full">
          <button
            onClick={() => {
              dispatch(
                removeUserTask({
                  taskId: taskDetail.taskId,
                  userId: assign.id,
                })
              );
            }}
          >
            <Avatar src={assign.avatar} className="mr-1" />
            <span>{assign.name} X</span>
          </button>
        </div>
      );
    });
  };

  const renderReporter = () => {
    return taskDetail?.assigness.map((assign, index) => {
      return (
        <option key={index} value={assign?.id}>
          {assign?.name}
        </option>
      );
    });
  };

  const renderPriority = () => {
    return priority?.map((item, index) => {
      return (
        <option key={index} value={item.priorityId}>
          {item.priority}
        </option>
      );
    });
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title flex">
              <select className="bg-gray-100 px-2">{renderTaskType()}</select>
              <div className="px-3 py-2">
                <i className="fa fa-check-square"></i>
                <span className="ml-2">{taskDetail?.taskName}</span>
              </div>
            </div>

            <div style={{ display: "flex" }} className="task-click">
              <div className="flex items-center gap-2">
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>

          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="text-2xl font-medium">
                    This is an issue of type: Task.
                  </p>

                  {/* DESCIPTION */}
                  <div className="description">
                    <p className="font-medium text-lg">Description</p>

                    {state.visible
                      ? <>
                        <Editor
                          name="description"
                          apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
                          initialValue={taskDetail?.description}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image",
                              "charmap print preview anchor help",
                              "searchreplace visualblocks code",
                              "insertdatetime media table paste wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | help",
                          }}
                          onEditorChange={(newtext, editor) => setText(newtext)}
                        />
                        <div className="my-3">
                          <Button className="mr-3" type="primary" onClick={() => {
                            const newDescription = { taskId: taskDetail.taskId, description: text }
                            dispatch(updateDescription(newDescription))
                          }}>Save</Button>
                          <Button onClick={() => { setState({ visible: false }) }}>Cancel</Button>
                        </div></>
                      : <div onClick={() => { setState({ visible: true }) }}>
                        {renderDescription()}
                      </div>}


                  </div>

                  {/* COMMENT */}
                  <div className="comment">
                    <p className="font-medium text-lg">Comment</p>
                    <div className="block-comment flex">
                      <Avatar src="/img/download (1).jfif" />
                      <div className="input-comment form-group ml-2">
                        <input
                          className="form-control mb-2"
                          type="text"
                          placeholder="Add a comment ..."
                        />
                        <p>
                          <span className="text-gray-500 font-medium mr-2">
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div className="display-comment flex">
                          <Avatar src="/img/download (1).jfif" />
                          <div className="input-comment form-group ml-2">
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <button className="text-gray-500 mr-3">
                                Edit
                              </button>
                              <button className="text-gray-500">Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">

                  {/* STATUS */}
                  <div className="status">
                    <p className="text-md font-medium -mb-0">STATUS</p>
                    <select
                      className="custom-select text-md"
                      value={taskDetail.statusId}
                      onChange={(e) => {
                        const newStatus = { taskId: taskDetail.taskId, statusId: e.target.value };
                        dispatch(updateStatus(newStatus, projectId));
                      }}>{renderStatus()}
                    </select>
                  </div>

                  {/* ASSIGNEES */}
                  <div className="assignees mb-3">
                    <p className="text-md font-medium -mb-0">ASSIGNEES</p>
                    <div className="grid grid-cols-2 gap-2">
                      {renderAssigness()}

                      <div>
                        <button className=" text-blue-700">
                          <span>+ Add more</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* REPORTER */}
                  <div className="reporter">
                    <p className="text-md font-medium -mb-0">REPORTER</p>
                    <select className="text-md bg-gray-100 p-2 rounded-sm">
                      {renderReporter()}
                    </select>
                  </div>

                  {/* PRIORITY */}
                  <div className="priority mb-3">
                    <p className="text-md font-medium -mb-0">PRIORITY</p>
                    <select
                      className="text-md bg-gray-100 p-2 rounded-sm"
                      onChange={(e) =>
                        dispatch(
                          updatePriority({
                            taskId: taskDetail.taskId,
                            priorityId: e.target.value,
                          })
                        )
                      }
                    >
                      {renderPriority()}
                    </select>
                  </div>

                  {/* ESTIMATE */}
                  <div className="estimate">
                    <p className="text-md font-medium -mb-0">
                      ORIGINAL ESTIMATE (HOURS)
                    </p>
                    <input type="text" className="estimate-hours" min="0" onChange={e => setTime({ ...time, Estimated: e.target.value })} />
                  </div>

                  {/* TIME TRACKING */}
                  <div className="time-tracking">
                    <p className="text-md font-medium -mb-0">TIME TRACKING</p>
                    <div style={{ display: "flex" }}>
                      <i className="fa fa-clock" />
                      <div style={{ width: "100%" }}>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `(${time.TimeSpent}*100)/${time.Estimated}%` }}
                            aria-valuenow={time.TimeSpent}
                            aria-valuemin={0}
                            aria-valuemax={time.Estimated}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="logged">{time.TimeSpent}h logged</p>
                          <p className="estimate-time">{time.Estimated}h estimated</p>

                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mb-3">
                      <div>
                        <label className="text-sm">Time spent (hours)</label>
                        <input className="bg-gray-100 w-10/12 px-2 py-1" type="number" defaultValue="0" min="0" max={time.Estimated}
                          onChange={e => setTime({ ...time, TimeSpent: e.target.value })} />
                      </div>

                      <div>
                        <label className="text-sm">Time remaining (hours)</label>
                        <input className="bg-gray-100 w-10/12 px-2 py-1" type="number" defaultValue="0" min="0"
                          onChange={e => setTime({ ...time, TimeRemaining: e.target.value })} />
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Create at a month ago
                  </div>
                  <div className="text-gray-400 text-sm">
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
