import React from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"
import { CHECK_AUTH } from "../../graphql/auth"

import Button from "../../components/atoms/Button"
import Input from "../../components/atoms/Input"
import CardAddress from "../../components/organismes/CardAddress"
import * as s from '../../styles'

/* Page profil */
export default function Profile ({ navigation }) {
  const client = useApolloClient()
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  // console.log(userData)
  return (
    <ScrollView style={[ s.flex, s.backgroundPale ]} contentContainerStyle={[  ]} stickyHeaderIndices={[0]}>
      
     <View>
      <View style={[ s.backgroundPale, s.row, s.flex, s.p2, s.pt3 ]}>
        <View style={[ s.flex ]}>
          <Text style={[ s.heading4 ]}>
            { `${userData?.firstName} ${userData?.lastName}` }
          </Text>
          <Text style={[ s.body2 ]}>
            { `${userData?.company?.name}` }
          </Text>
        </View>
        <Button
          btnStyle="icon"
          iconName="settings-4-line"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
     </View>

      <View style={[ s.backgroundWhite, s.p3, s.round3, s.mx2 ]}>
        <Text style={[ s.body1, s.center ]}>Vous avez cumulé au total</Text>
        <Text style={[ s.heading4, s.center, s.primary ]}>
          {userData?.points || 0} points
        </Text>
        
      </View>

      {/* <TouchableOpacity activeOpacity={1} style={[ s.p2, s.backgroundWhite, { borderWidth: 1, borderColor: s.c.bg } ]} onPress={async () => {
        await SecureStore.deleteItemAsync('authToken')
        client.writeData({ data: { checkAuthApp: null } })  
        navigation.navigate('Login')      
      }}>
        <Text style={[ s.body1 ]}>Déconnexion</Text>
      </TouchableOpacity> */}
      {/*       
      <TouchableOpacity activeOpacity={1} style={[ s.p2, s.backgroundWhite, { borderBottomWidth: 1, borderColor: s.c.bg } ]} onPress={async () => {
        await SecureStore.deleteItemAsync('isOnboarded')
        await SecureStore.deleteItemAsync('authToken')
        client.writeData({ data: { checkAuthApp: null, isOnboarded: false } })
        navigation.navigate('FirstScreen')
      }}>
        <Text style={[ s.body1 ]}>Réinitialiser</Text>
      </TouchableOpacity>
      */}
      {/* <Text style={[ s.body2, s.grey, s.p2 ]}>Version {Constants.manifest.version}</Text> */}
    </ScrollView>
  )
}
