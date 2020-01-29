import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "tabler-react";

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
      <Form className="places__form">
        <div className="places__field">
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          {/* <ErrorMessage name="name" /> */}
        </div>

        <div>
          <div className="places__field">
            <label htmlFor="number">Number</label>
            <Field name="number" type="number" />
            {/* <ErrorMessage name="number" /> */}
          </div>

          <div className="places__field">
            <label htmlFor="street">Street</label>
            <Field name="street" type="text" />
            {/* <ErrorMessage name="street" /> */}
          </div>

          <div className="places__field">
            <label htmlFor="zipCode">ZipCode</label>
            <Field name="zipCode" type="number" />
            {/* <ErrorMessage name="zipCode" /> */}
          </div>
        </div>
        
        <div className="places__field">
          <label htmlFor="type">Type</label>
          <Field name="type" type="text" />
          {/* <ErrorMessage name="type" /> */}
        </div>

        <div className="places__field">
          <label htmlFor="category">Category</label>
          <Field as="select" name="category">
              <option value="FOOD">Food</option>
              <option value="SHOP">Shop</option>
              <option value="ACTIVITY">Activity</option>
            </Field>
          {/* <ErrorMessage name="category" /> */}
        </div>

        <Button color="primary" type="submit" className="places__btn">Submit</Button>
      </Form>
    </Formik>
  );
};

export default PlaceForm;
