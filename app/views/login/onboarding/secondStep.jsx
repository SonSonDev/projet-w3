import React, { useState } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'

import Filter from "../../../components/atoms/Filter"
import Steps from "../../../components/atoms/Steps"
import Button from "../../../components/atoms/Button"
import BackgroundImage from "../../../assets/img/illu-onboarding.svg"
import * as s from "../../../styles/index"


export default function OBSecondStep ({ navigation }) {

  const [filterList, setFilterList] = useState([
    { label: 'Casher' },
    { label: 'Halal' },
    { label: 'Sans-gluten' },
    { label: 'Vegan' },
    { label: 'Végétarien' },
    { label: 'Pas de restrictions', isUnique: true }
  ])

  return (
    <ScrollView contentContainerStyle={[ s.flex, s.bgLight, s.p2, s.justifyCenter ]}>
      <BackgroundImage style={[ s.absolute, s.t0, s.r0 ]} width={200} height={300} />
      <Text style={[ s.h1, s.center, s.mtAuto, s.mb2, s.pt4 ]}>
        Votre régime alimentaire
      </Text>
      <Text style={[ s.text1, s.center, s.mb4, s.selfCenter, { maxWidth: 320 } ]}>
        Nous vous proposerons des adresses respectant votre régime alimentaire
      </Text>
      <Filter filterList={filterList} setFilterList={setFilterList} numbColumns={3} />
      <Steps length={3} currentStep={2} style={[ s.mtAuto, s.mb2 ]} />
      <Button btnStyle='primary' label='Continuer' onPress={() => navigation.navigate('OnboardingThirdStep')} style={[ s.mb1 ]} />
      <Button btnStyle='secondary' label='Passer' style={[ ]} />
    </ScrollView>
  )
}
