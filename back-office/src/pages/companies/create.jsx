import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CREATE_COMPANY } from "../../graphql/mutations/companies";
import { useMutation } from "@apollo/react-hooks";
import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck";

const CompanyCreate = () => {
  console.log("CompanyCreate")
  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: data => {
      // TEMP
      window.location.href = "/companies";
      console.log(data);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <section className="create">
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={Yup.object({
          name: Yup.string(),
          email: Yup.string()
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            createCompany({
              variables: { name: values.name, email: values.email }
            });
          }, 400);
        }}
      >
        <Form className="create__form">
          <h1 className="title">Ajouter une nouvelle entreprise</h1>
          <div className="field">
            <label htmlFor="name" className="label">Nom</label>
            <div className="control">
              <Field id="name" className="input" name="name" type="text" placeholder="Nom" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email" className="label">Adresse email</label>
            <div className="control">
              <Field id="email" className="input" name="email" type="text" placeholder="Adresse email" />
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

export default withAuthenticationCheck(CompanyCreate, ["SUPER_ADMIN"]);
