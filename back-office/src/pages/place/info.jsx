import React from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"

import { GET_PLACE } from "../../graphql/queries/places"
import { categories } from "../../utils/wording"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

function PlaceInfo ({ match: { params: { id } } }) {

  const { loading, error, data: { getPlace = {} } = {} } = useQuery(GET_PLACE, { variables: { id } })

  if (loading || error) return null

  const { name, category, address: { street, zipCode, city }, keywords, tags } = getPlace

  return (
    <div className="clearfix py4">
      <main className="sm-col sm-col-6 px4">
        <section className="mb4">
          <h1 className="h2 bold mr3 mb2">Informations</h1>
          <h3 className="h5 bold">{categories[category]}</h3>
          <h2 className="h2 mb1">{name}</h2>
          <span>{street}, {zipCode} {city}</span>
        </section>
        <section className="mb4">
          <div className="flex">
            <h1 className="h2 bold mr1 mb2">Tags</h1>
          </div>
          {Object.keys(tags.reduce((acc, { type }) => ({ ...acc, [type]: true }), {})).map(type => (
            <div className="mb2" key={type}>
              <h3 className="mb1">{type}</h3>
              <ul>
                {tags.filter(t => t.type === type).map(({ id, name }) => (
                  <span className="tag is-medium mr1 mb1" key={id}>{name}</span>
                ))}
              </ul>
            </div>
          ))}
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
