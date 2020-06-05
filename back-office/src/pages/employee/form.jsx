import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"

import { GET_USER, GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "../../graphql/user"

import Form from "../../components/Form"
import Loader from "../../components/Loader"


const EmployeeForm = ({ history, match: { params: { id } } }) => {
  const { setToast } = useContext(ToastContext)

  const { data: { getUser = {} } = {}, loading: getUserLoading } = useQuery(GET_USER, { variables: { where: { id } } })

  const form = () => ([
    {
      // label: "Employé",
      children: [
        { key: "firstName", label: "Prénom", type: "T", required: true },
        { key: "lastName", label: "Nom", type: "T", required: true },
        { key: "email", label: "Email", type: "T", required: true, attributes: { type: "email" }},
      ],
    },
  ])

  const [ createUser, { loading: createUserLoading } ] = useMutation(CREATE_USER, {
    update (cache, { data: { createUser } }) {
      const { getUsers } = cache.readQuery({ query: GET_USERS })
      cache.writeQuery({
        query: GET_USERS,
        data: { getUsers: [ ...getUsers, createUser ] },
      })
    },
  })
  const [ updateUser, { loading: updateUserLoading } ] = useMutation(UPDATE_USER, {})

  const [ deleteUser ] = useMutation(DELETE_USER, {
    update (cache, { data: { deleteUser } }) {
      const { getUsers } = cache.readQuery({ query: GET_USERS })
      cache.writeQuery({
        query: GET_USERS,
        data: { getUsers: getUsers.filter(({ id }) => id !== deleteUser.id) },
      })
    },
  })

  const onSubmit = async (data) => {
    const variables = {
      ...data,
      role: "USER",
    }
    try {
      if (id) {
        await updateUser({ variables })
      } else {
        await createUser({ variables: { ...variables, userId: id } })
        history.push("/employees")
      }
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  }

  const onDelete = id && (async () => {
    try {
      await deleteUser({ variables: { where: { id } } })
      history.push("/employees")
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  })

  const defaultValues = id ? getUser : {
    firstName: "",
    lastName: "",
    email: "",
  }

  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          Ajouter un nouvel employé
        </h1>
      </div>
      <div className='p3'>
        {(getUserLoading) ? (
          <Loader />
        ) : (
          <Form
            form={form}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={() => history.goBack()}
            submitting={createUserLoading || updateUserLoading}
          >
            {{defaultValues}}
          </Form>
        )}
      </div>
    </main>
  )
}

EmployeeForm.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default withAuthenticationCheck(EmployeeForm, ["ADMIN"])
