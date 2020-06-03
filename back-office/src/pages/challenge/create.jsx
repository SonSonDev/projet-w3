import React from "react"

import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

import { useMutation } from "@apollo/react-hooks"
import { CREATE_CHALLENGE } from "../../graphql/mutations/challenge"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

const ChallengeCreate = () => {
  console.log("ChallengeCreate")
  const [createChallenge] = useMutation(CREATE_CHALLENGE, {
    onCompleted: data => {
      // TEMP
      window.location.href = "/challenges"
      console.log(data)
    },
    onError: error => {
      console.log(error)
    },
  })

  return (
    <div className="create">
      <Formik
        initialValues={{ name: "", description: "", value: ""  }}
        validationSchema={Yup.object({
          name: Yup.string().required(),
          description: Yup.string().required(),
          value: Yup.number().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
            createChallenge({
              variables: {
                name: values.name,
                description: values.description,
                value: values.value,
              },
            })
          }, 400)
        }}
      >
        <Form className="create__form">
          <h1 className="title">Ajouter un nouveau défi</h1>

          <div className="field">
            <label htmlFor="name" className="label">Défi</label>
            <div className="control">
              <Field id="name" className="input" name="name" type="text" placeholder="Nom du défi" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="description" className="label">Nom</label>
            <div className="control">
              <Field id="description" className="input" name="description" type="text" placeholder="Description" as="textarea" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="value" className="label">Récompense en points</label>
            <div className="control">
              <Field id="value" className="input" name="value" placeholder="Valeur" type="number" />
            </div>
          </div>

          <button type="submit" className="button is-link is-fullwidth">
            Envoyer
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default withAuthenticationCheck(ChallengeCreate, ["SUPER_ADMIN"])
