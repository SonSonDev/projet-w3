import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "tabler-react";
import { CREATE_USER } from "../../graphql/mutations/clients";
import { useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const EmployeeCreate = () => {
  console.log("EmployeeCreate")
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <Formik
      initialValues={{ name: "", password: "", email: "", role: "USER" }}
      validationSchema={Yup.object({
        name: Yup.string(),
        password: Yup.string(),
        email: Yup.string()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          createUser({
            variables: {
              name: values.name,
              password: values.password,
              email: values.email,
              role: values.role
            }
          });
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />

        <Button color="primary" type="submit" className="places__btn">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default withAuthenticationCheck(EmployeeCreate, ["ADMIN"]);
