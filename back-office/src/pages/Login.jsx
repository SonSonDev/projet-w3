import React from "react";
import { LOGIN } from "../graphql/mutations/auth";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [login] = useMutation(LOGIN, {
    onCompleted: ({
      login: {
        user: { id, name, email, role }
      }
    }) => {
      // redirect
      // put on localstorage
      const user = {
        id,
        name,
        email,
        role
      };
      localStorage.setItem("isLoggedIn", "true");
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "http://localhost:80/";
      console.log({ id, name, email, role });
    },
    onError: error => console.log(error.message)
  });

  return (
    <section
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Formik
        initialValues={{ name: "", password: "", email: "" }}
        validationSchema={Yup.object({
          password: Yup.string(),
          email: Yup.string()
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            login({
              variables: {
                name: values.name,
                password: values.password,
                email: values.email
              }
            });
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
            <label htmlFor="password">Password</label>
            <Field
              style={{ border: "2px solid grey", borderRadius: "15px" }}
              name="password"
              type="password"
            />
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default Login;
