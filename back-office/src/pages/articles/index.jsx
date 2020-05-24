import React, { useMemo, useContext } from "react"

import { useQuery, useMutation } from "@apollo/react-hooks"
import { GET_ARTICLES } from "../../graphql/queries/article"
import { DELETE_ARTICLE } from "../../graphql/mutations/article"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import Index from "../../components/Index"
import Loader from "../../components/Loader"

import UserDataContext from "../../utils/UserDataContext"

const ArticlesIndex = () => {

  const userData = useContext(UserDataContext)

  const { error, data: {getArticles: articles} = {}, loading, refetch } = useQuery(GET_ARTICLES, {
    onError: error => console.log(error.message),
  })
  const [deleteArticle] = useMutation(DELETE_ARTICLE, { onCompleted: refetch })

  const columns = useMemo(() => [
    {
      Header: "Titre de l'article",
      accessor: "title",
    },
    {
      id: "quizQuestion",
      Header: "Question",
      Cell ({ cell, row: { original: { quiz } } }) {
        return (
          <>
            {quiz.question}
          </>
        )
      },
    },
    {
      id: "delete",
      Cell ({ cell: { value }, row: { original: { id } } }) {
        return (
          <button onClick={() => deleteArticle({ variables: { id } })} className="button is-white has-text-grey">
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
      <Index data={articles} columns={columns} tabs={[{ title: "Aucun", filter: () => true }]}>
        {{
          slug: "article",
          entity: "article", genre: "M",
        }}
      </Index>
    </div>
  )
}

export default withAuthenticationCheck(ArticlesIndex, ["SUPER_ADMIN"])
