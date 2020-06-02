import React, { useState, useMemo, useContext } from "react"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Link } from "react-router-dom"

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import { categories } from "../../utils/wording"

import UserDataContext from "../../utils/UserDataContext"
import ToastContext from "../../utils/ToastContext"

const PlacesIndex = ({ history }) => {
  // const userData = useContext(UserDataContext)
  const { setToast } = useContext(ToastContext)

  const { error, loading, data: {getPlaces: places} = {}, refetch } = useQuery(GET_PLACES, {
    onError: error => console.log(error.message),
  })

  const [ upsertPlaces, { error: upsertPlacesError } ] = useMutation(UPSERT_PLACES, {
    update (cache, { data: { upsertPlaces } }) {
      // const { getPlaces } = cache.readQuery({ query: GET_PLACES })
      cache.writeQuery({
        query: GET_PLACES,
        data: { getPlaces: upsertPlaces },
      })
    },
  })

  // const [deletePlace] = useMutation(DELETE_PLACE, { onCompleted: refetch })

  const columns = useMemo(() => [
    {
      Header: "Nom",
      accessor: "name",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <Link to={`/place/${id}/edit`} className="has-text-primary underline bold">
            {value}
          </Link>
        )
      },
    },
    {
      Header: "Catégorie",
      accessor: ({ category }) => categories[category],
    },
    {
      Header: "Adresse",
      accessor: ({ address: { street, zipCode, city } }) => `${street}, ${zipCode} ${city}`,
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <div className="flex">
            <span className="icon is-small mr05 has-text-grey"><i className="ri-map-pin-2-line"/></span>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(value)}`} className="has-text-grey-darker" target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          </div>
        )
      },
    },
    {
      Header: "Contact",
      accessor: ({ user: { email } }) => email,
      Cell ({ cell: { value } }) {
        return (
          <a href={`mailto:${value}`} className="has-text-primary underline bold">
            {value}
          </a>
        )
      },
    },
    // userData.role === "SUPER_ADMIN" && {
    //   id: "edit",
    //   Cell ({ cell: { value }, row: { original: { id } } }) {
    //     return (
    //       <Link to={`/place/${id}/update`} className="button has-text-grey is-small">
    //         Modifier
    //       </Link>
    //     )
    //   },
    // },
    // userData.role === "SUPER_ADMIN" && {
    //   id: "delete",
    //   Cell ({ cell: { value }, row: { original: { id } } }) {
    //     return (
    //       <button onClick={() => deletePlace({ variables: { id } })} className="button is-white has-text-grey">
    //         <span className="icon"><i className="ri-delete-bin-line"/></span>
    //       </button>
    //     )
    //   },
    // },
  ].filter(Boolean), [])


  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  const tabs = [
    { title: "Aucun", filter: () => true },
    { title: "Boutiques", filter: ({ category }) => category === "SHOP" },
    { title: "Activités", filter: ({ category }) => category === "ACTIVITY" },
    { title: "Restaurants", filter: ({ category }) => category === "FOOD" },
  ]

  return (
    <Index data={places} columns={columns} tabs={tabs}>
      {{
        add: "Ajouter adresse",
        slug: "place",
        entity: "adresse",
        onImport: async ({ data }) => {
          try {
            await upsertPlaces({
              variables: {
                data: data.map(({ street, zipCode, city, email, phone, website, facebook, instagram, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, photos, tags, ...rest }) => console.log(tags) || ({
                  ...rest,
                  address: { street, zipCode, city },
                  user: { email, phone, role: "PLACE" },
                  social: { website, facebook, instagram },
                  hours: Object.entries({ MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }).map(([ day, [ start, end ]]) => ({ day, start, end })),
                  photos: photos.split(",").filter(Boolean).map(uri => ({ uri })),
                  tags: tags.split(",").map(label => ({ label })),
                })),
              },
            })
            setToast({ type: "success" })
          } catch (error) {
            setToast({ type: "danger" })
            console.log(error, { ...error })
          }
        },
        onExport: ({ name, category, address: { street, zipCode, city }, user: { email, phone }, social: { website, facebook, instagram }, headline, description, hours, photos, tags }) => ({ name, category, street, zipCode, city, email, phone, website, facebook, instagram, headline, description, ...Object.fromEntries(hours.map(({ day, start, end }) => [ day, [ start, end ] ])), photos: photos.map(({ uri }) => uri), tags: tags.map(({ label }) => label) }),
      }}
    </Index>
  )
}

PlacesIndex.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default withAuthenticationCheck(PlacesIndex, [
  "SUPER_ADMIN",
  "ADMIN",
  "USER",
])
