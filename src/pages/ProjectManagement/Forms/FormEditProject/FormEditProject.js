import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCatagory } from "../../../../redux/actions/getProjectCatagory";
import { updateProject } from "../../../../redux/actions/updateProject"

import { useFormik } from "formik";
import { Drawer } from "antd";

export default function FormEditProject(props) {
  const dispatch = useDispatch();

  //GET PROJECT CATAGORY
  useEffect(() => {
    dispatch(getProjectCatagory())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const { visible, project } = useSelector(state => state.Drawer_Reducer)
  console.log(project)

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
      creator: project?.creator?.id,
      description: project?.description,
      categoryId: project?.categoryId,
    },
    onSubmit: (values) => dispatch(updateProject(project?.id, values, props.history)),
  });

  const { handleChange, handleSubmit, setFieldValue, values } = formik;

  return (
    <div>
      <Drawer
        title="Edit project"
        width={720}
        visible={visible}
        onClose={onClose}
        bodyStyle={{ paddingBottom: 80 }}>
          

        <form onSubmitCapture={handleSubmit}>
          <div className="form-group">
            <label className="font-semibold">Project Id</label>
            <input
              className="form-control"
              disabled={true}
              name="id"
              value={values.id}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="font-semibold">Project Name</label>
            <input
              className="form-control"
              name="projectName"
              value={values.projectName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="font-semibold">Project Catagory</label>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
            >
              {projectCatagory?.map((item, index) => { return <option key={index} value={item.id} >{item.projectCategoryName}</option> })}
            </select>
          </div>
          <div className="form-group">
            <label className="font-semibold">Description</label>
            <Editor
              name="description"
              apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
              initialValue={project?.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
              }}
              onChange={handleEditorChange}
            />
          </div>
          <button className="btn btn-primary mr-3" type="submit">Submit</button>
          <span className="rounded-md border-2 py-2 px-3  text-black cursor-pointer
            hover:border-blue-400 duration-500 hover:text-blue-400" onClick={onClose}>Cancel</span>

        </form>
      </Drawer>
    </div>
  );
}
