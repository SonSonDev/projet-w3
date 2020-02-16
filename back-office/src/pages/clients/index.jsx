import React, { useState } from 'react'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USERS } from '../../graphql/queries/clients'
import { DELETE_USER } from '../../graphql/mutations/clients'

import withAuthenticationCheck from '../../components/hocs/withAuthenticationCheck'
import Table from '../../components/Table'
import Tabs from '../../components/Tabs'
import Loader from '../../components/Loader'

const ClientsIndex = () => {

  const [clients, setClients] = useState([])
  
  const { error, loading } = useQuery(GET_USERS, {
    variables: { role: 'ADMIN' },
    fetchPolicy: 'no-cache',
    onCompleted: ({ getUsers }) => setClients(getUsers),
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
    { title: 'Role', key: 'role' },
    { label: 'Delete', handleClick: deleteUser },
    { label: 'Edit', handleClick: () => console.log('Edit') },
    { label: 'Info', handleClick: () => console.log('Info') },
  ]

  return (
    <section className="list-page">
      <Tabs tabs={[{ title: 'All clients', filter: () => true }]}/>
      <div className="padding16">
        <Table data={clients} columns={columns} /> 
      </div>
    </section>
  )
}

export default withAuthenticationCheck(ClientsIndex, ['SUPER_ADMIN'])
