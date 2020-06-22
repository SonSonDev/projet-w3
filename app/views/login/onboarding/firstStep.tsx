import React from 'react'
import { ScrollView, StyleSheet, ImageBackground, View, Text, Image } from 'react-native'

import Steps from "../../../components/atoms/Steps"
import Button from "../../../components/atoms/Button"
import * as s from "../../../styles/index"



export default function OBFirstStep ({ navigation }) {
  return (
    <ScrollView contentContainerStyle={[ s.flex, s.bgLight, s.p2, s.justifyCenter ]}>
      <Image source={require("../../../assets/img/illu-onboarding.svg")} style={[ s.absolute, s.t0, s.r0, { width: 200, height: 300, zIndex: -1 } ]} />
      <Text style={[ s.h1, s.center, s.mtAuto, s.mb2, s.pt4 ]}>
        Madu s’adapte{'\n'}à vous
      </Text>
      <Text style={[ s.text1, s.center, s.mb4, s.selfCenter, { maxWidth: 320 } ]}>
        Dites nous en un peu plus sur vous pour que nous puissions adapter l’expérience à vos besoins
      </Text>
      <Image source={require("../../../assets/img/icon.svg")} style={[ s.selfCenter, s.mtAuto, s.mb4, { width: 80, height: 80 } ]} />
      <Steps length={3} currentStep={1} style={[ s.mtAuto, s.mb2 ]} />
      <Button btnStyle='primary' label='Commencer' onPress={() => navigation.navigate('OnboardingSecondStep')} style={[ s.mb1 ]} />
      <Button btnStyle='secondary' label='Passer' />
    </ScrollView>
  )
}
