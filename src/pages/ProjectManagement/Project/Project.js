import { Fragment, React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProject,
  deleteProject,
  removeUserFromProject,
  assignUserProject,
} from "../../../redux/actions/getAllProject";
import Swal from "sweetalert2";
import Loading from "../../../_component/Loading/Loading";

import { Table, Tag, Popover, Button, AutoComplete, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditProject from "../EditProject/EditProject";
import { getListUser, searchUser } from "../../../redux/actions/User";

export default function Project() {
  const dataProject = useSelector((state) => state.getAllProject_Reducer.data);
  const loading = useSelector((state) => state.getAllProject_Reducer.loading);
  const { listUser } = useSelector((state) => state.getListUser_Reducer);

  const [value, setState] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getListUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //TABLE
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      sorter: {
        compare: (a, b) => a.projectName.localeCompare(b.projectName),
      },
      render: (text, project) => (
        <a href={`/projectdetail/${project?.id}`}>{project?.projectName}</a>
      ),
    },
    {
      title: "Catagory",
      dataIndex: "categoryName",
      sorter: {
        compare: (a, b) => a.categoryName.localeCompare(b.categoryName),
      },
    },
    {
      title: "Creator",
      key: "creator",
      sorter: {
        compare: (a, b) => a.creator?.name.localeCompare(b.creator?.name),
      },
      render: (text, project) => (
        <Tag color="volcano">{project?.creator?.name}</Tag>
      ),
    },
    {
      title: "Member",
      key: "member",
      render: (text, project) => (
        <div>
          {project?.members?.slice(0, 3).map((member) => {
            return (
              <Popover
                key={member.userId}
                placement="bottom"
                title="Members"
                content={() => {
                  return (
                    <Fragment>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project?.members?.map((member) => {
                            return (
                              <tr key={member.userId}>
                                <td>{member.userId}</td>
                                <td>
                                  <Avatar src={member.avatar} />
                                </td>
                                <td>{member.name}</td>
                                <td>
                                  <Button
                                    type="primary"
                                    danger
                                    shape="circle"
                                    onClick={() => {
                                      dispatch(
                                        removeUserFromProject({
                                          projectId: project?.id,
                                          userId: member?.userId,
                                        })
                                      );
                                    }}
                                  >
                                    X
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </Fragment>
                  );
                }}
                trigger="hover"
              >
                <Avatar className="mr-1" src={member.avatar} />
              </Popover>
            );
          })}
          {project?.members?.length > 3 ? (
            <Avatar className="mr-1">...</Avatar>
          ) : (
            ""
          )}
          <Popover
            placement="rightTop"
            title="Add User"
            content={() => {
              return (
                <AutoComplete
                  style={{ width: 200 }}
                  value={value}
                  onSearch={(value) => {
                    dispatch(searchUser(value));
                  }}
                  options={listUser?.map((user) => {
                    return { label: user.name, value: user.userId.toString() };
                  })}
                  onChange={(value) => setState(value)}
                  onSelect={(value, option) => {
                    setState(option.label);
                    dispatch(
                      assignUserProject({
                        projectId: project?.id,
                        userId: JSON.parse(value),
                      })
                    );
                  }}
                />
              );
            }}
            trigger="click"
          >
            <Button type="primary" shape="circle">
              +
            </Button>
          </Popover>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, project) => (
        <Fragment>
          <button
            className="text-blue-500 text-xl mr-3"
            onClick={() => {
              showDrawer(project);
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 text-xl"
            onClick={() => {
              delete_Project(project.id);
            }}
          >
            <DeleteOutlined />
          </button>
        </Fragment>
      ),
    },
  ];

  const data = dataProject;

  function onChange(pagination, sorter, extra) {
    console.log("params", pagination, sorter, extra);
  }

  //DELETE PROJECT
  const delete_Project = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProject(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const showDrawer = (project) => {
    dispatch({ type: "SHOW_DRAWER", project });
  };

  return (
    <div className="container-fluid project p-5 md:ml-14 lg:ml-80">
      {loading ? <Loading /> : ""}
      <p className="text-3xl font-medium">Project Management</p>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <EditProject />
    </div>
  );
}
