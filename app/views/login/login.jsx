import React from 'react'
import { StyleSheet, ScrollView, View, Text, Linking, Image } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import gql from "graphql-tag"

import Button from "../../components/atoms/Button"
import Input from "../../components/atoms/Input"
import IllustrationLogin from "../../assets/img/illu-login.svg"
import * as s from "../../styles/index"
import { LOGIN } from "../../graphql/auth"


export default function Login({ navigation }) {
  const client = useApolloClient()
  const { data: { isOnboarded } = {} } = useQuery(gql`{ isOnboarded @client }`)

  const [email, setEmail] = React.useState('vpham@craftegg.fr')
  const [password, setPassword] = React.useState('admin')

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: async res => {
      await SecureStore.setItemAsync('authToken', res.login.token)
      await SecureStore.setItemAsync('isLoggedIn', 'true')
      client.writeData({ data: { isLoggedIn: true } })
    },
    onError: error => console.log(error.message),
  })
  const onSubmit = async () => {
    login({
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
        <Input value={email} onChange={setEmail} style={[ s.mt2, s.mb1 ]} />
        <Input value={password} onChange={setPassword} isPwd style={[ s.mb2 ]} />
        <Text style={[ s.grey, s.center, s.pb4, s.mbAuto ]}>
          Mot de passe oublié ?
        </Text>
        {loading ? <Text style={[ s.mb1, { textAlign: 'center' } ]}>Now Loading...</Text> : 
          <Button btnStyle='primary' label='Connexion' onPress={onSubmit} style={[ s.mb1 ]} />      
        }
      </ScrollView>
    </View>
  )
}
