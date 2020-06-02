import React, { useContext } from "react"
import { useMutation } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"

import { CREATE_ARTICLE } from "../../graphql/mutations/article"

import Form from "../../components/Form"
import Loader from "../../components/Loader"


const ArticleForm = ({ history }) => {
  const { setToast } = useContext(ToastContext)

  const form = () => ([
    {
      label: "Article",
      children: [
        { key: "title", label: "Titre de l'article", type: "T", required: true },
        { key: "content", label: "Contenu", type: "TT", required: true },
        { key: "video", label: "Lien de la vidéo", type: "T" },
        { key: "picture", label: "Image", type: "P" },
      ],
    },
    {
      label: "Quiz",
      children: [
        { key: "quizQuestion", label: "Question", type: "T", required: true },
        { key: "quizChoices", label: "Choix", type: "AT", required: true, params: { number: 4, radioKey: 'quizAnswer' } },
        { 
          key: "quizValue", label: "Récompense", type: "T",
          attributes: { type: "number" },
          required: true 
        },
      ],
    },
  ])

  const [ createArticle, { loading: createArticleLoading } ] = useMutation(CREATE_ARTICLE)
  
  const onSubmit = async (data) => {
    data.quizValue = Number(data.quizValue)
    data.quizAnswer = data.quizChoices[data.quizAnswer]
    try {
      console.log(data)
      await createArticle({ variables: data })
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  }


  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          Ajouter un nouvel article
        </h1>
      </div>
      <div className='p3'>
        <Form
          form={form}
          onSubmit={onSubmit}
          onCancel={() => history.goBack()}
          submitting={createArticleLoading}
        >
        </Form>
      </div>
    </main>
  )
}

export default withAuthenticationCheck(ArticleForm, ["SUPER_ADMIN"])
