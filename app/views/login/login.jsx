import React from 'react'
import { StyleSheet, ScrollView, View, Text, Linking, Image } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import gql from "graphql-tag"
import { CommonActions } from '@react-navigation/native'

import Button from "../../components/atoms/Button"
import Input from "../../components/atoms/Input"
import IllustrationLogin from "../../assets/img/illu-login.svg"
import * as s from "../../styles/index"
import { LOGIN, CHECK_AUTH } from "../../graphql/auth"

/* Ecran de connexion */
export default function Login({ navigation }) {
  const client = useApolloClient()
  const { data: { isOnboarded } = {} } = useQuery(gql`{ isOnboarded @client }`)

  /* Champs du formulaire de connexion */
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  /* Call API pour la connexion */
  const [login, { loading, error }] = useMutation(LOGIN, {
    async update (cache, { data: { login } }) {
      try {
        cache.writeQuery({
        // client.writeData({
          query: CHECK_AUTH,
          data: { checkAuthApp: login.user },
        })
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [ { name: isOnboarded ? 'MainNavigator' : 'OnboardingFirstStep' } ],
        }))
        await SecureStore.setItemAsync('authToken', login.token)
        // await SecureStore.setItemAsync('userEmail', login.user.email)
      } catch (error) {
        console.log(error)
      }
    },
    onError: error => {
      console.log(error.message)
      client.writeData({ data: {
        toast: `FAIL::Mince ! Ça n’a pas marché…::${Date.now()}`
      } })
    },
  })

  /* Action à l'envoi du formulaire */
  const onSubmit = async () => {
    await login({
      variables: {
        email,
        password,
      },
    })
  }

  return (
    <View style={[ s.flex, s.backgroundPale ]}>
      <IllustrationLogin style={[ s.absolute, s.top, s.right ]} width={200} height={300} />
      <ScrollView contentContainerStyle={[ s.flex, s.p2, s.justifyCenter ]}>
        <Text style={[ s.heading1, s.mtAuto, s.mb1 ]}>
          Bon retour{'\n'}parmi nous
        </Text>
        {!isOnboarded && (
          <Text style={[ s.body1, s.mb1, { maxWidth: 260 } ]}>
            Vous avez reçu votre mot de passe par mail
          </Text>
        )}
        <Input value={email} onChange={setEmail} style={[ s.mt2, s.mb1 ]} placeholder="Adresse email" autoCapitalize='none' />
        <Input value={password} onChange={setPassword} isPwd style={[ s.mb2 ]} placeholder="Mot de passe" />

        {/* TODO */}
        <Text style={[ s.grey, s.center, s.pb4, s.mbAuto ]} onPress={() => {
          const defaultAccounts = [
            'mahel.zeroual@bridge.audio',
            'theodore.yip@mono.net',
            'sahbi.s@otaku.com',
            'vpham@craftegg.fr',
          ]
          setEmail(defaultAccounts[defaultAccounts.indexOf(email)+1] || defaultAccounts[0])
          setPassword('admin')
        }}>
          Mot de passe oublié ?
        </Text>
        
        <Button btnStyle='primary' label={`Connexion${loading ? '…' : ''}`} onPress={onSubmit} style={[ s.mb1 ]} />      
      </ScrollView>
    </View>
  )
}
