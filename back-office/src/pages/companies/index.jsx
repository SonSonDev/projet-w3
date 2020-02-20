import React, { useState } from "react"
import PropTypes from "prop-types"

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

  const { error, data: {getCompanies: companies} = {}, loading, refetch } = useQuery(GET_COMPANIES, {
    onError: error => console.log(error.message),
  })

  const [deleteCompany] = useMutation(DELETE_COMPANY, { onCompleted: refetch })

  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  const columns = [
    { title: "Nom", key: "name" },
    { title: "Type", key: "typeName" },
    { title: "Adresse", key: "address", link: address => `https://www.google.com/maps/search/?api=1&query=${encodeURI(address)}` },
    { label: "Delete", handleClick: deleteCompany },
    { label: "Edit", handleClick: ({ variables: { id } }) => history.push(`/company/${id}/update`) },
    { label: "Info", handleClick: ({ variables: { id } }) => history.push(`/company/${id}`) },
  ]

  const tabs = [
    { title: "Tout", filter: () => true },
    ...Object.entries(companyTypeNames).map(companyType => ({
      title: companyType[1], filter: ({ type }) => type === companyType[0],
    })),
  ]

  const data = companies
    .map(({ address: { street, zipCode, city }, type, ...companies }) => ({
      ...companies,
      type,
      typeName: companyTypeNames[type],
      address: `${street} ${zipCode} ${city}`,
    }))
    .filter(tabs[activeTabIndex].filter)

  return (
    <section className="list-page">
      <Tabs tabs={tabs}  activeTabIndex={activeTabIndex} onTabClick={setActiveTabIndex} action={{label: "Ajouter une entreprise", url: "/company/create"}}/>
      <div className="padding16">
        <Table data={data} columns={columns} />
      </div>
    </section>
  )
}

CompaniesIndex.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default withAuthenticationCheck(CompaniesIndex, ["SUPER_ADMIN"])
