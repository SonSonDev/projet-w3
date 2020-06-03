import React, { useMemo } from "react"
import { Link } from "react-router-dom"

import { useQuery } from "@apollo/react-hooks"
import { GET_USERS } from "../../graphql/user"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import { roleNames } from "../../utils/wording"

const ClientsIndex = () => {

  const { error, data: { getUsers: clients } = {}, loading } = useQuery(GET_USERS, {
    fetchPolicy: "no-cache",
    onError: error => console.log(error.message),
  })

  const columns = useMemo(() => [
    {
      Header: "Nom",
      accessor: "lastName",
    },
    {
      Header: "Prénom",
      accessor: "firstName",
    },
    {
      Header: "Entreprise",
      accessor: "company",
      Cell ({ cell: { value } }) {
        return value ? (
          <Link to={`/company/${value?.id}`} className="has-text-primary underline bold">
            {value?.name}
          </Link>
        ) : <span>-</span>
      },
    },
    {
      Header: "Role",
      accessor: ({ role }) => roleNames[role],
    },
    {
      Header: "Email",
      accessor: "email",
      Cell ({ cell: { value } }) {
        return (
          <a href={`mailto:${value}`} className="has-text-primary underline bold">
            {value}
          </a>
        )
      },
    },
    // {
    //   id: "delete",
    //   Cell ({ cell: { value }, row: { original: { id } } }) {
    //     return (
    //       <button onClick={() => deleteUser({ variables: { id } })} className="button is-white has-text-grey">
    //         <span className="icon"><i className="ri-delete-bin-line"/></span>
    //       </button>
    //     )
    //   },
    // },
  ], [])


  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  const tabs =  [
    { title: "Aucun", filter: () => true },
    ...Object.entries(roleNames)
      .filter(([ key ]) => key !== "PLACE")
      .map(([ key, label ]) => ({
        title: label, filter: ({ role }) => role === key,
      })),
    // ...data
    // .reduce((acc, cur) => {
    //   if (cur.company && cur.company.name && !acc.includes(cur.company.name)) {
    //     acc.push(cur.company.name)
    //   }
    //   return acc
    // }, [])
    // .map(companyName => ({
    //   title: companyName, filter: ({ company }) => company && company.name === companyName,
    // })),
  ]

  return (
    <Index data={clients.filter(({ role }) => role !== "PLACE")} columns={columns} tabs={tabs}>
      {{
        entity: "utilisateur",
      }}
    </Index>
  )
}

export default withAuthenticationCheck(ClientsIndex, ["SUPER_ADMIN"])
