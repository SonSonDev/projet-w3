import React from 'react'
import { Text, View } from 'react-native'
import Button from '../atoms/Button'

import * as s from '../../styles/index.js'

const cardChallenge = ({isToday}) => {
  return (
    <View>
      <View style={[{width:24}, s.mr2]}></View>
      <View style={[{width:'100%', height:148, borderColor: '#B4543A', borderWidth: isToday ? 1:0, backgroundColor:'#FFFFFF'}, s.round3]}>
        <Text></Text>
        <Text></Text>
      </View>
    </View>
  )
}

export default cardChallenge
