import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PlaceForm = props => {
  return (
    <Formik
      initialValues={{ name: "", number: "", street: "", zipCode: "", type: "", category: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(1, "Must be at least 1 characters or more")
          .required("Required"),
        number: Yup.number()
          .positive("Must be positive")
          .required("Required"),
        street: Yup.string()
          .min(1, "Must be at least 1 characters or more")
          .required("Required"),
        zipCode: Yup.number().required("Required"),
        type: Yup.string()
          .min(1, "Must be at least 1 characters or more")
          .required("Required"),
        category: Yup.string()
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

        <div style={{ padding: "1em" }}>
          <label htmlFor="number">number</label>
          <Field name="number" type="number" />
          <ErrorMessage name="number" />

          <label htmlFor="street">street</label>
          <Field name="street" type="text" />
          <ErrorMessage name="street" />

          <label htmlFor="zipCode">zipCode</label>
          <Field name="zipCode" type="number" />
          <ErrorMessage name="zipCode" />
        </div>

        <label htmlFor="type">type</label>
        <Field name="type" type="text" />
        <ErrorMessage name="type" />

        <label htmlFor="category">Category</label>
        <Field as="select" name="category">
            <option value="FOOD">Food</option>
            <option value="SHOP">Shop</option>
            <option value="ACTIVITY">Activity</option>
          </Field>
        <ErrorMessage name="category" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default PlaceForm;
