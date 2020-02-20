import React from "react"
import PropTypes from "prop-types"
import { Formik, Field, Form, FieldArray } from "formik"
import * as Yup from "yup"

import { useMutation } from "@apollo/react-hooks"
import { CREATE_COMPANY } from "../../graphql/mutations/companies"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import SubPage from "../../components/hocs/SubPage"

import { companyTypeNames } from "../../utils/wording"

const CompanyCreate = ({history}) => {
  console.log("CompanyCreate")
  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: data => {
      // TEMP
      window.location.href = "/companies"
      console.log(data)
    },
    onError: error => {
      console.log(error)
    },
  })

  return (
    <SubPage history={history}>
      <div className="create">
        <Formik
          initialValues={{ companyName: "", companyType: "", streetCompany: "", zipCodeCompany: "", cityCompany: "", firstNameUser: "", lastNameUser: "", emailUser: "", phoneUser: "", emailDomains: [] }}
          validationSchema={Yup.object({
            companyName: Yup.string(), companyType: Yup.string(), streetCompany: Yup.string(), zipCodeCompany: Yup.string(), cityCompany: Yup.string(), firstNameUser: Yup.string(), lastNameUser: Yup.string(), emailUser: Yup.string(), phoneUser: Yup.string(), roleUser: Yup.string(), isRepresentative: Yup.boolean(), emailDomains: Yup.array().of(Yup.string()),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
              createCompany({
                variables: { companyName: values.companyName, companyType: values.companyType, streetCompany: values.streetCompany, zipCodeCompany: values.zipCodeCompany, cityCompany: values.cityCompany, firstNameUser: values.firstNameUser, lastNameUser: values.lastNameUser, emailUser: values.emailUser, phoneUser: values.phoneUser, emailDomains: values.emailDomains, roleUser: "ADMIN", isRepresentative: true },
              })
            }, 400)
          }}>
          {({ values }) => (
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
                      {Object.entries(companyTypeNames).map(type => (
                        <option value={type[0]} key={type[0]}>{type[1]}</option>
                      ))}
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

              <div className="field">
                <label htmlFor="emailDomains" className="label">Noms de domaine d&apos;email</label>

                <FieldArray name="emailDomains"
                  render={arrayHelpers => (
                    <div>
                      {values.emailDomains.map((friend, index) => (
                        <div className="field has-addons" key={index}>
                          <div className="control is-expanded" style={{marginBottom: "2px"}}>
                            <Field name={`emailDomains[${index}]`} className="input full-width" />
                          </div>
                          <div className="control">
                            <button className="button" onClick={() => arrayHelpers.remove(index)}>
                              Suppr
                            </button>
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={() => arrayHelpers.push("")}>Ajouter un nom de domaine</button>
                    </div>
                  )}
                />
              </div>

              <button type="submit" className="button is-link is-fullwidth">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </SubPage>
  )
}

CompanyCreate.propTypes = {
  history: PropTypes.object,
}

export default withAuthenticationCheck(CompanyCreate, ["SUPER_ADMIN"])
