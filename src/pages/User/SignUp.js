import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      passWord: "",
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object({
      name: Yup.string().required("*User name is reqired"),
      phoneNumber: Yup.string()
        .required("*Phone number is required")
        .min(2, "*Phone number is not valid")
        .max(12, "*Phone number is not valid"),
      email: Yup.string().required().email("*Email is not valid"),
      passWord: Yup.string()
        .required()
        .matches(
          "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
          "*Password is not valid"
        ),
    }),
  });

  const { handleSubmit, handleChange, errors, touched } = formik;

  return (
    <div
      className="modal fade"
      id="signUpModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">

        <div className="modal-content">
          <div className="modal-header bg-blue-400">
            <h5
              className="modal-title font-bold text-4xl text-white ml-44"
              id="exampleModalLabel"
            >
              Sign up
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="modal-body">

            <form onSubmitCapture={handleSubmit}>
              <div className='form-group'>
                <label>User name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div>

              <label>Phone number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                onChange={handleChange}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}

              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <p className="text-red-500">{errors.email}</p>
              )}

              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="passWord"
                onChange={handleChange}
              />
              {errors.passWord && touched.passWord && (
                <p className="text-red-500">{errors.passWord}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 mt-3 text-white text-2xl rounded-md bg-blue-400 hover:bg-blue-800 duration-500"
              >
                Sign up
              </button>
            </form>
          </div>

        </div>
      </div>
    </div >
  );
}
