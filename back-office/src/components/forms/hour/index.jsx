import React from "react";
import { Formik, Field, Form } from "formik";
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

        <label htmlFor="start">Start</label>
        <Field name="start" type="text" />

        <label htmlFor="end">End</label>
        <Field name="end" type="text" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default HourForm;
