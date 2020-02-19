import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_PLACES } from "../../graphql/queries/places"
import { DELETE_PLACE } from "../../graphql/mutations/places"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Table from "../../components/Table"
import Tabs from "../../components/Tabs"
import Loader from "../../components/Loader"

const categories = {
  FOOD: "Restaurant",
  SHOP: "Boutique",
  ACTIVITY: "Activité",
}

const PlacesIndex = ({ history }) => {
  console.log("render PlacesIndex")
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
    { title: "Nom", key: "name" },
    { title: "Catégorie", key: "categoryName" },
    { title: "Adresse", key: "address", link: address => `https://www.google.com/maps/search/?api=1&query=${encodeURI(address)}`},
    { label: "Delete", handleClick: deletePlace },
    { label: "Edit", handleClick: ({ variables: { id } }) => history.push(`/place/${id}/update`)},
    { label: "Info", handleClick: ({ variables: { id } }) => history.push(`/place/${id}/info`)},
  ]

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
      categoryName: categories[category],
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
