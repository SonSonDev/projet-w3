import React, { useState, useMemo } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "../../graphql/queries/clients"
import { DELETE_USER } from "../../graphql/mutations/clients"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import { roleNames } from "../../utils/wording"

const ClientsIndex = () => {

  const { error, data: { getUsers: clients } = {}, loading, refetch } = useQuery(GET_USERS, {
    fetchPolicy: "no-cache",
    onError: error => console.log(error.message),
  })

  const [deleteUser] = useMutation(DELETE_USER, { onCompleted: refetch })

  const columns = useMemo(() => [
    {
      Header: "Prénom",
      accessor: "firstName",
    },
    {
      Header: "Nom",
      accessor: "lastName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Entreprise",
      accessor: ({ company }) => company && company.name,
    },
    {
      Header: "Role",
      accessor: ({ role }) => roleNames[role],
    },
    {
      id: "delete",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <button onClick={() => deleteUser({ variables: { id } })} className="button is-white has-text-grey">
            <span className="icon"><i className="ri-delete-bin-line"/></span>
          </button>
        )
      },
    },
  ], [])


  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  let data = clients

  const tabs =  [
    { title: "Aucun", filter: () => true },
    ...data
      .reduce((acc, cur) => {
        if (cur.company && cur.company.name && !acc.includes(cur.company.name)) {
          acc.push(cur.company.name)
        }
        return acc
      }, [])
      .map(companyName => ({
        title: companyName, filter: ({ company }) => company && company.name === companyName,
      })),
  ]

  return (
    <Index data={clients} columns={columns} tabs={tabs}>
      {{
        entity: "utilisateur",
      }}
    </Index>
  )
}

export default withAuthenticationCheck(ClientsIndex, ["SUPER_ADMIN"])
