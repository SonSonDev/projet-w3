import React from 'react'
import { StyleSheet, ScrollView, View, Text, Linking, Image } from 'react-native'

import Button from "../../components/atoms/Button"
import Input from "../../components/atoms/Input"
import BackgroundImage from "../../assets/img/illu-login.svg"
import * as s from "../../styles/index"


export default function Login({ navigation }) {
  return (
    <ScrollView contentContainerStyle={[ s.flex, s.bgLight, s.p2, s.justifyCenter ]}>
      <BackgroundImage style={[ s.absolute, s.t0, s.r0 ]} width={200} height={300} />
      <Text style={[ s.h1, s.mtAuto, s.mb1 ]}>
        Bon retour{'\n'}parmi nous
      </Text>
      <Text style={[ s.text1, s.mb2, { maxWidth: 260 } ]}>
        Vous avez reçu votre mot de passe par mail
      </Text>
      <Input value={'mail@company.com'} style={[ s.mb1 ]} />
      <Input value={'password'} isPwd style={[ s.mb2 ]} />
      <Text style={[ s.grey, s.center, s.pb4, s.mbAuto ]} onPress={() => Linking.openURL('http://google.com')}>
        Mot de passe oublié ?
      </Text>
      <Button btnStyle='primary' label='Connexion' onPress={() => navigation.navigate('OnboardingFirstStep')} style={[ s.mb1 ]} />
    </ScrollView>
  )
}
