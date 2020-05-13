import React, { useMemo, useContext } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "../../graphql/queries/employees"
import { DELETE_USER } from "../../graphql/mutations/clients"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Table from "../../components/Table"
import Tabs from "../../components/Tabs"
import Loader from "../../components/Loader"

import UserDataContext from "../../utils/UserDataContext"

const EmployeesIndex = () => {
  console.log("EmployeesIndex")
  const userData = useContext(UserDataContext)

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

  let textArea

  const shareSignupLink = (userData.role === "ADMIN" && userData.company) && `${window.location.origin}/company/${userData.company.id}/signup`
  const copyCodeToClipboard = () => {
    const el = textArea
    el.select()
    document.execCommand("copy")
  }

  return (
    <section className="list-page">
      { shareSignupLink && (
        <div className="share-signup">
          <p>Lien de partage: <span className="share-signup__link">{shareSignupLink}</span></p>
          <button onClick={() => copyCodeToClipboard()}><i className="ri-clipboard-line" /></button>
          <textarea readOnly ref={textarea => textArea = textarea} value={shareSignupLink}/>
        </div>
      )}
      <Tabs tabs={[{ title: "Tous les employés", filter: () => true }]} action={{label: "Ajouter un employé", url: "/employee/create"}}/>
      <Table data={users} columns={columns} />
    </section>
  )
}

export default withAuthenticationCheck(EmployeesIndex, ["ADMIN", "USER"])
