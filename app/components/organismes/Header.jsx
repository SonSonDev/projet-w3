import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import Button from '../atoms/Button'
import * as s from '../../styles'

function Header ({ scene, previous, navigation }) {
  return (
    <View style={[ s.absolute, s.px2, s.pt1, { top: Constants.statusBarHeight } ]}>
      {previous && (
        <Button btnStyle='icon' iconName='arrow-left-line' onPress={navigation.goBack} />
      )}
    </View>
  )
}

export default Header
