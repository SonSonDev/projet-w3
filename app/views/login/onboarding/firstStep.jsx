import React from 'react'
import { ScrollView, StyleSheet, ImageBackground, View, Text, Image } from 'react-native'
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import { CommonActions } from '@react-navigation/native'

import Steps from "../../../components/atoms/Steps"
import Button from "../../../components/atoms/Button"
import IllustrationOnboarding from "../../../assets/img/illu-onboarding.svg"
import Logo from "../../../assets/img/logo.svg"
import * as s from "../../../styles/index"



export default function OBFirstStep ({ navigation }) {
  const client = useApolloClient()
  return (
    <View style={[ s.flex, s.backgroundPale ]}>
      <IllustrationOnboarding style={[ s.absolute, s.top, s.right ]} width={200} height={300} />
      <ScrollView contentContainerStyle={[ s.flex, s.p2, s.justifyCenter ]}>
        <Text style={[ s.heading1, s.center, s.mtAuto, s.mb1, s.pt4 ]}>
          Madu s’adapte{'\n'}à vous
        </Text>
        <Text style={[ s.body1, s.center, s.mb3, s.selfCenter, { maxWidth: 320 } ]}>
          Dites nous en un peu plus sur vous pour que nous puissions adapter l’expérience à vos besoins
        </Text>
        <Logo style={[ s.selfCenter, s.mtAuto, s.mb4 ]} width={80} height={80} />
        <Steps length={3} currentStep={1} style={[ s.mtAuto, s.mb2 ]} />
        <Button btnStyle='primary' label='Commencer' onPress={() => navigation.navigate('OnboardingSecondStep')} style={[ s.mb1 ]} />
        <Button btnStyle='secondary' label='Passer' onPress={async () => {
          client.writeData({ data: { isOnboarded: true } })
          navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [ { name: 'MainNavigator' } ],
          }))
          await SecureStore.setItemAsync('isOnboarded', 'true')
        }} />
      </ScrollView>
    </View>
  )
}
