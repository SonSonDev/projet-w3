import React, { useMemo, useContext } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_USERS, DELETE_USER, CREATE_USERS } from "../../graphql/user"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import UserDataContext from "../../utils/UserDataContext"

const EmployeesIndex = () => {

  const userData = useContext(UserDataContext)

  const { error, data: {getUsers: users} = {}, loading, refetch } = useQuery(GET_USERS, {
    onError: error => console.log(error.message),
  })

  const [ importUsers ] = useMutation(CREATE_USERS, {
    update (cache, { data: { createUsers } }) {
      const { getUsers } = cache.readQuery({ query: GET_USERS })
      cache.writeQuery({
        query: GET_USERS,
        data: { getUsers: [ ...createUsers, ...getUsers ] },
      })
    },
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
    <div className="">
      { shareSignupLink && (
        <div className="share-signup border-bottom">
          <p>Lien de partage: <span className="share-signup__link">{shareSignupLink}</span></p>
          <button onClick={() => copyCodeToClipboard()}><i className="ri-clipboard-line" /></button>
          <textarea readOnly ref={textarea => textArea = textarea} value={shareSignupLink}/>
        </div>
      )}
      <Index data={users} columns={columns} tabs={[{ title: "Aucun", filter: () => true }]}>
        {{
          slug: "employee",
          entity: "employé", genre: "M",
          onImport: ({ data: users }) => importUsers({ variables: { users: users.map(user => ({ ...user, role: "USER" })) } }),
          onExport: ({ firstName, lastName, email }) => ({ firstName, lastName, email }),
        }}
      </Index>
    </div>
  )
}

export default withAuthenticationCheck(EmployeesIndex, ["ADMIN", "USER"])
