import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_COMPANY } from "../../graphql/queries/companies"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import { CREATE_STRIPE_INVOICE } from "../../graphql/mutations/invoices"

const CompanyInfo = ({ match: { params: { id } } }) => {
  const { loading, error, data } = useQuery(GET_COMPANY, { variables: { id } })
  const [ createStripeInvoice ] = useMutation(CREATE_STRIPE_INVOICE)

  if (loading || error) return null

  const { getCompany: { name, type, address: { street, zipCode, city }, users, emailDomains, stripeCustomerId } } = data
  const { firstName, lastName, email, phone } = users.find(({ isRepresentative }) => isRepresentative)

  return (
    <div className="clearfix p4">
      <main className="sm-col sm-col-6">
        <section className="mb4">
          <h1 className="h2 bold mb2">Informations</h1>
          <h3 className="h5 bold">{type}</h3>
          <h2 className="h2 mb1">{name}</h2>
          <span>{street}, {zipCode} {city}</span>
        </section>
        <section className="mb4">
          <h1 className="h2 bold mb2">Facturation</h1>
          <button className="button" onClick={() => {
            createStripeInvoice({ variables: { stripeCustomerId } })
          }}>Créer une facture</button>
        </section>
      </main>
      <aside className="sm-col sm-col-6">
        <section className="mb4">
          <h1 className="h2 bold mb2">Représentant</h1>
          <h2 className="h2 mb1">{firstName} {lastName}</h2>
          <a className="underline">{phone}</a>
        </section>
      </aside>
    </div>
  )
}

export default withAuthenticationCheck(CompanyInfo, ["SUPER_ADMIN", "ADMIN"])