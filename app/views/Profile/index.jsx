import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { useApolloClient } from "@apollo/react-hooks"
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"
import { CHECK_AUTH } from "../../graphql/auth"
import { GET_TAGS } from '../../graphql/tag'
import { categoryIcons, categorySubtitles } from '../../utils/wording'

import Button from "../../components/atoms/Button"
import Icon from "../../components/atoms/Icon"
import Input from "../../components/atoms/Input"
import CardAddress from "../../components/organismes/CardAddress"
import IllustrationChallenges from "../../assets/img/illu-challenges.svg"
import VectChallenges from "../../assets/img/vect-challenges.svg"
import * as s from '../../styles'

/* Page profil */
export default function Profile ({ navigation }) {
  const [ tabIndex, setTabIndex ] = useState(1)
  const client = useApolloClient()
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  const { data: { getTags = [] } = {} } = useQuery(GET_TAGS, { variables: { where: { root: true } } })
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

      <View style={[ s.mx2, s.mt2 ]}>
        <View horizontal snapToInterval={100} style={[ s.row, s.pt1, s.mb2, { borderBottomWidth: 1, borderColor: s.greyLight.color } ]} contentContainerStyle={[ ]} showsHorizontalScrollIndicator={false}>
          {['Défis accomplis', 'Adresses visitées'].map((label, index, a) => (
            <TouchableOpacity onPress={() => setTabIndex(index)} style={[ s.flex, s.justifyCenter, s.row, s.px05, s.itemsCenter, s.pb1, { borderBottomWidth: 1, borderColor: tabIndex === index ? s.primary.color : 'transparent' } ]} activeOpacity={1} key={label}>
              <Text style={[ s.body1, tabIndex === index ? s.primary : s.black, s.bold ]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {tabIndex === 0 ? (
        <View style={[ s.flex, s.round3, s.mx2, s.p2, {backgroundColor: '#FBEAE9', overflow: 'hidden'}]}>
          <IllustrationChallenges style={[ s.absolute, {bottom: -48, right: -32}]} />
          <VectChallenges style={[s.absolute, s.bottom, s.left]} />
          <Text style={[s.heading2, {color:'#B4543A'}]}>Faites du tri</Text>
          <Text style={[s.mt05, s.mb2, s.body2, {width: '60%'}]}>Débarassez-vous du superflu en adoptant des méthodes de tri responsables</Text>
          <TouchableOpacity style={[ s.mtAuto, s.backgroundPrimary, s.px2, s.py1, s.selfStart, s.round2 ]}>
            <Text style={[ s.heading6, s.white, s.py05 ]}>Récompenses</Text>
          </TouchableOpacity>
        </View>
      ) : (
        userData?.history.length ? (
          <View>
            {Object.values(userData?.history.reduce((acc, { originId, ...rest }) => ({
              ...acc,
              [originId]: {
                ...acc[originId],
                originId, ...rest,
                count: (acc[originId]?.count || 0) + 1,
              },
            }), {}) || {})
            .map(({ bounty, originType, originId, date, _PLACE, count }, i, a) => (
              <TouchableOpacity activeOpacity={1} style={[ s.row, s.itemsCenter, s.p2, i === 0 ? [s.pt2, s.roundTop3] : s.pt1, i === a.length-1 ? [s.pb2, s.roundBottom3] : s.pb1, s.mx2, s.backgroundWhite, { borderBottomWidth: 0, borderColor: s.c.bg } ]}>
                <Icon name={categoryIcons[_PLACE?.category]} size={24} color={s.primary.color} style={[ s.p1, s.round2, s.backgroundPrimaryPale, s.overflow, s.mr1 ]} />
                <View style={[ s.flex, s.mx05 ]}>
                  <Text style={[ s.heading6 ]}>{_PLACE?.name}</Text>
                  <Text style={[ s.body2 ]}>{categorySubtitles[_PLACE?.category]?.prefix}{getTags.find(({ label }) => label === categorySubtitles[_PLACE?.category]?.tag)?.children.find(({ label }) => _PLACE?.tags.some(t => t.label === label))?.label}</Text>
                </View>
                {/* <Text style={[ s.body2, s.flex ]}>{new Date(+date).toLocaleDateString()}</Text> */}
                <Text style={[ s.py1, s.px1, s.body2, s.bold, s.round2, { overflow: 'hidden', backgroundColor: '#f4f4f4' } ]}>{count} visite{count > 1 ? 's' : ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={[ s.mx2, s.backgroundWhite, s.p2, s.round3 ]}>
            <Text style={[ s.body2, s.grey, s.center ]}>Aucune adresse trouvée.</Text>
            <Text style={[ s.body2, s.grey, s.center ]}>Revenez plus tard !</Text>
          </View>
        )
      )}

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
