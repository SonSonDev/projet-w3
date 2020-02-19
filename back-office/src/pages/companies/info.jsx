import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_COMPANY } from "../../graphql/queries/companies"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import { CREATE_STRIPE_INVOICE, GET_STRIPE_INVOICES_BY_COMPANY } from "../../graphql/mutations/invoices"

const CompanyInfo = ({ history, location, match: { params: { id } } }) => {
  const { loading, error, data } = useQuery(GET_COMPANY, { variables: { id } })
  const { data: { getStripeInvoicesByCompany = [] } = {} } = useQuery(GET_STRIPE_INVOICES_BY_COMPANY, { variables: { id } })
  const [ createStripeInvoice ] = useMutation(CREATE_STRIPE_INVOICE, {
    onCompleted: () => {
      window.location.reload() // todo
    },
  })

  if (loading || error) return null

  const { getCompany: { name, type, address: { street, zipCode, city }, users, emailDomains, stripeCustomerId } } = data
  const { firstName, lastName, email, phone } = users.find(({ isRepresentative }) => isRepresentative)
  return (
    <div className="clearfix py4">
      <main className="sm-col sm-col-6 px4">
        <section className="mb4">
          <h1 className="h2 bold mr3 mb2">Informations</h1>
          <h3 className="h5 bold">{type}</h3>
          <h2 className="h2 mb1">{name}</h2>
          <span>{street}, {zipCode} {city}</span>
        </section>
        <section className="mb4">
          <div className="flex justify-between">
            <h1 className="h2 bold mb2">Facturation</h1>
            <button className="button" onClick={() => {
              createStripeInvoice({ variables: { stripeCustomerId } })
            }}>Créer une facture</button>
          </div>
          <ul>
            {getStripeInvoicesByCompany.map(({ id, created, hosted_invoice_url, status, total }) => (
              <li className="flex justify-between items-center" key={id}>
                {(total/100).toFixed(2)}€
                <span className="tag mx2">{status}</span>
                {new Date(created*1000).toLocaleDateString()}
                <a className="button is-small ml2" href={hosted_invoice_url} target="_blank" rel="noopener noreferrer">Prévisualiser</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <aside className="sm-col sm-col-6 px4">
        <section className="mb4">
          <h1 className="h2 bold mr3 mb2">Représentant</h1>
          <h2 className="h2 mb1">{firstName} {lastName}</h2>
          <a className="underline">{phone}</a>
        </section>
      </aside>
    </div>
  )
}

export default withAuthenticationCheck(CompanyInfo, ["SUPER_ADMIN", "ADMIN"])