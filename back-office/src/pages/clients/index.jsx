import React, { useState } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "../../graphql/queries/clients"
import { DELETE_USER } from "../../graphql/mutations/clients"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Table from "../../components/Table"
import Tabs from "../../components/Tabs"
import Loader from "../../components/Loader"

const ClientsIndex = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const { error, data: { getUsers: clients } = {}, loading, refetch } = useQuery(GET_USERS, {
    fetchPolicy: "no-cache",
    onError: error => console.log(error.message),
  })

  const [deleteUser] = useMutation(DELETE_USER, { onCompleted: refetch })

  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  const columns = [
    { title: "Prénom", key: "firstName" },
    { title: "Nom", key: "lastName" },
    { title: "Email", key: "email" },
    { title: "Entreprise", key: "company" },
    { title: "Role", key: "role" },
    { label: "Delete", handleClick: deleteUser },
    { label: "Info", handleClick: () => console.log("Info") },
  ]

  let data = clients
    .map(({ company, ...client }) => ({
      ...client,
      company: company ? company.name : "",
    }))

  const tabs =  [
    { title: "Tout", filter: () => true },
    ...data
      .reduce((acc, cur) => {
        if (cur.company && !acc.includes(cur.company)) {
          acc.push(cur.company)
        }
        return acc
      }, [])
      .map(companyName => ({
        title: companyName, filter: ({ company }) => company === companyName,
      })),
  ]

  data = data.filter(tabs[activeTabIndex].filter)

  return (
    <section className="list-page">
      <Tabs tabs={tabs} activeTabIndex={activeTabIndex} onTabClick={setActiveTabIndex}/>
      <div className="padding16">
        <Table data={data} columns={columns} />
      </div>
    </section>
  )
}

export default withAuthenticationCheck(ClientsIndex, ["SUPER_ADMIN"])
