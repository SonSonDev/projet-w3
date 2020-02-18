import React, { useState } from "react"
import PropTypes from "prop-types"

import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_COMPANY } from "../../graphql/queries/companies"
import { CREATE_USER } from "../../graphql/mutations/clients"


function CompanyEmployeeSignup ({ match: { params: { id } } }) {
  const { loading, error, data } = useQuery(GET_COMPANY, { variables: { id } })

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [createUser] = useMutation(CREATE_USER, {
    onError: () => {
      setErrorMessage("Cette adresse email est déjà utilisée")
    },
    onCompleted: () => {
      setSuccessMessage("Votre compte a été créé. Checkez vos mails")
    },
  })

  if (loading) return null

  if (successMessage) {
    return (
      <div className="">
        <div className="notification" style={{marginTop: "10px", backgroundColor: "#effaf3", color: "#257942"}}>
          {successMessage}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="">
        <div className="notification" style={{marginTop: "10px", backgroundColor: "#feecf0", color: "#cc0f35"}}>
          Ce lien est invalide
        </div>
      </div>
    )
  }

  const { emailDomains } = data.getCompany

  return (
    <div className="create">
      <Formik
        initialValues={{
          firstName: "vincent",
          lastName: "pham",
          emailLocalPart: "vpham",
          emailDomain: emailDomains[0],
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          emailLocalPart: Yup.string().required(),
          emailDomain: Yup.string().required(),
        })}
        onSubmit={({ firstName, lastName, emailLocalPart, emailDomain }) => {
          setErrorMessage("")
          createUser({
            variables: {
              firstName,
              lastName,
              email: emailLocalPart + "@" + emailDomain,
              role: "USER",
            },
          })
        }}
      >
        <Form className="create__form">
          <h1 className="title">Inscription</h1>


          <div className="field">
            <label htmlFor="firstName" className="label">Prénom</label>
            <div className="control">
              <Field id="firstName" className="input" name="firstName" type="text" placeholder="Prenom" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="lastName" className="label">Nom</label>
            <div className="control">
              <Field id="lastName" className="input" name="lastName" type="text" placeholder="Nom" />
            </div>
          </div>

          <label htmlFor="emailLocalPart" className="label">Email</label>
          <div className="field has-addons">
            <div className="control is-expanded">
              <Field id="emailLocalPart" className="input" name="emailLocalPart" type="text" placeholder="" />
            </div>
            <div className="control">
              <span className="select">
                <Field as="select" id="emailDomain" name="emailDomain">
                  {emailDomains.map(domain => (
                    <option value={domain} key={domain}>@{domain}</option>
                  ))}
                </Field>
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-link is-fullwidth">S’inscrire</button>
            </div>
          </div>
          {errorMessage &&
            (<div className="notification" style={{marginTop: "10px", backgroundColor: "#feecf0", color: "#cc0f35"}}>
              {errorMessage}
            </div>)
          }
        </Form>
      </Formik>
    </div>
  )
}

CompanyEmployeeSignup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}

export default CompanyEmployeeSignup