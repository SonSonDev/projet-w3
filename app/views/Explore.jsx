import React from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
 
import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../graphql/place"

import Button from "../components/atoms/Button"
import Input from "../components/atoms/Input"
import CardAddress from "../components/organismes/CardAddress"
import * as s from '../styles'


export default function Explore () {

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
    <View style={[ s.backgroundPale ]}>
      <FlatList
        style={[  ]}
        ListHeaderComponent={() => (
          <View style={[ s.backgroundPale, s.p2, s.pt3 ]}>
            <Text style={[ s.body1, s.grey ]}>Restaurants</Text>
            <Text style={[ s.heading4 ]}>
              À proximité de <Text style={[ s.primary ]}>Hetic</Text>
            </Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
        data={getPlaces}
        renderItem={({ item, index }) => (
          <View style={[ s.px2, s.mb2 ]}>
            <CardAddress {...item} />
          </View>
        )}
      />
    </View>
  )
}
