import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"

import { GET_ARTICLES, GET_ARTICLE, CREATE_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from "../../graphql/article"

import Form from "../../components/Form"
import Loader from "../../components/Loader"


const ArticleForm = ({ history, match: { params: { id } } }) => {
  const { setToast } = useContext(ToastContext)

  const { data: { getArticle = {} } = {}, loading: getArticleLoading } = useQuery(GET_ARTICLE, { variables: { where: { id } } })

  const form = () => ([
    {
      label: "Article",
      children: [
        { key: "title", label: "Titre de l'article", type: "T", required: true },
        { key: "content", label: "Contenu", type: "TT", required: true },
        { key: "videoUrl", label: "Lien de la vidéo", type: "T" },
        { key: "photo", label: "Image", type: "P" },
      ],
    },
    {
      label: "Quiz",
      children: [
        { key: "quiz.question", label: "Question", type: "TT", required: true, attributes: {rows: 2} },
        { key: "quiz.choices", label: "Choix", type: "AT", required: true, params: { number: 4, radioKey: "quiz.answer" } },
        {
          key: "quiz.value", label: "Récompense", type: "T",
          attributes: { type: "number" },
          required: true,
        },
      ],
    },
  ])

  const [ createArticle, { loading: createArticleLoading } ] = useMutation(CREATE_ARTICLE, {
    update (cache, { data: { createArticle } }) {
      const { getArticles } = cache.readQuery({ query: GET_ARTICLES })
      cache.writeQuery({
        query: GET_ARTICLES,
        data: { getArticles: [ ...getArticles, createArticle ] },
      })
    },
  })
  const [ updateArticle, { loading: updateArticleLoading } ] = useMutation(UPDATE_ARTICLE, {})

  const [ deleteArticle ] = useMutation(DELETE_ARTICLE, {
    update (cache, { data: { deleteArticle } }) {
      const { getArticles } = cache.readQuery({ query: GET_ARTICLES })
      cache.writeQuery({
        query: GET_ARTICLES,
        data: { getArticles: getArticles.filter(({ id }) => id !== deleteArticle.id) },
      })
    },
  })

  const onSubmit = async (data) => {
    data.quiz.value = Number(data.quiz.value)
    data.photo = data.photo.filter(({ files, uri }) => files?.length || uri).map(({ files: [ file ], uri }) => ({ file, uri }))[0]
    try {
      if (id) {
        await updateArticle({ variables: { data, where: { id } } })
      } else {
        await createArticle({ variables: { data } })
        history.push("/articles")
      }
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  }

  const onDelete = id && (async () => {
    try {
      await deleteArticle({ variables: { where: { id } } })
      history.push("/articles")
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  })

  const defaultValues = id ? {
    ...getArticle,
    photo: getArticle?.photo ? [getArticle.photo] : null,
  } : {
    title: "title",
    content: "content",
    video: "video",
    quiz: {
      question: "quizQuestion",
      choices: ["aaaaa", "bbbb", "ccccc", "ddddd"],
      answer: "1",
      value: "123321",
    },
  }

  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          Ajouter un nouvel article
        </h1>
      </div>
      <div className='p3'>
        {(getArticleLoading) ? (
          <Loader />
        ) : (
          <Form
            form={form}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={() => history.goBack()}
            submitting={createArticleLoading || updateArticleLoading}
          >
            {{defaultValues}}
          </Form>
        )}
      </div>
    </main>
  )
}

ArticleForm.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default withAuthenticationCheck(ArticleForm, ["SUPER_ADMIN"])
