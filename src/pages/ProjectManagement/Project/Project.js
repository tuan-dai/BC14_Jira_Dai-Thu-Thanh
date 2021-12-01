import { Fragment, React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProject,
  deleteProject,
} from "../../../redux/actions/getAllProject";
import Swal from "sweetalert2";


import { Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Project() {
  const dataProject = useSelector((state) => state.getAllProject_Reducer.data);
  const loading = useSelector((state) => state.getAllProject_Reducer.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      dataIndex: "member",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, project) => (
        <Fragment>
          <NavLink to={`/editproject/${project.id}`} className="text-blue-500 text-xl mr-3">
            <EditOutlined />
          </NavLink>
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
  console.log(data)

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
        dispatch(deleteProject(id))
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

  };

  return (
    <div className="w-full p-5">
      <p className="text-3xl font-medium">Project Management</p>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
