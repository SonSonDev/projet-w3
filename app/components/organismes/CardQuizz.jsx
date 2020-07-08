import React from "react"
import { View, Text, FlatList, TouchableHighlight } from "react-native"
import Button from "../atoms/Button"
import * as s from "../../styles/index"
import Illustration from "../../assets/img/illuCardQuizz.svg"

const CardQuizz = ({ onSubmit, isAnswered, updateState, question, answerList, answer, quizMessage, storybook = false }) => {
  return (
    <View style={[{backgroundColor: '#FBEAE9', overflow: 'hidden'}, s.round3]}>
      {!storybook && <Illustration style={[s.absolute, s.bottom]}/>}
      <View style={[{paddingLeft: 24, paddingRight: 24}]}>
        <Text style={[{marginTop:40, marginBottom:40}, s.heading5]}>{ question }</Text>
        <FlatList
          style={[{marginBottom:40}]}
          data={answerList}
          numColumns={1}
          ItemSeparatorComponent={() => <View style={[ s.pt2 ]}></View>}
          renderItem={({ item, index }) => (
            <TouchableHighlight onPress={() => { if(!isAnswered) updateState(index)} } underlayColor="transparent" style={[ index % 1 !== 0 && s.pl1, s.flex ]}>
              <View style={[ s.round2, { minHeight: 64, borderColor: '#E8AEA2', borderWidth: item.selected ? 0 : 1, justifyContent: 'center', backgroundColor: item.selected ? '#BA5A40' : '#FFFFFF' }, s.p1, [{paddingLeft:24}, isAnswered && item.label === answer && {backgroundColor: "#0E562F"}] ]}>
                <Text style={[{ color: item.selected ? '#FFFFFF' : '#181B1B', fontSize: 16}, isAnswered && item.label === answer && { color: "#ffffff"}]}>{item.label}</Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.label}
        />
        {(!isAnswered || quizMessage) ? <Button label={quizMessage || "Valider"} btnStyle='primary' style={[s.mb4]} onPress={onSubmit}/> : <></>}
      </View>
    </View>
  )
}

export default CardQuizz;
