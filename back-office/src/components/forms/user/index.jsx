import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = props => {
  return (
    <Formik
      initialValues={{ name: "", password: "", email: "", role: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        role: Yup.string()
          .min(1, "Must be at least 1 characters or more")
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
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <Field as="select" name="role">
          <option value="SUPER_ADMIN">Super admi</option>
          <option value="ADMIN">admin</option>
          <option value="MODERATOR">Moderator</option>
          <option value="USER">User</option>
        </Field>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default UserForm;
