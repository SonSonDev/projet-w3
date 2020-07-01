import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform, TouchableOpacity, ImageBackground, StatusBar, Animated } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'

import { GET_PLACE, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"
import { GET_TAGS } from '../../graphql/tag'
import { CHECK_LOCATION } from '../../graphql/user'
import { categories, categoryIcons, days, openOrClosed } from '../../utils/wording'

import Button from "../../components/atoms/Button"
import RoundButton from "../../components/atoms/RoundButton"
import Input from "../../components/atoms/Input"
import Icon from "../../components/atoms/Icon"
import * as s from '../../styles'


const getCommitmentsNested = children => children.reduce(
  (acc, { id, label, children }) => [
    ...acc,
    { id, label },
    ...getCommitmentsNested(children),
  ]
, [])


export default function Place ({ route: { params: { place } }, navigation }) {
  const [ toast, setToast ] = useState('')
  const { data: { getTags = [] } = {}, loading } = useQuery(GET_TAGS, { variables: { where: { root: true } } })
  const [ tabIndex, setTabIndex ] = useState(0)
  const scroll = useRef(new Animated.Value(0)).current
  const fade = useRef(new Animated.Value(0)).current
  const [ disabled, setDisabled ] = useState(false)
  const [ checkLocation ] = useMutation(CHECK_LOCATION)

  const { id, name, category, headline, description, hours = [], tags = [], address: { street, zipCode, city, location, distance } = {}, user: { phone } = {}, social: { website } = {}, photos = [] } = place
  
  const allCommitments = getTags.find(({ label }) => label === 'Engagements')
  const commitments = allCommitments?.children.map(({ id, label, children }) => ({
    id, label,
    children: getCommitmentsNested(children).filter(({ label }) => tags.some(t => t.label === label)),
  })).filter(({ children }) => children.length).sort((a, b) => b.children.length - a.children.length)

  const { start, end } = { ...hours.filter(({ day }) => day === days[new Date().getDay()]).pop() }
  const [ open, openLabel ] = openOrClosed(start, end)

  return (
    <View style={[ s.backgroundWhite, s.flex ]}>
      <StatusBar hidden animated />
      <Animated.Image
        style={[
          s.absolute, s.fill, { height: 300 }, s.p2, { transform: [
            { scale: scroll.interpolate({ inputRange: [ 0, 200 ], outputRange: [ 1, 1.1 ], extrapolate: 'clamp' }) },
          ] },
        ]}
        source={photos[0]}
        resizeMode='cover'
      />
      <Animated.ScrollView
        style={[  ]}
        contentContainerStyle={[ { paddingTop: 220 } ]}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }])}
        showsVerticalScrollIndicator={false}
      >
        <View style={[ s.backgroundPale, s.p2, s.flex, { borderTopLeftRadius: 16, borderTopRightRadius: 16 } ]}>
          <View style={[ s.row, s.itemsCenter, s.mt05, { height: 32 } ]}>
            <Icon name={categoryIcons[category]} size={14} {...s.primary} style={[ s.mr05 ]} />
            <Text style={[ s.body2, s.primary, s.bold, s.mr1 ]}>{categories[category]}</Text>
            <Icon name="walk-fill" size={14} {...s.primary} style={[ s.mr05 ]} />
            <Text style={[ s.body2, s.primary, s.bold, s.mrAuto ]}>{Math.round(distance / 100)} min</Text>
            {tags.some(({ label }) => label.includes('Vegan')) && <RoundButton backgroundColor="#DAEEE6" icon={<Icon name="leaf-fill" size={20} color="#44A881" />} />}
            {tags.some(({ label }) => label.includes('Handicap')) && <RoundButton backgroundColor="#EDECF8" icon={<Icon name="wheelchair-fill" size={20} color="#9188F6" />} />}
          </View>
          <Text style={[ s.backgroundPrimary, s.py1, s.px1, s.body2, s.white, s.bold, s.round2, { overflow: 'hidden', alignSelf: 'flex-start' }, s.my1 ]}>Géolocalisez-vous pour gagner 50 points</Text>
          <Text style={[ s.heading2, s.mt1, s.mb2 ]}>
            {name}
          </Text>
          <Text style={[ s.body1, s.mb2 ]}>
            {description}
          </Text>
          <View style={[ s.row, s.mb3 ]}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`http://maps.google.com/?daddr=${encodeURIComponent(`${street}, ${zipCode} ${city}`)}`)}
              style={[ s.py1, s.px2, s.row, s.itemsCenter, s.round1, { borderWidth: 1, borderColor: s.black.color }, s.mr1 ]} activeOpacity={1}
            >
              <Icon name="navigation-line" size={18} />
              <Text style={[ s.body1, s.bold, s.ml05 ]}>Y aller</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)} style={[ s.py1, s.px2, s.row, s.itemsCenter, s.round1, { borderWidth: 1, borderColor: s.black.color } ]} activeOpacity={1}>
              <Icon name="phone-line" size={18} />
              <Text style={[ s.body1, s.bold, s.ml05 ]}>Appeler</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={[ s.row, s.mb1 ]}>
              <Icon name="money-euro-circle-line" size={18} {...s.grey} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.pale ]}>
                <Text style={[ tags.some(({ label }) => label.includes('€')) && s.primary ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€')) && s.primary ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€€')) && s.primary ]}>€</Text>
              </Text>
            </View>
            <View style={[ s.row, s.mb1 ]}>
              <Icon name="map-pin-2-line" size={18} {...s.grey} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.primary ]}>
                {street}, {zipCode} {city}
              </Text>
            </View>
            <View style={[ s.row, s.mb1 ]}>
              <Icon name="time-line" size={18} {...s.grey} style={[ s.mr1 ]} />
              <Text style={[ s.body1 ]}>
                {openLabel}
              </Text>
            </View>
            <View style={[ s.row, s.mb1 ]}>
              <Icon name="phone-line" size={18} {...s.grey} style={[ s.mr1 ]} />
              <Text style={[ s.body1 ]}>
                {phone}
              </Text>
            </View>
            <View style={[ s.row, s.mb1 ]}>
              <Icon name="link" size={18} {...s.grey} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.primary, { textDecorationLine: 'underline' } ]} onPress={() => Linking.openURL(website)}>
                {website}
              </Text>
            </View>
          </View>
        </View>
        <View style={[ s.backgroundWhite, s.flex, s.py2, s.pb4, s.mb4, { minHeight: 320 } ]}>
          <Text style={[ s.heading3, s.mx2, s.my1 ]}>Leurs engagements</Text>
          <View>
            <ScrollView horizontal snapToInterval={100} style={[ s.pt1, s.mb2, { borderBottomWidth: 1, borderColor: s.greyLight.color } ]} contentContainerStyle={[ s.px2 ]} showsHorizontalScrollIndicator={false}>
              {commitments?.map(({ label, children }, index, a) => (
                <TouchableOpacity onPress={() => setTabIndex(index)} style={[ s.row, index < a.length - 1 && s.mr2, s.px05, s.itemsCenter, s.pb1, tabIndex === index && { borderBottomWidth: 1, borderColor: s.primary.color } ]} activeOpacity={1} key={label}>
                  <Text style={[ s.body1, tabIndex === index ? s.primary : s.grey, s.bold ]}>{label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {commitments && commitments[0]?.children.map((_, i, a) => (
            <View style={[ s.row, s.mx2, s.itemsCenter, s.pr2,
              i === 0 && s.roundTop2,
              i === commitments[tabIndex]?.children.length-1 && s.roundBottom2,
              { borderWidth: 1, borderColor: commitments[tabIndex]?.children[i]?.label ? s.greyLight.color : 'transparent' },
              i < commitments[tabIndex]?.children.length-1 && { borderBottomWidth: 0 },
              s.p2 ]} key={`c-${i}`}>
              {/* <Icon name="thumb-up-fill" size={22} {...s.white} style={[ commitments[tabIndex]?.children[i]?.label && s.backgroundPrimary, s.round3, s.overflow, s.p2, s.mr1 ]} /> */}
              <Text style={[ s.body1, s.bold, s.flex, s.ml05 ]}>{commitments[tabIndex]?.children[i]?.label}</Text>
            </View>
          ))}
        </View>
        {/* <View style={[ { height: 100 } ]} /> */}
      </Animated.ScrollView>
      
      <Animated.View style={[ s.absolute, s.left, s.right, s.backgroundWhite, s.px2, s.pb1, s.px4, s.shadow1,
        { 
          // paddingTop: insets.top,
          transform: [
          {
            translateY: scroll.interpolate({
              inputRange: [120, 160],
              outputRange: [-100, 0],
              extrapolate: 'clamp',
            })
          }
        ] }
      ]}>
        <SafeAreaView>
          <Animated.Text style={[ s.heading6, s.center, { top: -Constants.statusBarHeight + s.s2 }, { 
            opacity: scroll.interpolate({
              inputRange: [160, 200],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              { translateY: scroll.interpolate({
                inputRange: [160, 200],
                outputRange: [-10, 0],
                extrapolate: 'clamp',
              }) }
            ]
          } ]} numberOfLines={1}>{name}</Animated.Text>
        </SafeAreaView>
      </Animated.View>
      <Animated.View style={[ s.absolute, s.p1, { paddingTop: s.s1, zIndex: 2 } ]}>
        <Button btnStyle='icon' iconName='arrow-left-line' onPress={navigation.goBack} />
      </Animated.View>
      <View style={[ s.absolute, s.bottom, s.right, s.left, s.p2, s.shadow3 ]}>
        <Button
          btnStyle='primary'
          label='J’y suis, localisez moi !'
          onPress={async () => {
            const { status } = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
              setToast('Une erreur est survenue')
            }
            const { coords: { longitude, latitude } } = await Location.getCurrentPositionAsync()
            console.log(location, id, [ latitude, longitude ])

            try {
              await checkLocation({ variables: { placeId: id, coordinates: [ latitude, longitude ] } })
              setToast('Bravo ! Vous avez gagné 50 points !')
              Animated.timing(fade, {
                toValue: 5,
                duration: 5000,
                useNativeDriver: true,
              }).start(() => fade.setValue(0))
              setDisabled(true)
            } catch (error) {
              setToast('Nous n’avons pas réussi à vous géolocaliser autour de cette addresse…')
              Animated.timing(fade, {
                toValue: 5,
                duration: 5000,
                useNativeDriver: true,
              }).start(() => fade.setValue(0))
            }
          }}
          style={[ s.mb1, disabled && s.backgroundGrey ]}
          disabled={disabled}
        />
      </View>
      {!!toast && (
        <Animated.View style={[ s.absolute, s.top, s.right, s.left, s.mx2, s.mt4, s.backgroundWhite, s.round2, s.py2, s.px2, { zIndex: 3 }, {
          transform: [
            { translateY: fade.interpolate({
              inputRange: [0, 0.02, 5-0.02, 5],
              outputRange: [-20, 0, 0, -20],
            }) }
          ],
          opacity: fade.interpolate({
            inputRange: [0, 0.02, 5-0.02, 5],
            outputRange: [0, 1, 1, 0],
          }),
          
        } ]}>
          <Text style={[ s.body1, s.primary, s.bold, s.mx1 ]}>{toast}</Text>
        </Animated.View>
      )}
    </View>
  )
}
