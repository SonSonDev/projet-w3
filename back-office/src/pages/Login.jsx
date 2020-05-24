import React, { useContext } from "react"
import { Redirect } from "react-router-dom"

import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

import { useMutation } from "@apollo/react-hooks"
import { LOGIN } from "../graphql/mutations/auth"

import UserDataContext from "../utils/UserDataContext"
import { ReactComponent as Wordmark } from "../assets/img/logo/wordmark.svg"

const Login = () => {
  const userData = useContext(UserDataContext)

  const [login] = useMutation(LOGIN, {
    onCompleted: () => {
      window.location.href = "/"
    },
    onError: error => console.log(error.message),
  })

  if (userData) {
    return <Redirect to="/"/>
  }

  return (
    <section className="login">
      <div className="login__side"/>
      <div className="login__content">
        <Wordmark width={140} height={50} />
        <p className="center max-width-1 p3 mb2">Identifiez-vous pour accéder à l’espace de gestion de votre compte Madu.</p>
        <Formik
          initialValues={{ name: "", password: "", email: "" }}
          validationSchema={Yup.object({
            password: Yup.string().required(),
            email: Yup.string().required(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // setTimeout(() => {
              setSubmitting(false)
              login({
                variables: {
                  name: values.name,
                  password: values.password,
                  email: values.email,
                },
              })
            // }, 400)
          }}>
          <Form className="login__form">
            <div className="field">
              <label htmlFor="email" className="label">Adresse mail</label>
              <div className="control">
                <Field className="input" name="email" type="email" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">Mot de passe</label>
              <div className="control">
                <Field className="input" name="password" type="password" />
              </div>
            </div>
            <div className="control my3">
              <button type="submit" className="button is-primary is-fullwidth bold is-medium">Connexion</button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  )
}

export default Login
