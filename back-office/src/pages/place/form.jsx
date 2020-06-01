import React, { useContext } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"
import { CREATE_PLACE, GET_PLACES, GET_PLACE, UPDATE_PLACE, DELETE_PLACE } from "../../graphql/place"
import { GET_TAGS } from "../../graphql/tag"
import { categories, hours } from "../../utils/wording"

import Form from "../../components/Form"
import Loader from "../../components/Loader"


const autofill = on => on && ({
  name: `Place n°${Math.random()*10e17}`,
  category: "FOOD",
  address: {
    street: "11 rue Odin",
    zipCode: "75040",
    city: "Paris",
  },
  user: {
    email: `mail+${Math.random()*10e17}@gmail.com`,
    phone: "0612345678",
  },
})
const getTagsNested = ({ label, children }, { type, collapsible, className }, path = ["tags"]) => ({
  key: [ ...path, label, "SR".includes(type) && "[0]" ].filter(Boolean).join("."),
  label,
  ...children.length && !children[0].leaf
    ? { children: children.map(tag => getTagsNested(tag, { type, collapsible, className }, [ ...path, label ])) }
    : { options: children.map(({ id, label }) => ({ value: id, label })), type, collapsible, className },
})
const getTagsFlattened = tags => Object.values(tags)
  .map(val => Array.isArray(val) ? val : getTagsFlattened(val))
  .flat().filter(Boolean)

const getTagsPopulated = (tags, tagsIds) => tags.map(({ label, children }) => ({
  [label]: children.length && !children[0].leaf
    ? { ...getTagsPopulated(children, tagsIds) }
    : [ ...children.filter(({ id }) => tagsIds.includes(id)).map(({ id }) => id) ],
})).reduce((acc, curr) => ({ ...acc, ...curr }), {})


function PlaceForm ({ history,  match: { params: { id } } }) {

  const { setToast } = useContext(ToastContext)

  const { data } = useQuery(GET_PLACES)

  const { data: { getPlace = {} } = {}, loading: getPlaceLoading } = useQuery(GET_PLACE, { variables: { where: { id } } })

  const { data: { getTags = [] } = {}, loading: getTagsLoading } = useQuery(GET_TAGS, { variables: { where: { root: true } } })

  const [ createPlace, { loading: createPlaceLoading, error: createPlaceError } ] = useMutation(CREATE_PLACE, {
    update (cache, { data: { createPlace } }) {
      const { getPlaces } = cache.readQuery({ query: GET_PLACES })
      cache.writeQuery({
        query: GET_PLACES,
        data: { getPlaces: [ createPlace, ...getPlaces ] },
      })
    },
  })
  const [ updatePlace, { loading: updatePlaceLoading, error: updatePlaceError } ] = useMutation(UPDATE_PLACE, {
    // update (cache, { data: { updatePlace } }) {
    //   const { getPlace } = cache.readQuery({ query: GET_PLACE, variables: { where: { id } } })
    //   cache.writeQuery({
    //     query: GET_PLACE,
    //     data: { getPlace: { ...getPlace, ...updatePlace } },
    //   })
    // },
  })
  const [ deletePlace, { loading: deletePlaceLoading, error: deletePlaceError } ] = useMutation(DELETE_PLACE, {
    update (cache, { data: { deletePlace } }) {
      const { getPlaces } = cache.readQuery({ query: GET_PLACES })
      cache.writeQuery({
        query: GET_PLACES,
        data: { getPlaces: getPlaces.filter(({ id }) => id !== deletePlace.id) },
      })
    },
  })


  const form = ({ category, photos }) => ([
    {
      label: "Informations de base",
      children: [
        { key: "name", label: "Nom de l’établissement", type: "T", required: true },
        { key: "category", label: "Catégorie", type: "R", options: Object.entries(categories).map(([ value, label ]) => ({ value, label })), required: true },
        ...getTags
          .filter(tag => tag.category === category && !["Engagements", "Prix"].includes(tag.label))
          .map(tag => getTagsNested(tag, { type: "S", className: "fade-in" })),
        { key: "address.street", label: "Adresse", type: "T", required: true },
        { className: "is-grouped", children: [
          { key: "address.zipCode", label: "Code postal", type: "T", required: true, className: "control is-expanded" },
          { key: "address.city", label: "Ville", type: "T", required: true, className: "control is-expanded" },
        ] },
      ],
    },
    {
      label: "Représentant",
      children: [
        { key: "user.email",       label: "Email", type: "T", required: true, attributes: { type: "email" } },
        { key: "user.phone",       label: "N° Tel", type: "T", required: true, attributes: { type: "tel" } },
        { key: "social.website",     label: "Lien du site", type: "T", attributes: { type: "url" } },
        { key: "social.facebook",    label: "Page Facebook", type: "T", attributes: { type: "url" } },
        { key: "social.instagram",   label: "Page Instagram", type: "T", attributes: { type: "url" } },
      ],
    },
    {
      label: "Description",
      children: [
        { key: "headline",    label: "Phrase d’accroche", type: "T" },
        { key: "description", label: "Description", type: "TT" },
        ...getTags
          .filter(tag => tag.category === category && tag.label === "Prix")
          .map(tag => getTagsNested(tag, { type: "R", className: "fade-in" })),
        { key: "hours",       label: "Horaires d’ouverture", type: "H", options: Object.entries(hours).map(([ value, label ], i) => ({ value, label, attributes: { defaultChecked: i < 5 } })) },
        { key: "photos",      label: "Photos", type: "P" },
      ],
    },
    ...getTags
      .filter(tag => tag.category === category && tag.label === "Engagements")
      .map(tag => getTagsNested(tag, { type: "C", collapsible: true, className: "fade-in" })),
  ])

  const onSubmit = async ({ name, user, hours, photos, tags, ...rest }) => {
    try {
      const data = {
        ...rest,
        name,
        user: { ...user, role: "PLACE" },
        hours: Object.values(hours).filter(({ day }) => day),
        photos: photos.filter(({ files, uri }) => files?.length || uri).map(({ files: [ file ], uri }) => ({ file, uri })),
        tags: getTagsFlattened(tags).map(id => ({ id })),
      }
      // console.log(data)
      if (id) {
        await updatePlace({ variables: { data, where: { name } } })
      } else {
        await createPlace({ variables: { data } })
        history.push("/places")
      }
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  }
  const onDelete = id && (async () => {
    try {
      await deletePlace({ variables: { where: { id } } })
      history.push("/places")
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  })

  const defaultValues = id ? {
    ...getPlace,
    hours: getPlace.hours?.reduce((acc, { day, start, end }) => ({ ...acc, [day]: { day: start && end, start, end } }), {}),
    tags: getTagsPopulated(
      getTags.filter(({ category }) => category === getPlace.category),
      getPlace.tags?.map(({ id }) => id),
    ),
  } : autofill(true)

  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          {id ? "Modifier une adresse" : "Ajouter une nouvelle adresse"}
        </h1>
      </div>
      <div className='p3'>
        {(getPlaceLoading || getTagsLoading) ? (
          <Loader />
        ) : (
          <Form
            form={form}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={() => history.goBack()}
            submitting={createPlaceLoading || updatePlaceLoading || deletePlaceLoading}
          >
            {{ defaultValues }}
          </Form>
        )}
      </div>
    </main>
  )
}

export default withAuthenticationCheck(PlaceForm, ["SUPER_ADMIN"])