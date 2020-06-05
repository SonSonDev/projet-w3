import React, { useContext, useState } from "react"
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
  const [ invoiceModal, setInvoiceModal ] = useState(false)

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

  const [ createStripeInvoice, { loading: createStripeInvoiceLoading } ] = useMutation(CREATE_STRIPE_INVOICE, {
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
      <div className="px3 py2 flex justify-between items-center border-bottom">
        <h1 className="is-size-3 bold my05">
          Fiche entreprise
        </h1>
        <Link className="button is-primary bold" to={`/company/${id}/edit`}>Modifier l&apos;entreprise</Link>
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
                <h3 className="bold">Facturation</h3>
              </div>
              <ul className='mb2'>
                {getStripeInvoicesByCompany.map(({ id, created, hosted_invoice_url, status, total }) => status !== "void" && (
                  <li className="flex items-center my1" key={id}>
                    <div style={{ width: 80 }}>
                      <span className='is-size-6 bold has-text-grey'>
                        {(total/100).toFixed(2)}€
                      </span>
                    </div>
                    <div style={{ width: 160 }}>
                      <span className="is-size-7 has-text-grey">{new Date(created*1000).toLocaleString()}</span>
                    </div>
                    <a className={[
                      "tag",
                      status === "open" && "is-light",
                      status === "paid" && "is-primary is-light",
                      // status === "void" && "is-light",
                    ].join(" ")} href={hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                      {stripeInvoiceStatus[status]}
                    </a>
                    {/* <a className="button has-text-grey is-white ml1" href={hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                      <span className="icon"><i className="ri-external-link-line"/></span>
                    </a> */}
                  </li>
                ))}
              </ul>
              <button className="ml-auto button is-primary bold" onClick={() => setInvoiceModal(true)}>
                <span>Envoyer une facture</span>
              </button>
              <div className={[ "modal", invoiceModal && "is-active" ].join(" ")}>
                <div className="modal-background" onClick={() => setInvoiceModal(false)} />
                <div className="modal-card">
                  <header className="modal-card-head border-none pt3 px3">
                    <h4>
                      Confirmez-vous l’envoi d’une facture à l’établissement <span className='italic'>{getCompany?.name}</span> du montant de <span className='italic'>25.00€</span> ?
                    </h4>
                  </header>
                  <footer className="modal-card-foot border-none justify-end">
                    <button onClick={() => setInvoiceModal(false)} className="button has-text-grey-dark bold" type="button">Annuler</button>
                    <button onClick={async () => {
                      try {
                        await createStripeInvoice({ variables: { stripeCustomerId: getCompany?.stripeCustomerId } })
                        setInvoiceModal(false)
                        setToast({ type: "success" })
                      } catch (error) {
                        setToast({ type: "danger" })
                        console.log(error, { ...error })
                      }
                    }} className={[ "button is-danger bold", createStripeInvoiceLoading && "is-loading" ].join(" ")} type="button">Envoyer</button>
                  </footer>
                </div>
                {/* <button className="modal-close is-large" aria-label="close" type="button" /> */}
              </div>
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