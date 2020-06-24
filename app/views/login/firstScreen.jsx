import React from 'react'
import { StyleSheet, ScrollView, View, Image, Text, Linking } from 'react-native'

import Button from "../../components/atoms/Button"
import BackgroundImage from "../../assets/img/illu-login-full.svg"
import Logo from "../../assets/img/logo.svg"
import * as s from "../../styles/index"


export default function firstScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={[ s.flex, s.bgLight, s.p2, s.justifyCenter ]}>
      <BackgroundImage style={[ s.absolute, s.t0, s.r0 ]} width={200} height={600} />
      <Logo style={[ s.mtAuto, s.mb2 ]} width={40} height={40} />
      <Text style={[ s.h1, s.mb1 ]}>
        Bienvenue sur{'\n'}Madu
      </Text>
      <Text style={[ s.text1, s.mb2, { maxWidth: 220 } ]}>
        L’application qui vous aide à consommer responsable au quotidien.
      </Text>
      <Text style={[ s.text1, s.primary, s.pb4, s.mbAuto ]}>
        Découvrir Madu
      </Text>
      <Button btnStyle='primary' label='J’ai déjà créé mon compte' onPress={() => navigation.navigate('Login')} style={[ s.mb1 ]} />
    </ScrollView>
  )
}
