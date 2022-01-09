import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { editProject } from "../../../redux/actions/getAllProject";

import { useFormik } from "formik";
import { getProjectCatagory } from "../../../redux/actions/getProjectCatagory";
import { EditFilled } from "@ant-design/icons";

export default function EditProject() {
  const dispatch = useDispatch();
  let { visible, project } = useSelector((state) => state.Drawer_Reducer);

  //GET PROJECT CATAGORY
  useEffect(() => {
    dispatch(getProjectCatagory())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const projectCatagory = useSelector(state => state.ProjectCategory_Reducer.data)



  const onClose = () => {
    dispatch({ type: "CLOSE_DRAWER" });
  };

  const handleEditorChange = (e) =>
    setFieldValue("description", e.target.getContent());

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: project?.id,
      projectName: project?.projectName,
      creator: 0,
      description: project?.description,
      catagoryId: project?.categoryId,
    },
    onSubmit: (values) => dispatch(editProject(values)),
  });

  const { handleChange, handleSubmit, setFieldValue, values } = formik;

  return (
    <div className="edit-project p-5 container-fluid md:ml-80">
      <div className="flex items-center gap-3 mb-4">
        <EditFilled className="text-xl" />
        <span className="text-3xl font-medium">Edit Project</span>
      </div>

      <form onSubmitCapture={handleSubmit}>
        <div className="grid grid-cols-3">
          <div className="form-group">
            <label>Project Id</label>
            <input
              className="form-control"
              disabled={true}
              name="id"
              value={values.id}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mx-4">
            <label>Project Name</label>
            <input
              className="form-control"
              name="projectName"
              value={values.projectName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Project Catagory</label>
            <select
              className="form-control"
              name="categoryId"
              value={values.catagoryId}
              onChange={handleChange}
            >
              {projectCatagory?.map((item, index) => { return <option key={index} value={item.categoryId} >{item.projectCategoryName}</option> })}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <Editor
            name="description"
            apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
            initialValue=""
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
            onChange={handleEditorChange}
          />
        </div>
        <button className="rounded-md border-2 py-2 px-3 mr-3 text-black hover:border-blue-400 duration-500 hover:text-blue-400" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>

      </form>
    </div >
  );
}
