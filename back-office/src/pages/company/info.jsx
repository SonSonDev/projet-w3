import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"
import { GET_COMPANIES, GET_COMPANY, DELETE_COMPANY } from "../../graphql/company"
import { CREATE_STRIPE_INVOICE, GET_STRIPE_INVOICES_BY_COMPANY } from "../../graphql/invoices"

import Form from "../../components/Form"
import Loader from "../../components/Loader"

import { companyTypeNames, stripeInvoiceStatus } from "../../utils/wording"
import { Link } from "react-router-dom"

function CompanyForm ({ history,  match: { params: { id } } }) {

  const { setToast } = useContext(ToastContext)

  const { data: { getCompany = {} } = {}, loading: getCompanyLoading } = useQuery(GET_COMPANY, { variables: { id } })

  const [ deleteCompany ] = useMutation(DELETE_COMPANY, {
    update (cache, { data: { deleteCompany } }) {
      const { getCompanies } = cache.readQuery({ query: GET_COMPANIES })
      cache.writeQuery({
        query: GET_COMPANIES,
        data: { getCompanies: getCompanies.filter(({ id }) => id !== deleteCompany.id) },
      })
    },
  })

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

  const form = () => ([
    {
      label: "Entreprise",
      children: [
        { key: "companyName", label: "Nom de l’établissement", type: "T", disabled: true },
        { key: "companyType", label: "Type d'entreprise", type: "R", options: Object.entries(companyTypeNames).map(([ value, label ]) => ({ value, label })).filter(e => e.value === getCompany.type), disabled: true },
        { key: "streetCompany", label: "Adresse", type: "T", disabled: true },
        { className: "is-grouped", children: [
          { key: "zipCodeCompany", label: "Code postal", type: "T", disabled: true, className: "control is-expanded" },
          { key: "cityCompany", label: "Ville", type: "T", disabled: true, className: "control is-expanded" },
        ] },
        { key: "emailDomains", label: "Noms de domaine d'email", type: "MT", disabled: true,
          params: {
            textBefore: "@",
          },
        },
      ],
    },
    {
      label: "Représentant",
      children: [
        { key: "firstNameUser", label: "Prénom", type: "T", disabled: true },
        { key: "lastNameUser", label: "Nom", type: "T", disabled: true },
        { key: "emailUser", label: "Adresse email", type: "T", disabled: true },
        { key: "phoneUser", label: "Téléphone", type: "T", disabled: true },
      ],
    },
  ])

  const onDelete = (async () => {
    try {
      await deleteCompany({ variables: { id }})
      history.push("/companies")
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  })

  const defaultValues = {
    companyName: getCompany?.name,
    companyType: getCompany?.type,
    streetCompany: getCompany?.address?.street,
    zipCodeCompany: getCompany?.address?.zipCode,
    cityCompany: getCompany?.address?.city,
    firstNameUser: getCompany?.representativeUser?.firstName,
    lastNameUser: getCompany?.representativeUser?.lastName,
    emailUser: getCompany?.representativeUser?.email,
    phoneUser: getCompany?.representativeUser?.phone,
    emailDomains: getCompany?.emailDomains?.map(domain => `@${domain}`),
  }

  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          {"Fiche entreprise"}
          <Link className="button ml3" to={`/company/${id}/edit`}>Modifier l&apos;entreprise</Link>
        </h1>
      </div>
      <div className='p3 columns'>
        {(getCompanyLoading) ? (
          <Loader />
        ) : (
          <>
            <Form
              classNames={{form: "column is-5", content: " "}}
              form={form}
              onDelete={onDelete}>
              {{ defaultValues }}
            </Form>
            <div className="column is-offset-1 is-6">
              <div className="flex items-end mb2">
                <h3 className="h3 bold mr1">Facturation</h3>
                <button className="ml-auto button is-primary" onClick={() => {
                  createStripeInvoice({ variables: { stripeCustomerId: getCompany?.stripeCustomerId } })
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
            </div>
          </>
        )}
      </div>
    </main>
  )
}

CompanyForm.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default withAuthenticationCheck(CompanyForm, ["SUPER_ADMIN"])