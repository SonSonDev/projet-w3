import React, { useState } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_COMPANIES } from "../../graphql/queries/companies"
import { DELETE_COMPANY } from "../../graphql/mutations/companies"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Table from "../../components/Table"
import Tabs from "../../components/Tabs"
import Loader from "../../components/Loader"

const CompaniesIndex = () => {
  const [companies, setCompanies] = useState([])

  const { error, loading } = useQuery(GET_COMPANIES, {
    onCompleted: ({ getCompanies }) => setCompanies(getCompanies),
    onError: error => console.log(error.message),
  })

  const [deleteCompany] = useMutation(DELETE_COMPANY, {
    onCompleted: data => {
      window.location.reload()
      console.log(data)
    },
  })

  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  const columns = [
    { title: "Nom", key: "name" },
    { title: "Type", key: "type" },
    { title: "Adresse", key: "address", link: address => `https://www.google.com/maps/search/?api=1&query=${encodeURI(address)}` },
    { label: "Delete", handleClick: deleteCompany },
    { label: "Edit", handleClick: () => console.log("Edit") },
    { label: "Info", handleClick: () => console.log("Info") },
  ]
  const data = companies
    .map(({ address: { street, zipCode, city }, ...companies }) => ({
      ...companies,
      address: `${street} ${zipCode} ${city}`,
    }))

  return (
    <section className="list-page">
      <Tabs tabs={[{ title: "All company", filter: () => true }]} action={{label: "Ajouter une entreprise", url: "/company/create"}}/>
      <div className="padding16">
        <Table data={data} columns={columns} />
      </div>
    </section>
  )
}

export default withAuthenticationCheck(CompaniesIndex, ["SUPER_ADMIN"])
