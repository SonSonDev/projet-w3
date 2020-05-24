import React from "react"

import { Formik, Field, Form, FieldArray } from "formik"
import * as Yup from "yup"

import { useMutation } from "@apollo/react-hooks"
import { CREATE_ARTICLE } from "../../graphql/mutations/article"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

const ArticleCreate = () => {

  const [createArticle] = useMutation(CREATE_ARTICLE, {
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
        initialValues={{
          title: '',
          content: '',
          quizQuestion: '',
          quizChoices: ['', '', '', ''],
          quizAnswer: '',
          quizValue: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string().required(),
          content: Yup.string().required(),
          quizQuestion: Yup.string().required(),
          quizChoices: Yup.array().required(),
          quizAnswer: Yup.string().required(),
          quizValue: Yup.number().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
            createArticle({
              variables: {
                title: values.title,
                content: values.content,
                quizQuestion: values.quizQuestion,
                quizChoices: values.quizChoices,
                quizAnswer: values.quizAnswer,
                quizValue: values.quizValue,
              },
            })
          }, 400)
        }}
      >
      {({ values, setFieldValue }) => (
        <Form className="create__form">
          <h1 className="title">Ajouter un nouvel article</h1>

          <div className="field">
            <label htmlFor="title" className="label">Titre de l'article</label>
            <div className="control">
              <Field id="title" className="input" name="title" type="text" placeholder="Titre" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="content" className="label">Contenu de l'article</label>
            <div className="control">
              <Field id="content" className="input" name="content" type="text" as="textarea" placeholder="Texte" style={{height: '150px'}}/>
            </div>
          </div>

          <div className="field">
            <label htmlFor="quizQuestion" className="label">Question</label>
            <div className="control">
              <Field id="quizQuestion" className="input" name="quizQuestion" type="text" placeholder="Question" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="quizQuestion" className="label">Choix de réponse</label>
            <FieldArray
              name="quizChoices"
              render={() => (
                values.quizChoices.map((choice, index) => (
                  <div className="field has-addons" key={index}>
                    <div className="control is-expanded">
                      <Field className="input" name={`quizChoices[${index}]`} type="text" placeholder={`Réponse ${index + 1}`} />
                    </div>
                    <div className="control">
                      <button className="button"
                        type="button"
                        tabIndex="-1"
                        onClick={() => setFieldValue("quizAnswer", values.quizChoices[index])}>
                      <input type="radio" name="quizAnswer"
                        tabIndex="-1"
                        readOnly
                        checked={values.quizAnswer !== "" && values.quizAnswer === values.quizChoices[index]}
                        value={values.quizChoices[index]} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            />
          </div>

          <div className="field">
            <label htmlFor="value" className="label">Récompense</label>
            <div className="control">
              <Field id="value" className="input" name="value" type="number" min="0" placeholder="Points" />
            </div>
          </div>

          <button type="submit" className="button is-link is-fullwidth">
            Envoyer
          </button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default withAuthenticationCheck(ArticleCreate, ["SUPER_ADMIN"])
