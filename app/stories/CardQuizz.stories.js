import React, {useState} from 'react';
import { View } from "react-native";
import CardQuizz from '../components/organismes/CardQuizz.jsx';

export default {
  title: 'CardQuizz',
  component: CardQuizz,
};

const updateChoice = (index, answerList, setAnswerList) => {
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
const question = "Quel pourcentage d'énergie en plus est consommé par un congélateur non dégivré ?"
const getChoices = () => ([{
  label: '5%',
  selected: false
}, {
  label: '15%',
  selected: false
}, {
  label: '30%',
  selected: false
}, {
  label: '60%',
  selected: false
}])

const answer = "30%"

export const Basic = () => {
  const [answerList, setAnswerList] = useState(getChoices())

  const updateState = (index) => updateChoice(index, answerList, setAnswerList)
  const isAnswered = false
  const message = ""
  return <View style={{ paddingTop: 5, paddingLeft: 5, width:364 }}>
    <CardQuizz
      question={question}
      isAnswered={isAnswered}
      answer={answer}
      answerList={answerList}
      setAnswerList={setAnswerList}
      updateState={updateState}
      quizMessage={message}
      storybook={true}/>
  </View>
};

export const GoodAnswer = () => {
  const [answerList, setAnswerList] = useState(getChoices().map((e, i) => {
    if (i === 2) e.selected = true
    return e
  }))
  const updateState = (index) => updateChoice(index, answerList, setAnswerList)
  const isAnswered = true
  const message = "Bien joué ! Vous gagnez 10 pts !"
  return <View style={{ paddingTop: 5, paddingLeft: 5, width:364 }}>
    <CardQuizz
      question={question}
      isAnswered={isAnswered}
      answer={answer}
      answerList={answerList}
      setAnswerList={setAnswerList}
      updateState={updateState}
      quizMessage={message}
      storybook={true}/>
  </View>
};

export const BadAnswer = () => {
  const [answerList, setAnswerList] = useState(getChoices().map((e, i) => {
    if (i === 1) e.selected = true
    return e
  }))
  const updateState = (index) => updateChoice(index, answerList, setAnswerList)
  const isAnswered = true
  const message = "Raté !"
  return <View style={{ paddingTop: 5, paddingLeft: 5, width:364 }}>
    <CardQuizz
      question={question}
      isAnswered={isAnswered}
      answer={answer}
      answerList={answerList}
      setAnswerList={setAnswerList}
      updateState={updateState}
      quizMessage={message}
      storybook={true}/>
  </View>
};