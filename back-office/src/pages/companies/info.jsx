import React from "react"
import PropTypes from "prop-types"
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_COMPANY } from "../../graphql/company"
import { CREATE_STRIPE_INVOICE, GET_STRIPE_INVOICES_BY_COMPANY } from "../../graphql/mutations/invoices"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import SubPage from "../../components/hocs/SubPage"
import { companyTypeNames, stripeInvoiceStatus } from "../../utils/wording"


function CompanyInfo ({ history, location, match: { params: { id } } }) {
  const { loading, error, data } = useQuery(GET_COMPANY, { variables: { id } })

  const { data: { getStripeInvoicesByCompany = [] } = {} } = useQuery(GET_STRIPE_INVOICES_BY_COMPANY, { variables: { id } })

  const [ createStripeInvoice ] = useMutation(CREATE_STRIPE_INVOICE, {
    update (cache, { data: { createStripeInvoice } }) {
      const { getStripeInvoicesByCompany } = cache.readQuery({ query: GET_STRIPE_INVOICES_BY_COMPANY, variables: { id } })
      // console.log([ createStripeInvoice, ...getStripeInvoicesByCompany ])
      cache.writeQuery({
        query: GET_STRIPE_INVOICES_BY_COMPANY, variables: { id },
        data: { getStripeInvoicesByCompany: [ createStripeInvoice, ...getStripeInvoicesByCompany ] },
      })
    },
  })

  if (loading || error) return null

  const { getCompany: { name, type, address: { street, zipCode, city }, users, emailDomains, stripeCustomerId } } = data
  const { firstName, lastName, email, phone } = users.find(({ isRepresentative }) => isRepresentative)
  return (
    <SubPage history={history}>
      <div>
        <main className="sm-col sm-col-6 px4">
          <section className="mb4">
            <h1 className="h2 bold mr3 mb2">Informations</h1>
            <div className="flex items-center mb1">
              <h2 className="h2 mr1">{name}</h2>
              <h3 className="h5 bold tag">{companyTypeNames[type]}</h3>
            </div>
            <span>{street}, {zipCode} {city}</span>
          </section>
          <section className="mb4">
            <div className="flex items-end mb2">
              <h1 className="h2 bold mr1">Facturation</h1>
              {/* <a className="button is-white mr-auto" href={"https://dashboard.stripe.com/test/invoices"} target="_blank" rel="noopener noreferrer">
                <span className="icon"><i className="ri-external-link-line" /></span>
              </a> */}
              <button className="ml-auto button is-primary" onClick={() => {
                createStripeInvoice({ variables: { stripeCustomerId } })
              }}>
                <span className="icon"><i className="ri-add-box-line"/></span>
                <span>Créer une facture</span>
              </button>
            </div>
            <ul>
              {getStripeInvoicesByCompany.map(({ id, created, hosted_invoice_url, status, total }) => (
                <li className="flex items-center" key={id}>
                  <div style={{ width: 100 }}>{(total/100).toFixed(2)}€</div>
                  <span className={[
                    "tag mr-auto",
                    status === "open" && "is-warning is-light",
                    status === "paid" && "is-success is-light",
                    status === "void" && "is-danger is-light",
                  ].join(" ")}>
                    {stripeInvoiceStatus[status]}
                  </span>
                  <span className="has-text-grey">{new Date(created*1000).toLocaleString()}</span>
                  <a className="button has-text-grey is-white ml2" href={hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                    <span className="icon"><i className="ri-external-link-line"/></span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <aside className="sm-col sm-col-6 px4">
          <section className="mb4">
            <h1 className="h2 bold mr3 mb2">Représentant</h1>
            <h2 className="h2 mb1">{firstName} {lastName}</h2>
            <a className="has-text-primary underline">{phone}</a>
          </section>
        </aside>
      </div>
    </SubPage>
  )
}

CompanyInfo.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default withAuthenticationCheck(CompanyInfo, ["SUPER_ADMIN", "ADMIN"])