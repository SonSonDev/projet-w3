import React from "react";
import { View, Text, FlatList, TouchableHighlight } from "react-native";
import Radio from "../atoms/Radio";
import Button from "../atoms/Button";
import * as s from '../../styles/index';
import Illustration from '../../assets/img/illuCardQuizz.svg'

const CardQuizz = ({question, answerList, setAnswerList}) => {

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

  return (
    <View style={[{height: 597, width: '100%', backgroundColor: '#FBEAE9'}, s.rounder]}>
      <View style={[{widht: '100%', height: '100%', paddingLeft: 24, paddingRight: 24}]}>
        <Text style={[{marginTop:40, marginBottom:40}]}>{question}</Text>
        <FlatList
          style={[{marginBottom:40}]}
          data={answerList}
          numColumns={1}
          ItemSeparatorComponent={() => <View style={[ s.pt2 ]}></View>}
          renderItem={({ item, index }) => (
            <TouchableHighlight onPress={() => updateState(index)} underlayColor="transparent" style={[ index % 1 !== 0 && s.pl1, s.flex ]}>
              <View style={[ { minHeight: 64, borderColor: '#E8AEA2', borderWidth: item.selected ? 0 : 1, borderRadius: 8, justifyContent: 'center', backgroundColor: item.selected ? '#BA5A40' : '#FFFFFF' }, s.p1, [{paddingLeft:24}] ]}>
                <Text style={{ color: item.selected ? '#FFFFFF' : '#181B1B', fontSize: 16}}>{item.label}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.label}
        />
        <Button label="Valider" style={[{marginBottom:40}]}/>
      </View>
    </View>
  )
}

export default CardQuizz;