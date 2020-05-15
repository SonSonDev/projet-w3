import React, { useState, useMemo, useContext } from "react"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Link } from "react-router-dom"
import { unparse, parse } from "papaparse"

import { GET_PLACES, DELETE_PLACE, CREATE_PLACES } from "../../graphql/place"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import { categoryNames } from "../../utils/wording"

import UserDataContext from "../../utils/UserDataContext"

const PlacesIndex = ({ history }) => {
  const userData = useContext(UserDataContext)

  const { error, loading, data: {getPlaces: places} = {}, refetch } = useQuery(GET_PLACES, {
    onError: error => console.log(error.message),
  })

  const [ importPlaces ] = useMutation(CREATE_PLACES, {
    update (cache, { data: { createPlaces } }) {
      const { getPlaces } = cache.readQuery({ query: GET_PLACES })
      cache.writeQuery({
        query: GET_PLACES,
        data: { getPlaces: [ ...createPlaces, ...getPlaces ] },
      })
    },
  })

  const [deletePlace] = useMutation(DELETE_PLACE, { onCompleted: refetch })

  const columns = useMemo(() => [
    {
      Header: "Nom",
      accessor: "name",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <Link to={`/place/${id}`} className="has-text-primary underline">
            {value}
          </Link>
        )
      },
    },
    {
      Header: "Catégorie",
      accessor: ({ category }) => categoryNames[category],
    },
    {
      Header: "Adresse",
      accessor: ({ address: { street, zipCode, city } }) => `${street}, ${zipCode} ${city}`,
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <div className="flex">
            <span className="icon has-text-grey"><i className="ri-map-pin-2-line"/></span>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(value)}`} className="has-text-grey underline" target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          </div>
        )
      },
    },
    userData.role === "SUPER_ADMIN" && {
      id: "edit",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <Link to={`/place/${id}/update`} className="button has-text-grey is-small">
            Modifier
          </Link>
        )
      },
    },
    userData.role === "SUPER_ADMIN" && {
      id: "delete",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <button onClick={() => deletePlace({ variables: { id } })} className="button is-white has-text-grey">
            <span className="icon"><i className="ri-delete-bin-line"/></span>
          </button>
        )
      },
    },
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
        slug: "place",
        entity: "adresse",
        onImport: ({ data: places }) => importPlaces({ variables: { places } }),
        onExport: ({ name, address: { street, zipCode, city }, category }) => ({ name, street, zipCode, city, category }),
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
