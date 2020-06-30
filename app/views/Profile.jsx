import React from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../graphql/place"
import { CHECK_AUTH } from "../graphql/auth"

import Button from "../components/atoms/Button"
import Input from "../components/atoms/Input"
import CardAddress from "../components/organismes/CardAddress"
import * as s from '../styles'


export default function Profile () {
  const client = useApolloClient()
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  return (
    <ScrollView style={[ s.backgroundWhite ]} contentContainerStyle={[ s.pt3 ]}>
      <Text style={[ s.heading4, s.px2 ]}>
        { `${userData?.firstName} ${userData?.lastName}` }
      </Text>
      <Text style={[ s.body2, s.grey, s.px2, s.mb3 ]}>
        { `${userData?.company?.name}` }
      </Text>
      <TouchableOpacity activeOpacity={1} style={[ s.p2, s.backgroundWhite, { borderWidth: 1, borderColor: s.c.bg } ]} onPress={async () => {
        await SecureStore.deleteItemAsync('isLoggedIn')
        await SecureStore.deleteItemAsync('authToken')
        client.writeData({ data: { isLoggedIn: false } })
      }}>
        <Text style={[ s.body1 ]}>Déconnexion</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={[ s.p2, s.backgroundWhite, { borderBottomWidth: 1, borderColor: s.c.bg } ]} onPress={async () => {
        await SecureStore.deleteItemAsync('isLoggedIn')
        await SecureStore.deleteItemAsync('isOnboarded')
        await SecureStore.deleteItemAsync('authToken')
        client.writeData({ data: { isLoggedIn: false, isOnboarded: false } })
      }}>
        <Text style={[ s.body1 ]}>Réinitialiser</Text>
      </TouchableOpacity>
      <Text style={[ s.body2, s.grey, s.p2 ]}>Version {Constants.manifest.version}</Text>
    </ScrollView>
  )
}
