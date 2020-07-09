import React, { useMemo } from "react"
import { Link } from "react-router-dom"

import { useQuery } from "@apollo/react-hooks"
import { GET_REWARDS } from "../../graphql/reward"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import { themeNames, rewardTypes } from "../../utils/wording"

const RewardsIndex = () => {

  const { error, data: {getRewards: rewards} = {}, loading } = useQuery(GET_REWARDS, {
    onError: error => console.log(error.message),
  })

  const columns = useMemo(() => [
    {
      Header: "Titre de l'article",
      accessor: "article.title",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <Link to={`/reward/${id}/edit`} className="has-text-primary underline bold">
            {value}
          </Link>
        )
      },
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ cell: { value }}) => rewardTypes[value],
    },
    {
      Header: "Thème",
      accessor: "article.theme",
      Cell: ({ cell: { value }}) => themeNames[value],
    },
    {
      Header: "Valeur",
      accessor: "value",
      Cell: ({ cell: { value }}) => value,
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
      <Index data={rewards} columns={columns} tabs={tabs}>
        {{
          slug: "reward",
          entity: "récompense", genre: "F",
        }}
      </Index>
    </div>
  )
}

export default withAuthenticationCheck(RewardsIndex, ["SUPER_ADMIN"])
