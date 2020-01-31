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
            <label htmlFor="name" className="label">Raison sociale</label>
            <div className="control">
              <Field id="name" className="input" name="name" type="text" placeholder="Raison sociale" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="type">Type</label>
            <div className="control">
              <div className="select is-fullwidth">
                <Field as="select" id="type" name="type">
                  <option value="" disabled>Sélectionner un type</option>
                  <option value="COMPANY">Entreprise</option>
                  <option value="ECOLE">Ecole</option>
                  <option value="PLACE">Point d'intérêt</option>
                  <option value="COWORKING">Espace Coworking</option>
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="email" className="label">Rue</label>
            <div className="control">
              <Field id="email" className="input" name="email" type="text" placeholder="Rue" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="zipCode" className="label">Code postal</label>
            <div className="control">
              <Field id="zipCode" className="input" name="zipCode" type="text" placeholder="Code postal" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="street" className="label">Ville</label>
            <div className="control">
              <Field id="street" className="input" name="street" type="text" placeholder="Ville" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="userLastName" className="label">Nom</label>
            <div className="control">
              <Field id="userLastName" className="input" name="userLastName" type="text" placeholder="Nom" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="userFirstName" className="label">Prenom</label>
            <div className="control">
              <Field id="userFirstName" className="input" name="userFirstName" type="text" placeholder="Prenom" />
            </div>
          </div>
          
          <div className="field">
            <label htmlFor="userEmail" className="label">Email</label>
            <div className="control">
              <Field id="userEmail" className="input" name="userEmail" type="text" placeholder="Email" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="phone" className="label">Telephone</label>
            <div className="control">
              <Field id="phone" className="input" name="phone" type="text" placeholder="Telephone" />
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
