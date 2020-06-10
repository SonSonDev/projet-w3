import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/react-hooks"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"
import ToastContext from "../../utils/ToastContext"

import { GET_CHALLENGES, GET_CHALLENGE, CREATE_CHALLENGE, UPDATE_CHALLENGE, DELETE_CHALLENGE } from "../../graphql/challenge"

import Form from "../../components/Form"
import Loader from "../../components/Loader"

import { themeNames } from "../../utils/wording"

const autofill = on => on && ({
  name: "name",
  description: "desc",
  value: "123321",
})
const ChallengeForm = ({ history, match: { params: { id } } }) => {
  const { setToast } = useContext(ToastContext)

  const { data: { getChallenge = {} } = {}, loading: getChallengeLoading } = useQuery(GET_CHALLENGE, { variables: { id }})

  const form = () => ([
    {
      // label: "Défi",
      children: [
        { key: "theme", label: "Type d'entreprise", type: "R", options: Object.entries(themeNames).map(([ value, label ]) => ({ value, label })), required: true },
        { key: "name", label: "Nom", type: "T", required: true },
        { key: "description", label: "Description", type: "TT", required: true },
        { key: "value", label: "Récompense", type: "T" },
      ],
    },
  ])

  const [ createChallenge, { loading: createChallengeLoading } ] = useMutation(CREATE_CHALLENGE, {
    update (cache, { data: { createChallenge } }) {
      const { getChallenges } = cache.readQuery({ query: GET_CHALLENGES })
      cache.writeQuery({
        query: GET_CHALLENGES,
        data: { getChallenges: [ ...getChallenges, createChallenge ] },
      })
    },
  })
  const [ updateChallenge, { loading: updateChallengeLoading } ] = useMutation(UPDATE_CHALLENGE, {})

  const [ deleteChallenge ] = useMutation(DELETE_CHALLENGE, {
    update (cache, { data: { deleteChallenge } }) {
      const { getChallenges } = cache.readQuery({ query: GET_CHALLENGES })
      cache.writeQuery({
        query: GET_CHALLENGES,
        data: { getChallenges: getChallenges.filter(({ id }) => id !== deleteChallenge.id) },
      })
    },
  })

  const onSubmit = async (data) => {
    data.value = Number(data.value)
    try {
      if (id) {
        await updateChallenge({ variables: { ...data, id } })
      } else {
        await createChallenge({ variables: { ...data } })
        history.push("/challenges")
      }
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  }

  const onDelete = id && (async () => {
    try {
      await deleteChallenge({ variables: { id } })
      history.push("/challenges")
      setToast({ type: "success" })
    } catch (error) {
      setToast({ type: "danger" })
      console.log(error, { ...error })
    }
  })

  const defaultValues = id ? {
    ...getChallenge,
    photo: getChallenge?.photo ? [getChallenge.photo] : null,
  } : autofill(process.env.NODE_ENV === "development")

  return (
    <main>
      <div className="px3 py2 border-bottom">
        <h1 className="is-size-3 bold my05">
          { id ? "Éditer le challenge" : "Ajouter un nouveau challenge" }
        </h1>
      </div>
      <div className='p3'>
        {(getChallengeLoading) ? (
          <Loader />
        ) : (
          <Form
            form={form}
            onSubmit={onSubmit}
            onDelete={onDelete}
            onCancel={() => history.goBack()}
            submitting={createChallengeLoading || updateChallengeLoading}
          >
            {{defaultValues}}
          </Form>
        )}
      </div>
    </main>
  )
}

ChallengeForm.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default withAuthenticationCheck(ChallengeForm, ["SUPER_ADMIN"])
