import React from "react"
import PropTypes from "prop-types"

import { Formik, Field, FieldArray, Form } from "formik"
import CreatableSelect from "react-select/creatable"
import * as Yup from "yup"

import { useMutation, useQuery } from "@apollo/react-hooks"
import { UPDATE_PLACE, GET_PLACE } from "../../graphql/place"
import { GET_TAGS, CREATE_TAG } from "../../graphql/tag"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import SubPage from "../../components/hocs/SubPage"

const PlaceUpdate = ({ history, match: { params: { id } } }) => {

  const { data: { getTags = [] } = {} } = useQuery(GET_TAGS)

  const [ createTag ] = useMutation(CREATE_TAG, {
    update (cache, { data: { createTag } }) {
      const { getTags } = cache.readQuery({ query: GET_TAGS })
      cache.writeQuery({
        query: GET_TAGS,
        data: { getTags: [ ...getTags, createTag ] },
      })
    },
  })

  const { loading, error, data } = useQuery(GET_PLACE, { variables: { id } })

  console.log("PlaceUpdate")
  const [createPlace] = useMutation(UPDATE_PLACE, {
    onCompleted: data => {
      window.location.href = "/places"
      console.log(data)
    },
    onError: error => {
      console.log(error)
    },
  })

  if (loading) return null

  if (error) {
    return (
      <div className="">
        <div className="notification" style={{marginTop: "10px", backgroundColor: "#feecf0", color: "#cc0f35"}}>
          Ce lien est invalide
        </div>
      </div>
    )
  }

  const placeData = data.getPlace

  return (
    <SubPage history={history}>
      <section className="create">
        <Formik
          initialValues={{
            name: placeData.name,
            street: placeData.address.street,
            zipCode: placeData.address.zipCode,
            city: placeData.address.city,
            type: placeData.type || "",
            category: placeData.category || "",
            tags: placeData.tags.map(tag => ({label: tag.value, value: tag.id})) || [],
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
                id,
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
              <h1 className="title">Éditer l’adresse</h1>

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
                          ...(filteredTags || []),
                        ])}
                        onCreateOption={(value) => {
                          createTag({ variables: { value, type: id } })
                            .then(({data: { createTag: {id, value} }}) => { setFieldValue("tags", [...tags, {label: value, value: id}]) })
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
                <button type="submit" className="button is-primary is-fullwidth">Éditer</button>
              </div>
            </Form>
          }
        </Formik>
      </section>
    </SubPage>
  )
}


PlaceUpdate.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}

export default withAuthenticationCheck(PlaceUpdate, ["SUPER_ADMIN"])
