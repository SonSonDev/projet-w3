import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"

import { GET_REWARDS, GET_REWARD, CREATE_REWARD, UPDATE_REWARD, DELETE_REWARD } from "../../graphql/reward"

import Form from "../../components/Form"
import Loader from "../../components/Loader"

import { themeNames, rewardTypes } from "../../utils/wording"

const autofill = on => on && ({
  type: "DIY",
  value: "123",
  article: {
    title: "title",
    content: "content",
    video: "video",
  },
})

const RewardForm = ({ history, match: { params: { id } } }) => {
  const { setToast } = useContext(ToastContext)

  const { data: { getReward = {} } = {}, loading: getRewardLoading } = useQuery(GET_REWARD, { variables: { id } })

  const form = () => ([
    {
      label: "Récompense",
      children: [
        { key: "type", label: "Type", type: "R", options: Object.entries(rewardTypes).map(([ value, label ]) => ({ value, label })), required: true },
        { key: "value", label: "Valeur", type: "T", required: true, attributes: { type: "number"} },
      ],
    },
    {
      label: "Contenu",
      children: [
        { key: "article.theme", label: "Thème", type: "R", options: Object.entries(themeNames).map(([ value, label ]) => ({ value, label })), required: true },
        { key: "article.title", label: "Titre de l'article", type: "T", required: true },
        { key: "article.content", label: "Contenu", type: "TT", required: true, attributes: {rows: 6} },
        { key: "article.videoUrl", label: "Lien de la vidéo", type: "T" },
        { key: "photo", label: "Image", type: "P" },
      ],
    },
  ])

  const [ createReward, { loading: createRewardLoading } ] = useMutation(CREATE_REWARD, {
    update (cache, { data: { createReward } }) {
      const { getRewards } = cache.readQuery({ query: GET_REWARDS })
      cache.writeQuery({
        query: GET_REWARDS,
        data: { getRewards: [ ...getRewards, createReward ] },
      })
    },
  })
  const [ updateReward, { loading: updateRewardLoading } ] = useMutation(UPDATE_REWARD, {})

  const [ deleteReward ] = useMutation(DELETE_REWARD, {
    update (cache, { data: { deleteReward } }) {
      const { getRewards } = cache.readQuery({ query: GET_REWARDS })
      cache.writeQuery({
        query: GET_REWARDS,
        data: { getRewards: getRewards.filter(({ id }) => id !== deleteReward.id) },
      })
    },
  })

  const onSubmit = async (data) => {
    data.value = Number(data.value)
    data.article.photo = data.photo?.filter(({ files, uri }) => files?.length || uri).map(({ files: [ file ], uri }) => ({ file, uri }))[0]
    delete data["photo"]
    console.log(data)
    try {
      if (id) {
        await updateReward({ variables: {
          id,
          ...data,
        }})
      } else {
        await createReward({ variables: { ...data } })
        history.push("/rewards")
      }
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  }

  const onDelete = id && (async () => {
    try {
      await deleteReward({ variables: { id } })
      history.push("/rewards")
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  })

  const defaultValues = id ? {
    ...getReward,
    photo: getReward?.article?.photo ? [getReward.article.photo] : null,
  } : autofill(process.env.NODE_ENV === "development")

  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          { id ? "Éditer la récompense" : "Ajouter une nouvelle récompense" }
        </h1>
      </div>
      <div className='p3'>
        {(getRewardLoading) ? (
          <Loader />
        ) : (
          <Form
            form={form}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={() => history.goBack()}
            submitting={createRewardLoading || updateRewardLoading}
          >
            {{defaultValues}}
          </Form>
        )}
      </div>
    </main>
  )
}

RewardForm.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default withAuthenticationCheck(RewardForm, ["SUPER_ADMIN"])
