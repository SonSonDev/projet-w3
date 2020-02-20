import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_PLACES } from "../../graphql/queries/places"
import { DELETE_PLACE } from "../../graphql/mutations/places"

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

  const [deletePlace] = useMutation(DELETE_PLACE, { onCompleted: refetch })

  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  const columns = [
    { title: "Nom", key: "name", link: id => `/place/${id}`},
    { title: "Catégorie", key: "categoryName" },
    { title: "Adresse", key: "address", externalLink: address => `https://www.google.com/maps/search/?api=1&query=${encodeURI(address)}`},
    (userData.role === "SUPER_ADMIN") && { label: "Delete", handleClick: deletePlace },
    { label: "Edit", handleClick: ({ variables: { id } }) => history.push(`/place/${id}/update`)},
  ].filter(Boolean)

  const tabs = [
    { title: "Tout", filter: () => true },
    { title: "Boutiques", filter: ({ category }) => category === "SHOP" },
    { title: "Activités", filter: ({ category }) => category === "ACTIVITY" },
    { title: "Restaurants", filter: ({ category }) => category === "FOOD" },
  ]

  const data = places
    .map(({ address: { street, zipCode, city }, category, ...place }) => ({
      ...place,
      address: `${street} ${zipCode} ${city}`,
      category,
      categoryName: categoryNames[category],
    }))
    .filter(tabs[activeTabIndex].filter)

  return (
    <section className="list-page">
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} onTabClick={setActiveTabIndex} action={{label: "Ajouter une adresse", url: "/place/create"}}/>
      <div className="padding16">
        <Table data={data} columns={columns} />
      </div>
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
