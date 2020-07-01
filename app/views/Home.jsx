import React from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
 
import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../graphql/place"

import Button from "../components/atoms/Button"
import Input from "../components/atoms/Input"
import CardPost from "../components/organismes/CardPost"
import CardAddress, { CardAddressSkeleton } from "../components/organismes/CardAddress"
import * as s from '../styles'


export default function Home () {

  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(GET_PLACES, {
    onError: error => console.log(error.message),
    variables: {
      where: { category: 'FOOD' },
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
      <View style={[ s.px2, s.py1 ]}>
        <CardPost
          title="Parfumer son intérieur sans péter"
          subtitle="Maison"
          photos="https://www.glenat.com/sites/default/files/images/livres/couv/9782344024393-001-T.jpeg"
          large
        />
      </View>
    </View>
  )
}
