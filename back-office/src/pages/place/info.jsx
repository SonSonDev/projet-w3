import React from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/react-hooks"

import { GET_PLACE } from "../../graphql/place"
import { categoryNames } from "../../utils/wording"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import SubPage from "../../components/hocs/SubPage"

function PlaceInfo ({ history, match: { params: { id } } }) {

  const { loading, error, data: { getPlace = {} } = {} } = useQuery(GET_PLACE, { variables: { id } })

  if (loading || error) return console.log({ loading, error }) || null

  const { name, category, address: { street, zipCode, city }, tags } = getPlace

  return (
    <SubPage history={history}>
      <div>
        <main className="sm-col sm-col-6 px4">
          <section className="mb4">
            <h1 className="h2 bold mr3 mb2">Informations</h1>
            <div className="flex items-center mb1">
              <h2 className="h2 mr1">{name}</h2>
              <h3 className="h5 bold tag">{categoryNames[category]}</h3>
            </div>
            <span>{street}, {zipCode} {city}</span>
          </section>
          <section className="mb4">
            <div className="flex">
              <h1 className="h2 bold mr1 mb2">Tags</h1>
            </div>
            <ul>
              {tags.map(({ id, label }) => (
                <span className="tag is-medium mr1 mb1" key={id}>{label}</span>
              ))}
            </ul>
          </section>
        </main>
        <aside className="sm-col sm-col-6 px4">
          <section className="mb4">
            <h1 className="h2 bold mr3 mb2">Représentant</h1>
            <h2 className="h2 mb1">{"Clément"} {"Mopoire"}</h2>
            <a className="has-text-primary underline">{"0698821222"}</a>
          </section>
        </aside>
      </div>
    </SubPage>
  )
}

PlaceInfo.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default withAuthenticationCheck(PlaceInfo, ["SUPER_ADMIN", "ADMIN", "USER"])
