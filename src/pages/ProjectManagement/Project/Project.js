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

<<<<<<< HEAD
import { Table, Tag, Avatar, Popover, Button, AutoComplete, Input } from "antd";
import { EditOutlined, DeleteOutlined, ProfileOutlined } from "@ant-design/icons";
import FormEditProject from "../Forms/FormEditProject/FormEditProject";
import { getListUser, searchUser } from "../../../redux/actions/User";
import { NavLink } from "react-router-dom";
import { SEARCHPROJECT } from "../../../redux/types/Project";

export default function Project() {
  const [value, setState] = useState("");
=======
import { Table, Tag, Avatar, Popover, Button, AutoComplete } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FormEditProject from "../Forms/FormEditProject/FormEditProject";
import { assignUserProject, getUser, deleteUserProject } from "../../../redux/actions/getUser";
// const mockVal = (str, repeat) => ({
//   value: str.repeat(repeat),
// });

export default function Project() {
  const dataProject = useSelector((state) => state.getAllProject_Reducer.data);
  // const loading = useSelector((state) => state.getAllProject_Reducer.loading);
  const userSearch = useSelector(
    (state) => state.getAllProject_Reducer.userSearch
  );
  const [value, setValue] = useState("");
  const [options, setOptions] = useState(userSearch);
  const onSearch = (searchText) => {
    setOptions(
      userSearch.filter((user) => user.name.indexOf(searchText) !== -1)
    );
  };

  const onChange = (data) => {
    setValue(data);
  };
>>>>>>> origin

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
<<<<<<< HEAD
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
=======
    dispatch(getUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setOptions(userSearch);
  }, [userSearch]);
>>>>>>> origin

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
<<<<<<< HEAD
      render: (text, project, index) => {
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
=======
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title={"Members"}
                  content={() => {
                    return (
                      <table className="table">
>>>>>>> origin
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Thao tác</th>

                          </tr>
                        </thead>
                        <tbody>
<<<<<<< HEAD
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
=======
                          {record.members?.map((item, index) => {
                            return (
                              <tr key="index">
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="50"
                                    style={{ borderRadius: "15px" }}
                                    alt=""
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch(
                                        deleteUserProject({
                                          projectId: record.id,
                                          userId: item.userId,
                                        })
                                      );
                                    }}
                                    className="btn btn-danger"
                                    style={{ borderRadius: "50%" }}
                                  >
                                    <DeleteOutlined />
                                  </button>
>>>>>>> origin
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
<<<<<<< HEAD
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
                    options={listUser?.map((user) => {
                      return { label: user.name, value: user.userId.toString() };
                    })}
                    onChange={(value) => setState(value)}
                    onSelect={(value, option) => {
                      setState(option.label);
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
=======
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="topLeft"
              title={"Add member"}
              onVisibleChange={() => setValue("")}
              content={() => {
                return (
                  <AutoComplete
                    options={options.map((user, index) => {
                      return {
                        value: user.userId.toString(),
                        label: user.name,
                      };
                    })}
                    value={console.log(value) || value}
                    onChange={(data) => {
                      setValue(data);
                    }}
                    onSelect={(data, value) => {
                      setValue("");
                      dispatch(
                        assignUserProject({
                          projectId: record.id,
                          userId: data,
                        })
                      );
                    }}
                    style={{ width: "100%" }}
                    onSearch={onSearch}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
>>>>>>> origin
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record, project) => (
        <Fragment>
          <button
<<<<<<< HEAD
            type="button"
            className="text-blue-500 text-xl mr-3 focus:outline-none"
            onClick={() => dispatch({ type: 'SHOW_DRAWER', payload: project })}
=======
            className="text-blue-500 text-xl mr-3"
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_PROJECT",
                Component: <FormEditProject />,
              };

              //dispatch len reducer noi dung trong modal
              dispatch(action);

              //dispatch du lieu hien tai len reducer

              const actionEditProject = {
                type: "EDIT_PROJECT",
                projectEditModel: record,
              };

              dispatch(actionEditProject);
            }}
>>>>>>> origin
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 text-xl focus:outline-none"
            onClick={() => {
              delete_Project(record.id);
            }}
          >
            <DeleteOutlined />
          </button>
        </Fragment>
      ),
    },
  ];

<<<<<<< HEAD
=======
  const data = dataProject;
  console.log(data);
>>>>>>> origin

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
      <FormEditProject />
    </div>
  );
}
