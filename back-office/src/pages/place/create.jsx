import React from 'react'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_PLACE } from '../../graphql/mutations/places'

import withAuthenticationCheck from '../../components/hocs/withAuthenticationCheck'

const PlaceCreate = () => {
  console.log('PlaceCreate')
  const [createPlace] = useMutation(CREATE_PLACE, {
    onCompleted: data => {
      // TEMP
      window.location.href = '/places'
      console.log(data)
    },
    onError: error => {
      console.log(error)
    },
  })

  return (
    <section className="create">
      <Formik
        initialValues={{
          name: '',
          street: '',
          zipCode: '',
          city: '',
          type: '',
          category: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string(),
          street: Yup.string(),
          zipCode: Yup.string(),
          city: Yup.string(),
          type: Yup.string(),
          category: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
          createPlace({
            variables: {
              name: values.name,
              street: values.street,
              zipCode: values.zipCode,
              city: values.city,
              type: values.type,
              category: values.category,
            },
          })
        }}
      >
        <Form className="create__form">
          <h1 className="title">Ajouter une nouvelle adresse</h1>

          <div className="field">
            <label htmlFor="name" className="label">Nom</label>
            <div className="control">
              <Field id="name" className="input" name="name" type="text" placeholder="Nom" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="category">Catégorie</label>
            <div className="control">
              <div className="select is-fullwidth">
                <Field as="select" id="category" name="category">
                  <option value="" disabled>Sélectionner une catégorie</option>
                  <option value="FOOD">Restaurant</option>
                  <option value="SHOP">Boutique</option>
                  <option value="ACTIVITY">Activité</option>
                </Field>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="street" className="label">Adresse</label>
            <div className="control">
              <Field id="street" className="input" name="street" type="text" placeholder="Rue" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="zipCode" className="label">Code postal</label>
            <div className="control">
              <Field id="zipCode" className="input" name="zipCode" type="text" placeholder="Code postal" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="city" className="label">Ville</label>
            <div className="control">
              <Field id="city" className="input" name="city" type="text" placeholder="Ville" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="type" className="label">Type</label>
            <div className="control">
              <Field id="type" className="input" name="type" type="text" placeholder="Type" />
            </div>
          </div>


          <div className="control">
            <button type="submit" className="button is-link is-large is-fullwidth">Valider</button>
          </div>
        </Form>
      </Formik>
    </section>
  )
}

export default withAuthenticationCheck(PlaceCreate, ['SUPER_ADMIN'])
