import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS } from '../../graphql/queries/employees'
import { DELETE_USER } from '../../graphql/mutations/clients'

import withAuthenticationCheck from '../../components/hocs/withAuthenticationCheck'
import Table from '../../components/Table'
import Tabs from '../../components/Tabs'
import Loader from '../../components/Loader'

const EmployeesIndex = () => {
  console.log('EmployeesIndex')
  const [users, setUsers] = useState([])

  const { error, loading } = useQuery(GET_USERS, {
    variables: { role: 'USER' },
    onCompleted: ({ getUsers }) => setUsers(getUsers),
    onError: error => console.log(error.message),
  })

  const [deleteUser] = useMutation(DELETE_USER, {
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
    { title: 'Prénom', key: 'firstName' },
    { title: 'Nom', key: 'lastName' },
    { title: 'Email', key: 'email' },
    { label: 'Delete', handleClick: deleteUser },
    { label: 'Edit', handleClick: () => console.log('Edit') },
    { label: 'Info', handleClick: () => console.log('Info') },
  ]

  return (
    <section className="list-page">
      <Tabs tabs={[{ title: 'All Employee', filter: () => true }]} action={{label:'Ajouter un employé', url: '/employee/create'}}/>
      <div className="padding16">
        <Table data={users} columns={columns} />
      </div>
    </section>
  )
}

export default withAuthenticationCheck(EmployeesIndex, ['ADMIN', 'USER'])
