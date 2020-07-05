import React, { useState } from "react"
import { View, Text, FlatList, TouchableHighlight } from "react-native"
import { useQuery, useMutation } from "@apollo/react-hooks"

import Button from "../atoms/Button"
import * as s from "../../styles/index"
import Illustration from "../../assets/img/illuCardQuizz.svg"
import { VALIDATE_QUIZ } from "../../graphql/user"
import { CHECK_AUTH } from "../../graphql/auth"

const CardQuizz = ({ article }) => {
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)

  const [message, setMessage] = useState("")

  const [validateQuiz, { loading }] = useMutation(VALIDATE_QUIZ, {
    async update (cache, { data: { validateQuiz } }) {
      const quiz = validateQuiz.validatedQuizzes?.find(item => item.article.id === article.id)
      setMessage(quiz.status ? `Bonne réponse ! ${article.quiz.value} points !` : "Raté")
      client.writeData({
        query: CHECK_AUTH,
        data: { checkAuthApp: validateQuiz },
      })
    },
    onError: error => console.log(error.message),
  })

  console.log(article)
  const [answerList, setAnswerList] = article.quiz ? useState(article.quiz.choices.map(choice => ({
    label: choice,
    selected: false,
  }))) : []

  const updateState = (index) => {
    const newList = [...answerList]
    newList[index].selected = !answerList[index].selected
    if (answerList[index].selected) {
      newList.map((item, i) => {
        if (i !== index) {
          item.selected = false
        }
        return item
      })
    }
    setAnswerList(newList)
  }

  const isAnswered = userData?.validatedQuizzes?.find(item => item.article.id === article.id)

  const onSubmit = () => {
    const choice = answerList.find(item => item.selected)?.label
    if (choice && !isAnswered) {
      validateQuiz({
        variables: {
          userId: userData.id,
          articleId: article.id,
          answer: choice,
        }
      })
    }
  }

  return (
    <View style={[{backgroundColor: '#FBEAE9', overflow: 'hidden'}, s.round3]}>
      <Illustration style={[s.absolute, s.bottom]}/>
      <View style={[{paddingLeft: 24, paddingRight: 24}]}>
        <Text style={[{marginTop:40, marginBottom:40}, s.heading5]}>{article?.quiz?.question}</Text>
        <FlatList
          style={[{marginBottom:40}]}
          data={answerList}
          numColumns={1}
          ItemSeparatorComponent={() => <View style={[ s.pt2 ]}></View>}
          renderItem={({ item, index }) => (
            <TouchableHighlight onPress={() => { if(!isAnswered) updateState(index)} } underlayColor="transparent" style={[ index % 1 !== 0 && s.pl1, s.flex ]}>
              <View style={[ s.round2, { minHeight: 64, borderColor: '#E8AEA2', borderWidth: item.selected ? 0 : 1, justifyContent: 'center', backgroundColor: item.selected ? '#BA5A40' : '#FFFFFF' }, s.p1, [{paddingLeft:24}, isAnswered && item.label === isAnswered.article.quiz.answer && s.backgroundGreen] ]}>
                <Text style={{ color: item.selected ? '#FFFFFF' : '#181B1B', fontSize: 16}}>{item.label}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.label}
        />
        {(!isAnswered || message) ? <Button label={message || "Valider"} btnStyle='primary' style={[s.mb4]} onPress={onSubmit}/> : <></>}
      </View>
    </View>
  )
}

export default CardQuizz