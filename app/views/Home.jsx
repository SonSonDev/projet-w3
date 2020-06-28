import React from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
 
import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../graphql/place"

import Button from "../components/atoms/Button"
import Input from "../components/atoms/Input"
import CardAddress, { CardAddressSkeleton } from "../components/organismes/CardAddress"
import * as s from '../styles'


export default function Home () {

  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(GET_PLACES, {
    onError: error => console.log(error.message),
    variables: {
      nearby: {
        coordinates: [48.8518269, 2.4204598] // HETIC
      }
    },
  })
  // console.log(getPlaces)

  return (
    <View style={[ s.flex, s.backgroundPale ]}>
      <Text style={[ s.body2, s.grey, s.px2, s.pt3 ]}>Bonjour Utilisateur</Text>
      <Text style={[ s.heading4, s.px2, s.mb2 ]}>C’est l’heure du déjeuner !</Text>

      <Text style={[ s.heading5, s.px2 ]}>À proximité de <Text style={[ s.primary ]}>Hetic</Text></Text>
      <View>
        <FlatList
          style={[  ]}
          contentContainerStyle={[ s.px2, s.py1 ]}
          data={getPlaces.slice(0, 5)}
          renderItem={({ item, index }) => (
            <CardAddress place={item} />
          )}
          ItemSeparatorComponent={() => <View style={[ s.mr2 ]} />}
          ListEmptyComponent={() => <CardAddressSkeleton />}
          horizontal
        />
      </View>
    </View>
  )
}
