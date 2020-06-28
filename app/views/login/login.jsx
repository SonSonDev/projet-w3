import React from 'react'
import { StyleSheet, ScrollView, View, Text, Linking, Image } from 'react-native'
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'

import Button from "../../components/atoms/Button"
import Input from "../../components/atoms/Input"
import IllustrationLogin from "../../assets/img/illu-login.svg"
import * as s from "../../styles/index"


export default function Login({ navigation }) {
  const client = useApolloClient()
  return (
    <View style={[ s.flex, s.backgroundPale ]}>
      <IllustrationLogin style={[ s.absolute, s.top, s.right ]} width={200} height={300} />
      <ScrollView contentContainerStyle={[ s.flex, s.p2, s.justifyCenter ]}>
        <Text style={[ s.heading1, s.mtAuto, s.mb1 ]}>
          Bon retour{'\n'}parmi nous
        </Text>
        <Text style={[ s.body1, s.mb2, { maxWidth: 260 } ]}>
          Vous avez reçu votre mot de passe par mail
        </Text>
        <Input value={'example@company.com'} style={[ s.mb1 ]} />
        <Input value={'password'} isPwd style={[ s.mb2 ]} />
        <Text style={[ s.grey, s.center, s.pb4, s.mbAuto ]} onPress={() => Linking.openURL('http://google.com')}>
          Mot de passe oublié ?
        </Text>
        <Button btnStyle='primary' label='Connexion' onPress={async () => {
          await SecureStore.setItemAsync('isLoggedIn', 'true')
          client.writeData({ data: { isLoggedIn: true } })
          // navigation.navigate('OnboardingFirstStep')
        }} style={[ s.mb1 ]} />
      </ScrollView>
    </View>
  )
}
