import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";

export default function FormEditProject(props) {
  const formSubmitRef = useRef(null);

  const dispatch = useDispatch();
  const submitForm = (e) => {
    if (e.target) {
      console.log(e);
      e.preventDefault();
      alert("Submit edit");
    } else {
        alert("Submit edit");
        console.log(e)
    
    }
  };

  //component didmount
  useEffect(() => {
    dispatch({
      type: "SET_SUBMIT_EDIT_PROJECT",
      submitFunction: () => submitForm(formSubmitRef.current),
    });
  }, [formSubmitRef.current]); 

  const handleEditorChange = (content, editor) => {};

  return (
    <form ref={formSubmitRef} className="container-fluid" onSubmit={submitForm}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project ID</p>
            <input disabled className="form-control" name="id" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input className="form-control" name="projectName" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <input className="form-control" name="categoryId" />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="descriptionForm"
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
        </div>
      </div>
    </form>
  );
}
