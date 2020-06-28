import React from 'react'
import { StyleSheet, ScrollView, View, Image, Text, Linking } from 'react-native'

import Button from "../../components/atoms/Button"
import IllustrationLoginFull from "../../assets/img/illu-login-full.svg"
import Logo from "../../assets/img/logo.svg"
import * as s from "../../styles/index"


export default function firstScreen({ navigation }) {
  return (
    <View style={[ s.flex, s.backgroundPale ]}>
      <IllustrationLoginFull style={[ s.absolute, s.top, s.right ]} width={200} height={600} />
      <ScrollView contentContainerStyle={[ s.flex, s.p2, s.justifyCenter ]}>
        <Logo style={[ s.mtAuto, s.mb2 ]} width={40} height={40} />
        <Text style={[ s.heading1, s.mb1 ]}>
          Bienvenue sur{'\n'}Madu
        </Text>
        <Text style={[ s.body1, s.mb2, { maxWidth: 220 } ]}>
          L’application qui vous aide à consommer responsable au quotidien.
        </Text>
        <Text style={[ s.body1, s.primary, s.pb4, s.mbAuto ]}>
          Découvrir Madu
        </Text>
        <Button btnStyle='primary' label='J’ai déjà créé mon compte' onPress={() => navigation.navigate('Login')} style={[ s.mb1 ]} />
      </ScrollView>
    </View>
  )
}
