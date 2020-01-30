import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CREATE_USER } from "../../graphql/mutations/clients";
import { useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const ClientCreate = () => {
  console.log("ClientCreate")
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: data => {
      // TEMP
      window.location.href = "http://localhost:80/clients";
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <section className="create">
      <Formik
        initialValues={{ name: "", password: "", email: "", role: "ADMIN" }}
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
        <Form className="create__form">
          <div class="field">
            <label htmlFor="name" class="label">Nom</label>
            <div class="control">
              <Field id="name" class="input" name="name" type="text" placeholder="Name" />
            </div>
          </div>
          <div class="field">
            <label htmlFor="password" class="label">Mot de passe</label>
            <div class="control">
              <Field id="password" class="input" name="password" type="password" placeholder="Mot de passe" />
            </div>
          </div>
          <div class="field">
            <label htmlFor="email" class="label">Adresse email</label>
            <div class="control">
              <Field id="email" class="input" name="email" type="email" placeholder="Adresse email" />
            </div>
          </div>
          <button type="submit" className="button is-link is-fullwidth">
            Submit
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default withAuthenticationCheck(ClientCreate, ["SUPER_ADMIN"]);
