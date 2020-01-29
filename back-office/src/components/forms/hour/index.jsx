import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const HourForm = props => {
  return (
    <Formik
      initialValues={{ day: "", start: "", end: "" }}
      validationSchema={Yup.object({
        day: Yup.string(),
        start: Yup.string(),
        end: Yup.string()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          props.onSubmit(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="day">Day</label>
        <Field as="select" name="day">
          <option value="MONDAY">Monday</option>
          <option value="TUESDAY">Tuesday</option>
          <option value="WEDNESDAY">Wednesday</option>
          <option value="THURSDAY">Thursday</option>
          <option value="FRIDAY">Friday</option>
          <option value="SATURDAY">Saturday</option>
          <option value="SUNDAY">Sunday</option>
        </Field>
        <ErrorMessage name="day" />

        <label htmlFor="start">Start</label>
        <Field name="start" type="text" />
        <ErrorMessage name="start" />

        <label htmlFor="end">End</label>
        <Field name="end" type="text" />
        <ErrorMessage name="end" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default HourForm;
