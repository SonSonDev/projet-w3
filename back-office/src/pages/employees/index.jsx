import React, { useMemo } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "../../graphql/queries/employees"
import { DELETE_USER } from "../../graphql/mutations/clients"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Table from "../../components/Table"
import Tabs from "../../components/Tabs"
import Loader from "../../components/Loader"

const EmployeesIndex = () => {
  console.log("EmployeesIndex")

  const { error, data: {getUsers: users} = {}, loading, refetch } = useQuery(GET_USERS, {
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

  return (
    <section className="list-page">
      <Tabs tabs={[{ title: "Tous les employés", filter: () => true }]} action={{label: "Ajouter un employé", url: "/employee/create"}}/>
      <Table data={users} columns={columns} />
    </section>
  )
}

export default withAuthenticationCheck(EmployeesIndex, ["ADMIN", "USER"])
