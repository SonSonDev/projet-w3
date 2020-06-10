import React, { useMemo } from "react"
import { Link } from "react-router-dom"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_CHALLENGES, DELETE_CHALLENGE } from "../../graphql/challenge"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import { themeNames } from "../../utils/wording"

const ChallengesIndex = () => {

  const { error, data: {getChallenges: challenges} = {}, loading, refetch } = useQuery(GET_CHALLENGES, {
    onError: error => console.log(error.message),
  })
  const [deleteChallenge] = useMutation(DELETE_CHALLENGE, { onCompleted: refetch })

  const columns = useMemo(() => [
    {
      Header: "Nom du défi",
      accessor: "name",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <Link to={`/challenge/${id}/edit`} className="has-text-primary underline bold">
            {value}
          </Link>
        )
      },
    },
    {
      Header: "theme",
      accessor: "theme",
      Cell ({ cell: { value }}) {
        return themeNames[value]
      },
    },
    {
      Header: "Récompense",
      accessor: "value",
    },
    {
      id: "delete",
      Cell ({ row: { original: { id } } }) {
        return (
          <button onClick={() => deleteChallenge({ variables: { id } })} className="button is-white has-text-grey">
            <span className="icon"><i className="ri-delete-bin-line"/></span>
          </button>
        )
      },
    },
  ], [])

  const tabs = [
    { title: "Aucun", filter: () => true },
    ...Object.entries(themeNames).map(t => ({
      title: t[1], filter: ({ theme }) => theme === t[0],
    })),
  ]

  if (error) return <div>{error.message}</div>

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="">
      <Index data={challenges} columns={columns} tabs={tabs}>
        {{
          slug: "challenge",
          entity: "défi", genre: "M",
        }}
      </Index>
    </div>
  )
}

export default withAuthenticationCheck(ChallengesIndex, ["SUPER_ADMIN"])
