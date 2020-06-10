import React, { useMemo } from "react"
import { Link } from "react-router-dom"

import { useQuery } from "@apollo/react-hooks"
import { GET_ARTICLES } from "../../graphql/article"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import { themeNames } from "../../utils/wording"

const ArticlesIndex = () => {

  const { error, data: {getArticles: articles} = {}, loading } = useQuery(GET_ARTICLES, {
    onError: error => console.log(error.message),
  })

  const columns = useMemo(() => [
    {
      Header: "Titre de l'article",
      accessor: "title",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <Link to={`/article/${id}/edit`} className="has-text-primary underline bold">
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
      id: "quizQuestion",
      Header: "Question",
      Cell ({ row: { original: { quiz } } }) {
        return quiz.question
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
      <Index data={articles} columns={columns} tabs={tabs}>
        {{
          slug: "article",
          entity: "article", genre: "M",
        }}
      </Index>
    </div>
  )
}

export default withAuthenticationCheck(ArticlesIndex, ["SUPER_ADMIN"])
