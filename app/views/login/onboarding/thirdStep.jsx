import React, { useState } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import { CommonActions } from '@react-navigation/native'

import Filter from "../../../components/atoms/Filter"
import Steps from "../../../components/atoms/Steps"
import Button from "../../../components/atoms/Button"
import IllustrationOnboarding from "../../../assets/img/illu-onboarding.svg"
import * as s from "../../../styles/index"

import { ADD_TAGS_TO_USER } from '../../../graphql/user'
import { CHECK_AUTH } from '../../../graphql/auth'

export default function OBThirdStep ({ navigation }) {
  const client = useApolloClient()

  /* Information de l'utilisateur */
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)

  /* Liste de choix de l'utilisateur */
  const [filterList, setFilterList] = useState([
    { label: 'Handicap visuel' },
    { label: 'Handicap auditif' },
    { label: 'Handicap moteur' },
    { label: 'Pas de besoins particuliers', isUnique: true }
  ])

  /* Call API pour ajout des préférences */
  const [addTagsToUser, { loading }] = useMutation(ADD_TAGS_TO_USER, {
    onCompleted: async res => {
      await SecureStore.setItemAsync('isOnboarded', 'true')
      client.writeData({ data: { isOnboarded: true } })
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [ { name: 'MainNavigator' } ],
      }))
    },
    onError: error => console.log(error.message),
  })

  /* Action à l'envoi du formulaire */
  const onSubmit = async () => {
    if (!filterList.some(item => item.selected)) {
      setFilterList(filterList.map(item => ({ ...item, selected: item.isUnique })))
    }
    addTagsToUser({ variables: {
      userId: userData.id,
      tags: filterList.filter(item => item.selected && !item.isUnique).map(item => item.label)
    }})
  }

  return (
    <View style={[ s.flex, s.backgroundPale ]}>
      <IllustrationOnboarding style={[ s.absolute, s.top, s.right ]} width={200} height={300} />
      <ScrollView contentContainerStyle={[ s.flex, s.p2, s.justifyCenter ]}>
        <Text style={[ s.heading1, s.center, s.mtAuto, s.mb1, s.pt4 ]}>
          Vos besoins d’accessibilité
        </Text>
        <Text style={[ s.body1, s.center, s.mb3, s.selfCenter, { maxWidth: 320 } ]}>
          Nous vous proposerons des établissements et activités adaptées à vos besoins
        </Text>
        <Filter filterList={filterList} setFilterList={setFilterList} numbColumns={3} />
        <Steps length={3} currentStep={3} style={[ s.mtAuto, s.mb2 ]} />
        <Button btnStyle='primary' label='C’est parti !' style={[ s.mb1 ]} onPress={onSubmit} />
        <Button btnStyle='secondary' label='Passer' onPress={async () => {
          await SecureStore.setItemAsync('isOnboarded', 'true')
          client.writeData({ data: { isOnboarded: true } })
          navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [ { name: 'MainNavigator' } ],
          }))
        }} />
      </ScrollView>
    </View>
  )
}
