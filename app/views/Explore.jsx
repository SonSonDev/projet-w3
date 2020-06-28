import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
 
import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../graphql/place"

import Button from "../components/atoms/Button"
import Input from "../components/atoms/Input"
import CardAddress, { CardAddressSkeleton } from "../components/organismes/CardAddress"
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
    <View style={[ s.flex, s.backgroundPale ]}>
      <FlatList
        style={[  ]}
        ListHeaderComponent={() => (
          <View style={[ s.backgroundPale, s.p2, s.pt3 ]}>
            <Text style={[ s.body2, s.grey ]}>Restaurants</Text>
            <Text style={[ s.heading4 ]}>
              À proximité de <Text style={[ s.primary ]}>Hetic</Text>
            </Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
        data={getPlaces}
        renderItem={({ item, index }) => (
          <CardAddress full place={item} style={[ s.mx2, s.mb2 ]} />
        )}
        ListEmptyComponent={() => <CardAddressSkeleton full style={[ s.mx2 ]} />}
      />
    </View>
  )
}
