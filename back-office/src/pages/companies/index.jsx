import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_COMPANIES } from "../../graphql/queries/companies"
import { DELETE_COMPANY } from "../../graphql/mutations/companies"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Table from "../../components/Table"
import Tabs from "../../components/Tabs"
import Loader from "../../components/Loader"

import { companyTypeNames } from "../../utils/wording"


const CompaniesIndex = ({ history }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const { error, data: { getCompanies: companies } = {}, loading, refetch } = useQuery(GET_COMPANIES, {
    onError: error => console.log(error.message),
  })

  const [deleteCompany] = useMutation(DELETE_COMPANY, { onCompleted: refetch })

  const columns = useMemo(() => [
    {
      Header: "Nom",
      accessor: "name",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <Link to={`/company/${id}`} className="has-text-primary underline">
            {value}
          </Link>
        )
      },
    },
    {
      Header: "Type",
      accessor: ({ type }) => companyTypeNames[type],
    },
    {
      Header: "Utilisateurs",
      accessor: "userCount",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <div className="flex">
            <span className="icon"><i className="ri-group-line"/></span>
            <span>{value}</span>
          </div>
        )
      },
    },
    {
      Header: "Adresse",
      accessor: ({ address: { street, zipCode, city } }) => `${street}, ${zipCode} ${city}`,
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <div className="flex">
            <span className="icon has-text-grey"><i className="ri-map-pin-2-line"/></span>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(value)}`} className="has-text-grey underline" target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          </div>
        )
      },
    },
    {
      Header: "Facturation",
      accessor: ({ stripeInvoices: [ last ] }) => last && new Date(last.created*1000).toLocaleDateString(),
    },
    // {
    //   id: "edit",
    //   Cell ({ cell: { value }, row: { original: { id } } }) {
    //     return (
    //       <Link to={`/company/${id}/update`} className="button has-text-grey is-small">
    //         Modifier
    //       </Link>
    //     )
    //   },
    // },
    {
      id: "delete",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <button onClick={() => deleteCompany({ variables: { id } })} className="button is-white has-text-grey">
            <span className="icon"><i className="ri-delete-bin-line"/></span>
          </button>
        )
      },
    },
  ], [])


  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader />
    )
  }


  const tabs = [
    { title: "Tout", filter: () => true },
    ...Object.entries(companyTypeNames).map(companyType => ({
      title: companyType[1], filter: ({ type }) => type === companyType[0],
    })),
  ]

  const data = companies.filter(tabs[activeTabIndex].filter)

  return (
    <section className="list-page">
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} onTabClick={setActiveTabIndex} action={{ label: "Ajouter une entreprise", url: "/company/create" }} />
      <Table data={data} columns={columns} />
    </section>
  )
}

CompaniesIndex.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default withAuthenticationCheck(CompaniesIndex, ["SUPER_ADMIN"])
