import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCatagory } from "../../../redux/actions/getProjectCatagory";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { createProject } from "../../../redux/actions/createProject";
import Swal from "sweetalert2";

export default function CreateProject(props) {

    //GET PROJECT CATAGORY
    const projectCatagory = useSelector(
        (state) => state.ProjectCategory_Reducer.data
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProjectCatagory());
    }, []);

    const catagory = () => {
        return projectCatagory?.map((project) => {
            return (
                <Fragment>
                    <option key="project.id">{project.projectCategoryName}</option>
                </Fragment>
            );
        });
    };

    //CREATE PROJECT
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            projectName: "",
            description: "",
            categoryId: 0,
        },
        onSubmit: (values) => {
            dispatch(createProject(values, props.history))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your have create project successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });
    const { handleChange, handleSubmit, setFieldValue } = formik;
    const handleEditorChange = (e) => {
        setFieldValue('description', e.target.getContent())
    };

    return (
        <div className="w-full p-5">
            <p className="text-3xl font-medium">Create Project</p>
            <form onSubmitCapture={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="projectName" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <Editor
                        name='description'
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

                <div className="form-group">
                    <select className="form-control" >{catagory()}</select>
                </div>

                <button
                    className="border-2 border-blue-400 px-2 py-1 hover:bg-blue-400 duration-500 hover:text-white"
                    type="submit"
                >
                    Create project
                </button>
            </form>
        </div>
    );
}
