import React, { useState, useMemo, useContext } from "react"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Link } from "react-router-dom"

import { GET_PLACES } from "../../graphql/queries/places"
import { DELETE_PLACE, CREATE_PLACES } from "../../graphql/mutations/places"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Table from "../../components/Table"
import Tabs from "../../components/Tabs"
import Loader from "../../components/Loader"

import { categoryNames } from "../../utils/wording"

import UserDataContext from "../../utils/UserDataContext"

const PlacesIndex = ({ history }) => {
  const userData = useContext(UserDataContext)
  const [activeTabIndex, setActiveTabIndex] = useState(0)

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
    { title: "Tout", filter: () => true },
    { title: "Boutiques", filter: ({ category }) => category === "SHOP" },
    { title: "Activités", filter: ({ category }) => category === "ACTIVITY" },
    { title: "Restaurants", filter: ({ category }) => category === "FOOD" },
  ]

  const data = places.filter(tabs[activeTabIndex].filter)

  return (
    <section className="list-page">
      <Tabs
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        onTabClick={setActiveTabIndex}
        action={{label: "Ajouter une adresse", url: "/place/create"}}
        DropdownContent={userData.role === "SUPER_ADMIN" && (
          <>
            <a className="dropdown-item">
              <span className="icon"><i className="ri-download-2-line"/></span>
              <span className="">Importer</span>
              <input className="file-input pointer" type="file" name="resume" accept=".json" onInput={e => {
                if (!e.target.files.length) return
                const reader = new FileReader()
                reader.onload = () => {
                  const places = JSON.parse(reader.result)
                    .map(({ name, address: { street, zipCode, city }, type, category, tags }) => ({ name, street, zipCode, city, type, category, tags }))
                  importPlaces({ variables: { places } })
                }
                reader.readAsText(e.target.files[0])
              }}/>
            </a>
            <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(places))}`} download={`${Date.now()}.json`} className="dropdown-item">
              <span className="icon"><i className="ri-upload-2-line"/></span>
              <span className="">Exporter</span>
            </a>
          </>
        )}
      />
      <Table data={data} columns={columns} />
    </section>
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
