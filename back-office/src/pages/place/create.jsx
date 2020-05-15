import React, { useState } from "react"
import PropTypes from "prop-types"
import { Formik, Field, FieldArray, Form } from "formik"
import CreatableSelect from "react-select/creatable"
import * as Yup from "yup"

import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks"
import { CREATE_PLACE } from "../../graphql/place"
import { GET_TAGS, CREATE_TAG } from "../../graphql/tag"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import SubPage from "../../components/hocs/SubPage"

import { categoryNames } from "../../utils/wording"

const PlaceCreate = ({history}) => {

  const { data: { getTags = [] } = {} } = useQuery(GET_TAGS, {
    variables: { where: { leaf: true } },
  })

  const [ createTag, { loading } ] = useMutation(CREATE_TAG, {
    update (cache, { data: { createTag } }) {
      const { getTags } = cache.readQuery({ query: GET_TAGS, variables: { where: { leaf: true } } })
      cache.writeQuery({
        query: GET_TAGS,
        variables: { where: { leaf: true } },
        data: { getTags: [ ...getTags, createTag ] },
      })
    },
  })

  const [ createPlace ] = useMutation(CREATE_PLACE, {
    onCompleted: data => {
      // TEMP
      window.location.href = "/places"
      console.log(data)
    },
    onError: error => {
      console.log(error)
    },
  })

  return (
    <SubPage history={history}>
      <section className="create">
        <Formik
          initialValues={{
            name: "",
            street: "",
            zipCode: "",
            city: "",
            type: "",
            category: "",
            tags: [],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            street: Yup.string().required(),
            zipCode: Yup.string().required(),
            city: Yup.string().required(),
            category: Yup.string().required(),
            tags: Yup.array(),
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
                category: values.category,
                tags: values.tags.map(({ value }) => value),
              },
            })
          }}
        >
          {({ values: { tags, category }, setFieldValue }) =>
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
                      {Object.entries(categoryNames).map(cat => (
                        <option value={cat[0]} key={cat[0]}>{cat[1]}</option>
                      ))}
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
              <FieldArray name="tags">
                <>
                  {Object.entries(getTags.filter(tag => tag.type.category === category).reduce((acc, { type }) => ({ ...acc, [type.name]: type.id }), {})).map(([type, id]) => (
                    <div className="field" key={type}>
                      <label className="label">{type}</label>
                      <CreatableSelect
                        value={tags.filter(({ value }) => getTags.filter(t => t.type.name === type).find(({ id }) => value === id))}
                        options={getTags.filter(t => t.type.name === type && t.type.category === category).filter(t => t.value).map(({ id, value }) => ({ value: id, label: value }))}
                        onChange={(filteredTags = []) => setFieldValue("tags", [
                          ...tags.filter(({ value }) => getTags.filter(t => t.type.name !== type).find(({ id }) => value === id)),
                          ...(filteredTags || [])
                        ])}
                        onCreateOption={(value) => {
                          createTag({ variables: { value, type: id } })
                          .then(({data : { createTag: {id, value} }}) => { setFieldValue("tags", [...tags, {label: value, value: id}]) })
                        }}
                        isMulti
                        onInputChange={getTags.filter(tag => tag.type.category === category).filter(t => t.value).map(({ id, value }) => ({ value: id, label: value }))}
                        isLoading={loading}
                        filterOption={({ label }, input) => label.toLowerCase().includes(input.toLowerCase())}
                        formatCreateLabel={value => `Créer "${value}"`}
                      />
                    </div>
                  ))}
                </>
              </FieldArray>

              <div className="control">
                <button type="submit" className="button is-link is-fullwidth">Valider</button>
              </div>
            </Form>
          }
        </Formik>
      </section>
    </SubPage>
  )
}

PlaceCreate.propTypes = {
  history: PropTypes.object,
}

export default withAuthenticationCheck(PlaceCreate, ["SUPER_ADMIN"])
