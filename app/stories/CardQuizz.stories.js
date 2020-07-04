import React, {useState} from 'react';
import { View } from "react-native";
import CardQuizz from '../components/organismes/CardQuizz.jsx';

export default {
  title: 'CardQuizz',
  component: CardQuizz,
};

export const Large = () => {
  const [answerList, setAnswerList] = useState([{
    label: 'oui',
    selected: false
  }, {
    label: 'non',
    selected: false
  }, {
    label: 'bof',
    selected: false
  }, {
    label: 'réponse D',
    selected: false
  }])

  return <View style={{ paddingTop: 5, paddingLeft: 5, width:364 }}>
    <CardQuizz question="bonjour ça va ?" answerList={answerList} setAnswerList={setAnswerList}/>
  </View>
};