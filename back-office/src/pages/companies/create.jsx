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
        initialValues={{ companyName: "", companyType: "", streetCompany: "", zipCodeCompany: "", cityCompany: "", firstNameUser: "", lastNameUser: "", emailUser: "", phoneUser: "", roleUser: "ADMIN", isRepresentative: true }}
        validationSchema={Yup.object({
          companyName: Yup.string(), companyType: Yup.string(), streetCompany: Yup.string(), zipCodeCompany: Yup.string(), cityCompany: Yup.string(), firstNameUser: Yup.string(), lastNameUser: Yup.string(), emailUser: Yup.string(), phoneUser: Yup.string(), roleUser: Yup.string(), isRepresentative: Yup.boolean()
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            createCompany({
              variables: { companyName: values.companyName, companyType: values.companyType, streetCompany: values.streetCompany, zipCodeCompany: values.zipCodeCompany, cityCompany: values.cityCompany, firstNameUser: values.firstNameUser, lastNameUser: values.lastNameUser, emailUser: values.emailUser, phoneUser: values.phoneUser, roleUser: values.roleUser, isRepresentative: values.isRepresentative }
            });
          }, 400);
        }}
      >
        <Form className="create__form">
          <h1 className="title">Ajouter une nouvelle entreprise</h1>

          <div className="field">
            <label htmlFor="companyName" className="label">Raison sociale</label>
            <div className="control">
              <Field id="companyName" className="input" name="companyName" type="text" placeholder="Raison sociale" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="companyType">Type</label>
            <div className="control">
              <div className="select is-fullwidth">
                <Field as="select" id="companyType" name="companyType">
                  <option value="" disabled>Sélectionner un type</option>
                  <option value="COMPANY">Entreprise</option>
                  <option value="SCHOOL">Ecole</option>
                  <option value="PLACE">Point d'intérêt</option>
                  <option value="COWORKING">Espace Coworking</option>
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="streetCompany" className="label">Rue</label>
            <div className="control">
              <Field id="streetCompany" className="input" name="streetCompany" type="text" placeholder="Rue" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="zipCodeCompany" className="label">Code postal</label>
            <div className="control">
              <Field id="zipCodeCompany" className="input" name="zipCodeCompany" type="text" placeholder="Code postal" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="cityCompany" className="label">Ville</label>
            <div className="control">
              <Field id="cityCompany" className="input" name="cityCompany" type="text" placeholder="Ville" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="lastNameUser" className="label">Nom</label>
            <div className="control">
              <Field id="lastNameUser" className="input" name="lastNameUser" type="text" placeholder="Nom" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="firstNameUser" className="label">Prenom</label>
            <div className="control">
              <Field id="firstNameUser" className="input" name="firstNameUser" type="text" placeholder="Prenom" />
            </div>
          </div>
          
          <div className="field">
            <label htmlFor="emailUser" className="label">Email</label>
            <div className="control">
              <Field id="emailUser" className="input" name="emailUser" type="text" placeholder="Email" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="phoneUser" className="label">Telephone</label>
            <div className="control">
              <Field id="phoneUser" className="input" name="phoneUser" type="text" placeholder="Telephone" />
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
