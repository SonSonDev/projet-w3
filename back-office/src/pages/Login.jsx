import React from "react"
import { Redirect } from "react-router-dom"

import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

import { useMutation } from "@apollo/react-hooks"
import { LOGIN } from "../graphql/mutations/auth"

const Login = () => {
  const [login] = useMutation(LOGIN, {
    onCompleted: ({
      login: {
        user: { id, name, email, role },
      },
    }) => {
      // redirect
      // put on localstorage
      const user = {
        id,
        name,
        email,
        role,
      }
      localStorage.setItem("isLoggedIn", "true")
      console.log(JSON.stringify(user))
      localStorage.setItem("user", JSON.stringify(user))
      window.location.href = "/"
      console.log({ id, name, email, role })
    },
    onError: error => console.log(error.message),
  })

  if (JSON.parse(localStorage.getItem("user"))) {
    return <Redirect to="/"/>
  }

  return (
    <section className="login">
      <div className="login__side"/>
      <div className="login__content">
        <h1 className="title is-spaced">madu</h1>
        <p className="subtitle center">Identifiez-vous pour accéder à l&apos;espace Madu de votre entreprise.</p>
        <Formik
          initialValues={{ name: "", password: "", email: "" }}
          validationSchema={Yup.object({
            password: Yup.string().required(),
            email: Yup.string().required(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
              login({
                variables: {
                  name: values.name,
                  password: values.password,
                  email: values.email,
                },
              })
            }, 400)
          }}>
          <Form className="login__form">
            <div className="field">
              <label htmlFor="email" className="label">Adresse email</label>
              <div className="control">
                <Field className="input" name="email" type="email" placeholder="Adresse email" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">Mot de passe</label>
              <div className="control">
                <Field className="input" name="password" type="password" placeholder="Mot de passe"/>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-link is-fullwidth">Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  )
}

export default Login
