import React, { useMemo, useContext } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_CHALLENGES } from "../../graphql/queries/challenge"
import { DELETE_CHALLENGE } from "../../graphql/mutations/challenge"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import UserDataContext from "../../utils/UserDataContext"

const ChallengesIndex = () => {

  const userData = useContext(UserDataContext)

  const { error, data: {getChallenges: challenges} = {}, loading, refetch } = useQuery(GET_CHALLENGES, {
    onError: error => console.log(error.message),
  })
  const [deleteChallenge] = useMutation(DELETE_CHALLENGE, { onCompleted: refetch })

  const columns = useMemo(() => [
    {
      Header: "Nom du défi",
      accessor: "name",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Valeur",
      accessor: "value",
    },
    {
      id: "delete",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <button onClick={() => deleteChallenge({ variables: { id } })} className="button is-white has-text-grey">
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
    <div className="">
      <Index data={challenges} columns={columns} tabs={[{ title: "Aucun", filter: () => true }]}>
        {{
          slug: "challenge",
          entity: "défi", genre: "M",
        }}
      </Index>
    </div>
  )
}

export default withAuthenticationCheck(ChallengesIndex, ["SUPER_ADMIN"])
