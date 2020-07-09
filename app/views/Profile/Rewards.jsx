import React from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'
import { CommonActions } from '@react-navigation/native'

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"
import { CHECK_AUTH } from "../../graphql/auth"
import { challengeContent } from '../../utils/wording'

import Button from "../../components/atoms/Button"
import Icon from "../../components/atoms/Icon"
import Input from "../../components/atoms/Input"
import CardPost from "../../components/organismes/CardPost"
import * as s from '../../styles'
import { GET_REWARDS } from '../../graphql/reward'


export default function Rewards({ navigation }) {
  const client = useApolloClient()
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  const { data: { getRewards = [] } = {} } = useQuery(GET_REWARDS, { onError: console.log })
  // console.log(userData)
  return (
    <ScrollView style={[s.flex, s.backgroundPale]} contentContainerStyle={[]} stickyHeaderIndices={[0]}>

      <View>
        <View style={[s.backgroundPale, s.flex, s.p2, s.pt3]}>
          <Button
            btnStyle="icon"
            iconName="arrow-left-line"
            onPress={navigation.goBack}
          />
          <View style={[s.flex]}>
            <Text style={[s.body2, s.mt1]}>
              Défis <Text style={[s.primary]}>
                “{challengeContent[userData?.company.currentTheme]?.title}”
            </Text>
            </Text>
            <Text style={[s.heading4]}>
              Récompenses
          </Text>
          </View>
        </View>
      </View>

      {getRewards.map(({ article }) => (
        <CardPost
          style={[s.m2]}
          {...article}
          medium
          onPress={() => {
            navigation.navigate("Article", { article });
          }}
        />
      ))}

    </ScrollView>
  )
}
