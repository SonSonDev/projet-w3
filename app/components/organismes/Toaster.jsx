import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, Text, Animated } from 'react-native'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import Icon from '../atoms/Icon'
import * as s from '../../styles'


export default function () {
  const { data: { isOnboarded, toast = '' } = {} } = useQuery(gql`{ toast @client }`)

  const fade = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => fade.setValue(0))
  }, [toast])

  const [ type, message = '' ] = toast.split('::')
  const [ isBold ] = message.match(/__[^_]*__/g) || []
  console.log(isBold)

  return toast ? (
    <Animated.View style={[ s.absolute, s.row, s.itemsCenter, s.top, s.right, s.left, s.mx2, s.mt3, s.backgroundWhite, s.round3, s.py2, s.px2, { zIndex: 3 }, s.shadow2, {
      transform: [
        { translateY: fade.interpolate({
          inputRange: [0, 0.02, 5-0.02, 5],
          outputRange: [-20, 0, 0, -20],
        }) }
      ],
      opacity: fade.interpolate({
        inputRange: [0, 0.02, 5-0.02, 5],
        outputRange: [0, 1, 1, 0],
      }),
      
    } ]} pointerEvents='none'>
      <Icon name={type === 'SUCCESS' ? "check-line" : 'emotion-unhappy-line'} size={20} color={type === 'SUCCESS' ? '#0E562F' : '#B4543A'} style={[ s.p1, s.round2, { backgroundColor: type === 'SUCCESS' ? '#DAEEE6' : '#FBEAE9' }, s.overflow, s.mr1 ]} />
      <Text style={[ s.body1, s.flex, s.mx1 ]}>
        {message.split(isBold).reduce((acc, curr, i) => [ ...acc, <Text key={i+'__toasted'}>{acc.length >= 1 && <Text style={[ s.bold ]}>{isBold.split('__')[1]}</Text>}{curr}</Text> ], [])}
      </Text>
    </Animated.View>
  ) : null
}