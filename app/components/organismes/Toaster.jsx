import React, { useEffect, useRef } from 'react'
import { Text, Animated } from 'react-native'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { toastStates } from '../../utils/wording'
import Icon from '../atoms/Icon'
import * as s from '../../styles'

export default function () {
  const { data: { toast = '' } = {} } = useQuery(gql`{ toast @client }`)

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

  const { icon, color, backgroundColor } = toastStates[type] || {}

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
      <Icon name={icon} size={20} color={color} style={[ s.p1, s.round2, { backgroundColor }, s.overflow, s.mr1 ]} />
      <Text style={[ s.body1, s.flex, s.mx1 ]}>
        {message.split(isBold).reduce((acc, curr, i) => [ ...acc, <Text key={i+'__toasted'}>{acc.length >= 1 && <Text style={[ s.bold ]}>{isBold.split('__')[1]}</Text>}{curr}</Text> ], [])}
      </Text>
    </Animated.View>
  ) : null
}
