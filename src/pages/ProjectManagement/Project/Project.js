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

import { Table, Tag, Avatar, Popover, Button, AutoComplete, Input } from "antd";
import { EditOutlined, DeleteOutlined, ProfileOutlined } from "@ant-design/icons";
import FormEditProject from "../Forms/FormEditProject/FormEditProject";
import { getListUser, searchUser } from "../../../redux/actions/User";
import { NavLink } from "react-router-dom";
import { SEARCHPROJECT } from "../../../redux/types/Project";

export default function Project(props) {
  const [value, setState] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getListUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { listProject, loading, keyword } = useSelector((state) => state.getAllProject_Reducer);
  const { listUser } = useSelector((state) => state.getListUser_Reducer);

  const { Search } = Input;

  // const [options, setOptions] = useState(userSearch);
  // const onSearch = (searchText) => {
  //   setOptions(
  //     userSearch.filter((user) => user.name.indexOf(searchText) !== -1)
  //   );
  // };

  // const onChange = (data) => {
  //   setValue(data);
  // };

  // useEffect(() => {
  //   setOptions(userSearch);
  // }, [userSearch]);

  //TABLE
  const newArr = listProject?.filter(project => project?.projectName?.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
  const data = newArr

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
        <NavLink to={`/projectdetail/${project.id}`}> {project?.projectName}</NavLink >
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      sorter: {
        compare: (a, b) => a.categoryName.localeCompare(b.categoryName),
      },
      responsive: ['sm']
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
      responsive: ['sm']
    },
    {
      title: "Members",
      key: "members",
      render: (text, project, index) => {
        const listUserIdProject = project?.members?.map((item) => {
          return item.userId;
        });
        return (
          <div>
            {project?.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="bottom"
                  title={"Members"}
                  content={() => {
                    return (
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Thao tác</th>

                          </tr>
                        </thead>
                        <tbody>
                          {project?.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <Avatar src={item.avatar} />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <Button
                                    type="primary" danger shape="circle"
                                    onClick={() => {
                                      dispatch(removeUserFromProject({
                                        projectId: project?.id,
                                        userId: member?.userId,
                                      }));
                                    }}
                                  >X</Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar className="mr-1" key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {project?.members?.length > 3 ? <Avatar className="mr-1">...</Avatar> : ""}

            <Popover
              placement="rightTop"
              title={"Add member"}
              content={() => {
                return (
                  <AutoComplete
                    style={{ width: 200 }}
                    value={value}
                    onSearch={(value) => {
                      dispatch(searchUser(value))
                    }}
                    options={listUser
                      ?.filter((user) => {
                        return !listUserIdProject.includes(user.userId);
                      })
                      .map((user) => {
                        return {
                          label: user.name,
                          value: user.userId.toString(),
                        };
                      })}
                    onFocus={() => {
                      dispatch(searchUser(value))
                    }}
                    onChange={(value) => setState(value)}
                    onSelect={(value, option) => {
                      setState("");
                      dispatch(
                        assignUserProject({
                          projectId: project?.id,
                          userId: Number(value),
                        })
                      );
                    }}
                  />
                );
              }}
              trigger="click">
              <Button type="success" shape="circle">+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, project) => (
        <Fragment>
          <button
            type="button"
            className="text-blue-500 text-xl mr-3 focus:outline-none"
            onClick={() => dispatch({ type: 'SHOW_DRAWER', payload: project })}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 text-xl focus:outline-none"
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

  return (
    <div className="container-fluid project p-5 md:ml-14 lg:ml-80">
      {loading ? <Loading /> : ""}
      <div className="flex items-center gap-3 mb-4">
        <ProfileOutlined className="text-xl" />
        <span className="text-3xl font-semibold">Project Management</span>
      </div>
      <Search
        className="mb-4"
        placeholder="input project name"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={value => dispatch({
          type: SEARCHPROJECT,
          value
        })}
      />

      <Table columns={columns} dataSource={data} />
      <FormEditProject {...props} />
    </div>
  );
}
