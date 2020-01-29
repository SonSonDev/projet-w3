import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = props => {
  return (
    <Formik
      initialValues={{ name: "", password: "", email: "" }}
      validationSchema={Yup.object({
        password: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.onSubmit(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <div
          style={{
            border: "2px solid grey",
            borderRadius: "15px",
            height: "200px",
            width: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <label htmlFor="email">Email Address</label>
          <Field
            style={{ border: "2px solid grey", borderRadius: "15px" }}
            name="email"
            type="email"
          />
          <ErrorMessage name="email" />
          <label htmlFor="password">Password</label>
          <Field
            style={{ border: "2px solid grey", borderRadius: "15px" }}
            name="password"
            type="password"
          />
          <ErrorMessage name="password" />
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
