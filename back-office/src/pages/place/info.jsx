import React from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"

import { GET_PLACE } from "../../graphql/queries/places"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

function PlaceInfo ({ match: { params: { id } } }) {

  const { loading, error, data: { getPlace = {} } = {} } = useQuery(GET_PLACE, { variables: { id } })

  if (loading || error) return null

  const { name, category, address: { street, zipCode, city }, keywords  } = getPlace

  return (
    <div className="clearfix py4">
      <main className="sm-col sm-col-6 px4">
        <section className="mb4">
          <h1 className="h2 bold mr3 mb2">Informations</h1>
          <h3 className="h5 bold">{category}</h3>
          <h2 className="h2 mb1">{name}</h2>
          <span>{street}, {zipCode} {city}</span>
        </section>
        <section className="mb4">
          <div className="flex">
            <h1 className="h2 bold mr1 mb2">Tags</h1>
          </div>
          <ul>
            {keywords.map(tag => (
              <span className="tag is-medium mr1" key={tag}>{tag}</span>
            ))}
          </ul>
        </section>
      </main>
      <aside className="sm-col sm-col-6 px4">
        <section className="mb4">
          <h1 className="h2 bold mr3 mb2">Représentant</h1>
          {/* <h2 className="h2 mb1">{firstName} {lastName}</h2> */}
          {/* <a className="underline">{phone}</a> */}
        </section>
      </aside>
    </div>
  )
}

export default withAuthenticationCheck(PlaceInfo, ["SUPER_ADMIN", "ADMIN", "USER"])
