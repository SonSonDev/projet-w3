import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform, TouchableOpacity, ImageBackground, StatusBar, Animated } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'

import { GET_PLACE, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"
import { GET_TAGS } from '../../graphql/tag'
import { CHECK_LOCATION } from '../../graphql/user'
import { categories, categoryIcons, categorySubtitles, days, dayIndexes, openOrClosed, prices } from '../../utils/wording'

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
  const scrollViewRef = useRef(null)
  const [ hoursCollapsed, setHoursCollapesed ] = useState(true)
  const [ toast, setToast ] = useState('')
  const { data: { getTags = [] } = {} } = useQuery(GET_TAGS, { variables: { where: { root: true } } })
  const [ tabIndex, setTabIndex ] = useState(0)
  const scroll = useRef(new Animated.Value(0)).current
  const fade = useRef(new Animated.Value(0)).current
  const hide = useRef(new Animated.Value(0)).current
  const [ disabled, setDisabled ] = useState(false)
  const [ checkLocation, { loading } ] = useMutation(CHECK_LOCATION)

  const { id, name, category, headline, description, hours = [], tags = [], address: { street, zipCode, city, location: { coordinates: [ latitude, longitude ] }, distance } = {}, user: { phone } = {}, social: { website, facebook, instagram } = {}, photos = [] } = place
  
  const allCommitments = getTags.find(({ label }) => label === 'Engagements')
  const commitments = allCommitments?.children.map(({ id, label, children }) => ({
    id, label,
    children: getCommitmentsNested(children).filter(({ label }) => tags.some(t => t.label === label)),
  })).filter(({ children }) => children.length).sort((a, b) => b.children.length - a.children.length)

  const { start, end } = { ...hours.filter(({ day }) => day === dayIndexes[new Date().getDay()]).pop() }
  const [ open, openLabel ] = openOrClosed(start, end)
  const getDay = day => [...hours].reverse().find(h => h.day === day)

  return (
    <View style={[ s.backgroundPale, s.flex ]}>
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
        ref={scrollViewRef}
      >
        <View style={[ s.backgroundPale, s.p2, s.pb3, s.flex, { borderTopLeftRadius: 16, borderTopRightRadius: 16 } ]}>
          <View style={[ s.row, s.itemsCenter, s.mb1 ]}>
            <Icon name={categoryIcons[category]} size={14} {...s.primary} style={[ s.mr05 ]} />
            <Text style={[ s.body2, s.primary, s.bold, s.mr1 ]}>{categories[category]}</Text>
            <Icon name="walk-fill" size={14} {...s.primary} style={[ s.mr05 ]} />
            <Text style={[ s.body2, s.primary, s.bold, s.mrAuto ]}>{Math.round(distance / 100)} min</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`http://maps.google.com/?daddr=${encodeURIComponent(`${street}, ${zipCode} ${city}`)}`)}
              style={[ s.py1, s.px2, s.row, s.itemsCenter, s.round2, { borderWidth: 1, borderColor: s.black.color } ]} activeOpacity={1}
            >
              <Icon name="navigation-line" size={18} />
              <Text style={[ s.body1, s.bold, s.ml05 ]}>Y aller</Text>
            </TouchableOpacity>
          </View>

          <View style={[ s.row ]}>
            {tags.some(({ label }) => label === 'Vegan') && (
              <View style={[ s.row, s.my1, s.p1, { backgroundColor: "#DAEEE6" }, s.selfStart, s.round2, s.mr1 ]}>
                <Icon name="leaf-fill" size={20} color="#0E562F" style={[ s.mr05 ]} />
                <Text style={[ s.body2, s.bold, { color: "#0E562F" } ]}>Option vegan</Text>
              </View>
            )}
            {tags.some(({ label }) => label === 'Handicap moteur') && (
              <View style={[ s.row, s.my1, s.p1, { backgroundColor: "#EDECF8" }, s.selfStart, s.round2 ]}>
                <Icon name="wheelchair-fill" size={20} color="#463DAB" style={[ s.mr05 ]} />
                <Text style={[ s.body2, s.bold, { color: "#463DAB" } ]}>Accès handicap moteur</Text>
              </View>
            )}
          </View>
          
          <Text style={[ s.heading2, s.mt1 ]}>
            {name}
          </Text>
          <Text style={[ s.heading6, s.mb2 ]}>
            {categorySubtitles[category].prefix}{getTags.find(({ label }) => label === categorySubtitles[category].tag)
              ?.children.find(({ label }) => tags.some(t => t.label === label))?.label}
          </Text>
          <Text style={[ s.body1, s.mb3 ]}>
            {description}
          </Text>
          <Text style={[ s.backgroundPrimary, s.py1, s.px1, s.body2, s.white, s.bold, s.round2, { overflow: 'hidden', alignSelf: 'flex-start' }, s.mb3 ]}>
            Géolocalisez-vous pour gagner 50 points
          </Text>

          <View>
            <View style={[ s.border, s.p2, s.roundTop3 ]}>
              <TouchableOpacity onPress={() => setHoursCollapesed(!hoursCollapsed)} style={[ s.row, s.itemsCenter ]} activeOpacity={1}>
                <Icon name="time-line" size={20} color={open ? '#1BC071' : s.grey.color} style={[ s.mr1 ]} />
                <Text style={[ s.body1, s.bold ]}>{openLabel}</Text>
                <Icon name={hoursCollapsed ? "arrow-drop-down-fill" : "arrow-drop-up-fill"} size={20} {...s.black} style={[ s.mlAuto ]} />
              </TouchableOpacity>
              {!hoursCollapsed && (
                <View style={[ s.mt1 ]}>
                  {Object.keys(days).map(day => (
                    <View style={[ s.row, s.mb05 ]} key={day}>
                      <Text style={[ s.body1, { flex: 1 } ]}>{days[day]}</Text>
                      <Text style={[ s.body1, s.primary, { flex: 2 } ]}>
                        {getDay(day)?.start ? `${getDay(day)?.start} - ${getDay(day)?.end}` : 'Fermé'}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            
            <View style={[ s.border, s.p2, { borderTopWidth: 0 }, s.row, s.itemsCenter ]}>
              <Icon name="money-euro-circle-line" size={20} {...s.primary} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.bold ]}>{prices[tags.find(t => t.label.includes('€'))?.label]} </Text>
              <Text style={[ s.body1, s.bold, s.grey ]}>
                <Text style={[ tags.some(({ label }) => label.includes('€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€€')) && s.black ]}>€</Text>
              </Text>
            </View>
            
            <View style={[ s.border, s.p2, { borderTopWidth: 0 }, s.row, s.itemsCenter ]}>
              <Icon name="phone-line" size={20} {...s.primary} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.bold ]}>{phone}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)} style={[ s.py1, s.px2, s.row, s.itemsCenter, s.round2, { marginVertical: -s.s1 },  { borderWidth: 1, borderColor: s.black.color }, s.mlAuto ]} activeOpacity={1}>
                <Icon name="phone-line" size={18} {...s.black} style={[ s.mr1 ]} />
                <Text style={[ s.body1, s.bold ]}>Appeler</Text>
              </TouchableOpacity>
            </View>
            <View style={[ s.border, s.p2, { borderTopWidth: 0 }, s.row, s.itemsCenter ]}>
              <Icon name="map-pin-2-line" size={20} {...s.primary} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.bold ]}>{street}</Text>
              <TouchableOpacity onPress={() => scrollViewRef?.current?.getNode()?.scrollToEnd()} style={[ s.py1, s.px2, s.row, s.itemsCenter, s.round2, { marginVertical: -s.s1 },  { borderWidth: 1, borderColor: s.black.color }, s.mlAuto ]} activeOpacity={1}>
                <Icon name="map-pin-line" size={18} {...s.black} style={[ ]} />
              </TouchableOpacity>
            </View>

            <View style={[ s.border, s.p2, { borderTopWidth: 0 } ]}>
              <TouchableOpacity onPress={() => Linking.openURL(instagram)} style={[ s.row, s.itemsCenter ]} activeOpacity={1}>
                <Icon name="instagram-line" size={20} {...s.primary} style={[ s.mr1 ]} />
                <Text style={[ s.body1, s.bold ]}>Page Instagram</Text>
              </TouchableOpacity>
            </View>
            <View style={[ s.border, s.p2, { borderTopWidth: 0 } ]}>
              <TouchableOpacity onPress={() => Linking.openURL(facebook)} style={[ s.row, s.itemsCenter ]} activeOpacity={1}>
                <Icon name="facebook-box-line" size={20} {...s.primary} style={[ s.mr1 ]} />
                <Text style={[ s.body1, s.bold ]}>Page Facebook</Text>
              </TouchableOpacity>
            </View>
            <View style={[ s.border, s.p2, { borderTopWidth: 0 }, s.roundBottom3 ]}>
              <TouchableOpacity onPress={() => Linking.openURL(website)} style={[ s.row, s.itemsCenter ]} activeOpacity={1}>
                <Icon name="link" size={20} {...s.primary} style={[ s.mr1 ]} />
                <Text style={[ s.body1, s.bold ]}>Site web</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[ s.backgroundWhite, s.flex, s.py3 ]}>
          <Text style={[ s.body2, s.grey, s.mx2 ]}>En détail</Text>
          <Text style={[ s.heading3, s.mx2, s.mb2 ]}>
            Ils s’engagent…
          </Text>
          <View>
            <ScrollView horizontal snapToInterval={100} style={[ s.pt1, s.mb2, { borderBottomWidth: 1, borderColor: s.greyLight.color } ]} contentContainerStyle={[ s.px2 ]} showsHorizontalScrollIndicator={false}>
              {commitments?.map(({ label, children }, index, a) => (
                <TouchableOpacity onPress={() => setTabIndex(index)} style={[ s.row, index < a.length - 1 && s.mr2, s.px05, s.itemsCenter, s.pb1, { borderBottomWidth: 1, borderColor: tabIndex === index ? s.primary.color : 'transparent' } ]} activeOpacity={1} key={label}>
                  <Text style={[ s.body1, tabIndex === index ? s.primary : s.black, s.bold ]}>{label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {commitments && commitments[0]?.children.map((_, i, a) => (
            <View style={[ s.row, s.mx2, s.itemsCenter, s.pr2,
              i === 0 && s.roundTop2,
              i === commitments[tabIndex]?.children.length-1 && s.roundBottom2,
              { borderWidth: 1, borderColor: commitments[tabIndex]?.children[i]?.label ? s.greyLight.color : 'transparent' },
              i < commitments[tabIndex]?.children.length-1 && { borderBottomColor: 'transparent' },
              s.p2 ]} key={`c-${i}`}>
              <Text style={[ s.body1, s.bold, s.flex, s.ml05 ]}>{commitments[tabIndex]?.children[i]?.label || ' '}</Text>
            </View>
          ))}
        </View>

        <View style={[ s.backgroundPale, s.pt3 ]}>
          <View style={[ s.round3, { height: 300 }, s.overflow, s.justifyCenter, s.itemsCenter, s.mx2 ]}>
            <MapView
              camera={{
                center: { latitude, longitude },
                pitch: 0,
                heading: 0,
                altitude: 100,
                zoom: 15,
              }}
              provider='google'
              style={[ { width: '100%', height: '100%' }, s.round3 ]}
            >
              <Marker
                coordinate={{ latitude, longitude }}
              />
            </MapView>
            <View style={[ s.absolute, s.right, s.left, s.bottom, s.row, s.backgroundWhite, s.p2, s.roundBottom3 ]}>
              <Icon name="map-pin-2-line" size={20} {...s.primary} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.bold, s.flex ]}>
                {street}, {zipCode} {city}
              </Text>
            </View>
          </View>
          <View style={[ { height: 100 } ]} />
        </View>
      </Animated.ScrollView>
      
      <Animated.View style={[ s.absolute, s.left, s.right, s.backgroundWhite, s.px2, s.pb1, s.px4, s.borderBottom,
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
        {/* <SafeAreaView style={[ s.backgroundGrey ]}> */}
          <Animated.Text style={[ s.heading6, s.center, s.pt2, s.pb1, {  }, { 
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
        {/* </SafeAreaView> */}
      </Animated.View>
      <Animated.View style={[ s.absolute, s.p1, { paddingTop: s.s1, zIndex: 2 } ]}>
        <Button btnStyle='icon' iconName='arrow-left-line' onPress={navigation.goBack} />
      </Animated.View>
      <View style={[ s.absolute, s.bottom, s.right, s.left ]}>
        <Button
          btnStyle='primary'
          label={loading ? 'Localisation en cours…' : 'J’y suis, localisez moi !'}
          onPress={async () => {
            const { status } = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
              setToast('Une erreur est survenue')
            }
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync()
            console.log({ latitude, longitude }, id)

            try {
              await checkLocation({ variables: { placeId: id, coordinates: [ latitude, longitude ] } })
              setToast('Vous vous êtes géolocalisés sur une adresse éco-responsable, 50 points de plus dans votre cagnotte !')
              Animated.timing(fade, {
                toValue: 5,
                duration: 5000,
                useNativeDriver: true,
              }).start(() => fade.setValue(0))
              setDisabled(true)
              Animated.spring(hide, {
                toValue: 1,
                speed: 1,
                useNativeDriver: true,
              }).start()
            } catch (error) {
              console.log(error)
              setToast('Vous êtes encore trop loin, rendez-vous à l’adresse de ce point d’intérêt pour vous y géolocaliser')
              Animated.timing(fade, {
                toValue: 5,
                duration: 5000,
                useNativeDriver: true,
              }).start(() => fade.setValue(0))
            }
          }}
          style={[ s.m2, s.shadow3, { transform: [
            {
              translateY: hide.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200],
              })
            }
          ] } ]}
          disabled={disabled}
        />
      </View>
      {!!toast && (
        <Animated.View style={[ s.absolute, s.row, s.itemsCenter, s.top, s.right, s.left, s.mx2, s.mt3, s.backgroundWhite, s.round3, s.py2, s.px2, { zIndex: 3 }, s.shadow2, {
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
          
        } ]} pointerEvents='none'>
          <Icon name={toast.includes('50') ? "check-line" : 'emotion-unhappy-line'} size={20} color={toast.includes('50') ? '#0E562F' : '#B4543A'} style={[ s.p1, s.round2, { backgroundColor: toast.includes('50') ? '#DAEEE6' : '#FBEAE9' }, s.overflow, s.mr1 ]} />
          <Text style={[ s.body1, s.bold, s.flex, s.mx1 ]}>{toast}</Text>
        </Animated.View>
      )}
    </View>
  )
}
