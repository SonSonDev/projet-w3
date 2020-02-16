import React from 'react'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../../graphql/mutations/clients'

import withAuthenticationCheck from '../../components/hocs/withAuthenticationCheck'

const ClientCreate = () => {
  console.log('ClientCreate')
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: data => {
      // TEMP
      window.location.href = '/clients'
      console.log(data)
    },
    onError: error => {
      console.log(error.message)
    },
  })

  return (
    <section className="create">
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', role: 'ADMIN' }}
        validationSchema={Yup.object({
          firstName: Yup.string(),
          lastName: Yup.string(),
          email: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
            createUser({
              variables: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                role: values.role,
              },
            })
          }, 400)
        }}
      >
        <Form className="create__form">
          <h1 className="title">Ajouter un nouveau client</h1>

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

          <div className="field">
            <label htmlFor="email" className="label">Adresse email</label>
            <div className="control">
              <Field id="email" className="input" name="email" type="email" placeholder="Adresse email" />
            </div>
          </div>

          <button type="submit" className="button is-link is-fullwidth">Submit</button>
        </Form>
      </Formik>
    </section>
  )
}

export default withAuthenticationCheck(ClientCreate, ['SUPER_ADMIN'])
