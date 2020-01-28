import React, { useState } from "react";
import { GET_USERS, DELETE_USER, CREATE_USER } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Forma = () => {
  const [createUser] = useMutation(CREATE_USER);
  return (
    <Formik
      initialValues={{ name: "", password: "", email: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required")
      })}
      onSubmit={({ name, password, email }, { setSubmitting }) => {
        setTimeout(() => {
          createUser({ variables: { name, password, email } });
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
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

const Card = ({ name, email, role, id }) => {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id },
    onCompleted: data => console.log(data)
  });

  return (
    <div style={{ padding: "1em" }}>
      <div>Name: {name}</div>
      <div>Email : {email}</div>
      <div>Role : {role}</div>
      <div onClick={() => deleteUser()}>Supprimer</div>
    </div>
  );
};

const Home = () => {
  const [users, setUsers] = useState(null);

  const { error, loading } = useQuery(GET_USERS, {
    onCompleted: ({ getUsers }) => setUsers(getUsers)
  });

  const renderCards = users =>
    users.map(({ id, name, email, role }) => (
      <Card name={name} email={email} role={role} id={id} />
    ));

  if (error) return <div>{error.message}</div>;

  return (
    <section style={{ minHeight: "100vh", border: "5px solid pink" }}>
      {loading && <div>Loading...</div>}
      {!loading && users && renderCards(users)}
      <Forma />
    </section>
  );
};

export default Home;
