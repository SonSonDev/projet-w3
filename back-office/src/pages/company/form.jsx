import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"
import { CREATE_COMPANY, GET_COMPANIES, GET_COMPANY, UPDATE_COMPANY, DELETE_COMPANY } from "../../graphql/company"

import Form from "../../components/Form"
import Loader from "../../components/Loader"

import { companyTypeNames } from "../../utils/wording"

const autofill = on => on && ({
  companyName: `Company n°${Math.random()*10e17}`,
  companyType: "SCHOOL",
  streetCompany: "sdfgh jgjhkg",
  zipCodeCompany: "93000",
  cityCompany: "Bobi",
  firstNameUser: "Vin",
  lastNameUser: "P",
  emailUser: `heycuson+${Math.random()*10e17}@gmail.com`,
  phoneUser: "0123456789",
  emailDomains: [],
})

function CompanyForm ({ history,  match: { params: { id } } }) {

  const { setToast } = useContext(ToastContext)

  const { data: { getCompany = {} } = {}, loading: getCompanyLoading } = useQuery(GET_COMPANY, { variables: { where: { id } } })

  const [ createCompany, { loading: createCompanyLoading } ] = useMutation(CREATE_COMPANY, {
    update (cache, { data: { createCompany } }) {
      const { getCompanies } = cache.readQuery({ query: GET_COMPANIES })
      cache.writeQuery({
        query: GET_COMPANIES,
        data: { getCompanies: [ ...getCompanies, createCompany ] },
      })
    },
  })

  const [ updateCompany, { loading: updateCompanyLoading } ] = useMutation(UPDATE_COMPANY)

  const [ deleteCompany, { loading: deleteCompanyLoading } ] = useMutation(DELETE_COMPANY, {
    update (cache, { data: { deleteCompany } }) {
      const { getCompanies } = cache.readQuery({ query: GET_COMPANIES })
      cache.writeQuery({
        query: GET_COMPANIES,
        data: { getCompanies: getCompanies.filter(({ id }) => id !== deleteCompany.id) },
      })
    },
  })

  const form = () => ([
    {
      label: "Entreprise",
      children: [
        { key: "companyName", label: "Nom de l’établissement", type: "T", required: true },
        { key: "companyType", label: "Type d'entreprise", type: "R", options: Object.entries(companyTypeNames).map(([ value, label ]) => ({ value, label })), required: true },
        { key: "streetCompany", label: "Adresse", type: "T", required: true },
        { className: "is-grouped", children: [
          { key: "zipCodeCompany", label: "Code postal", type: "T", required: true, className: "control is-expanded" },
          { key: "cityCompany", label: "Ville", type: "T", required: true, className: "control is-expanded" },
        ] },
        { key: "emailDomains", label: "Noms de domaine d'email", type: "MT", required: true,
          params: {
            textBefore: "@",
          },
        },
      ],
    },
    {
      label: "Représentant",
      children: [
        { key: "firstNameUser", label: "Prénom", type: "T", required: true },
        { key: "lastNameUser", label: "Nom", type: "T", required: true },
        { key: "emailUser", label: "Adresse email", type: "T", required: true },
        { key: "phoneUser", label: "Téléphone", type: "T", required: true },
      ],
    },
  ])

  const onSubmit = async (data) => {
    data.emailDomains = data.emailDomains || []
    data.isRepresentative = true
    data.roleUser = "ADMIN"
    try {
      if (id) {
        await updateCompany({ variables: { ...data, id } })
      } else {
        await createCompany({ variables: { ...data } })
        history.push("/companies")
      }
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  }
  const onDelete = id && (async () => {
    try {
      await deleteCompany({ variables: { id }})
      history.push("/companies")
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  })

  const defaultValues = id ? {
    ...getCompany,
  } : autofill(true)

  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          {id ? "Modifier une entreprise" : "Ajouter une nouvelle entreprise"}
        </h1>
      </div>
      <div className='p3'>
        {(getCompanyLoading) ? (
          <Loader />
        ) : (
          <Form
            form={form}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={() => history.goBack()}
            submitting={createCompanyLoading || updateCompanyLoading || deleteCompanyLoading}
          >
            {{ defaultValues }}
          </Form>
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