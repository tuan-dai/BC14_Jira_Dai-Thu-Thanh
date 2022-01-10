<<<<<<< HEAD
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
=======
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getProjectCatagory } from "../../../../redux/actions/getProjectCatagory";
import {updateProject} from "../../../../redux/actions/updateProject"

const FormEditProject = (props) => {
  const projectCatagory = useSelector(
    (state) => state.ProjectCategory_Reducer.data
  );
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  //component didmount
  useEffect(() => {
    dispatch(getProjectCatagory());
    // dispatch(getDetailProject()) de chi 
    // cái task nó không có hiểu là task nào á chị giờ phải gọi task truyền lên trên projectReducer xong rồi ở dưới nó có xong nó load ra á chị 
    dispatch({
      type: "SET_SUBMIT_EDIT_PROJECT",
      submitFunction: handleSubmit,
    });
  }, []);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  console.log(values)

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />

      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project ID</p>
            <input
              disabled
              value={values.id}
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input
              onChange={handleChange}
              value={values.projectName}
              className="form-control"
              name="projectName"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              value={values.categoryId}
              className="form-control"
              name="categoryId"
            >
              {projectCatagory?.map((item, index) => {
                console.log(item)
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="descriptionForm"
              apiKey="oodr1y7pw1cde82eu0y44regjnyo4bqsm26jdn88mduewfyn"
              initialValue={values.description}
              value = {values.description}
>>>>>>> origin
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
<<<<<<< HEAD
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
=======
                toolbar:
                  "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
              }}
              // onChange={handleEditorChange}
            />
          </div>
        </div>
      </div>

      {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
      {/* <button type="submit">Submit</button> */}
    </form>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: (props) => ({
    projectName: props.projectEdit.projectName,
    description: props.projectEdit.description,
    id: props.projectEdit?.id,
    categoryId: props.projectEdit.categoryId,
  }),
  
  // Custom sync validation
  // validate: (values) => {
  //   const errors = {};

  //   if (!values.name) {
  //     errors.name = "Required";
  //   }

  //   return errors;
  // },

  handleSubmit: (values, { props, setSubmitting }) => {

    props.dispatch(updateProject(values))

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your have edit project successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log({ values });
  },

  displayName: "MyEnhancedForm",
})(FormEditProject);

const mapStateToProps = (state, ownProps) => {
  return {
    projectEdit: state.projectReducer.projectEdit,
  };
};
export default connect(mapStateToProps)(MyEnhancedForm);
>>>>>>> origin
