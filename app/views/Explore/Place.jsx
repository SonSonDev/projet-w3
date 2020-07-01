import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList, Platform, TouchableOpacity, ImageBackground, StatusBar, Animated } from 'react-native'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants'

import { GET_PLACE, DELETE_PLACE, UPSERT_PLACES } from "../../graphql/place"
import { GET_TAGS } from '../../graphql/tag'
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
  const { data: { getTags = [] } = {}, loading } = useQuery(GET_TAGS, { variables: { where: { root: true } } })
  const [ tabIndex, setTabIndex ] = useState(0)
  const scroll = useRef(new Animated.Value(0)).current

  const { name, category, headline, description, hours = [], tags = [], address: { street, zipCode, city, distance } = {}, user: { phone } = {}, social: { website } = {}, photos = [] } = place
  
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
        contentContainerStyle={[ { paddingTop: 160 } ]}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }])}
      >
        {/* <Text style={[ s.backgroundPale, s.py1, s.px2, s.body2, s.bold, s.rounded, { overflow: 'hidden', alignSelf: 'flex-start' }, s.mtAuto, s.mb2, s.mx2 ]}>Gagnez des points en vous y rendant</Text> */}
        <View style={[ s.backgroundPale, s.p2, s.flex, { borderTopLeftRadius: 16, borderTopRightRadius: 16 } ]}>
          <View style={[ s.row, s.itemsCenter, s.mt05, { height: 32 } ]}>
            <Icon name={categoryIcons[category]} size={14} {...s.grey} style={[ s.mr05 ]} />
            <Text style={[ s.body2, s.grey, s.mr1 ]}>{categories[category]}</Text>
            <Icon name="walk-fill" size={14} {...s.grey} style={[ s.mr05 ]} />
            <Text style={[ s.body2, s.grey, s.mrAuto ]}>{Math.round(distance / 100)} min</Text>
            {tags.some(({ label }) => label.includes('Vegan')) && <RoundButton backgroundColor="#DAEEE6" icon={<Icon name="leaf-fill" size={20} color="#44A881" />} />}
            {tags.some(({ label }) => label.includes('Handicap')) && <RoundButton backgroundColor="#EDECF8" icon={<Icon name="wheelchair-fill" size={20} color="#9188F6" />} />}
          </View>
          <Text style={[ s.heading2, s.mt1, s.mb1 ]}>
            {name}
          </Text>
          <Text style={[ s.body1, s.mb2 ]}>
            {description}
          </Text>
          <View style={[ s.row, s.mb3 ]}>
            <TouchableOpacity onPress={() => {}} style={[ s.py1, s.px2, s.row, s.itemsCenter, s.rounded, { borderWidth: 1, borderColor: s.black.color }, s.mr1 ]} activeOpacity={1}>
              <Icon name="navigation-line" size={18} />
              <Text style={[ s.body1, s.bold, s.ml05 ]}>Y aller</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={[ s.py1, s.px2, s.row, s.itemsCenter, s.rounded, { borderWidth: 1, borderColor: s.black.color } ]} activeOpacity={1}>
              <Icon name="phone-line" size={18} />
              <Text style={[ s.body1, s.bold, s.ml05 ]}>Appeler</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={[ s.row, s.mb1 ]}>
              <Icon name="money-euro-circle-line" size={18} {...s.grey} style={[ s.mr1 ]} />
              <Text style={[ s.body1, s.grey ]}>
                <Text style={[ tags.some(({ label }) => label.includes('€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€€')) && s.black ]}>€</Text>
              </Text>
            </View>
            <View style={[ s.row, s.mb1 ]}>
              <Icon name="map-pin-2-line" size={18} {...s.grey} style={[ s.mr1 ]} />
              <Text style={[ s.body1 ]}>
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
              <Text style={[ s.body1 ]}>
                {website}
              </Text>
            </View>
          </View>
        </View>
        <View style={[ s.backgroundWhite, s.flex, s.pb1, { minHeight: 240 } ]}>
          <View>
            <ScrollView horizontal snapToInterval={100} style={[ s.pt1, s.mb2 ]} contentContainerStyle={[ s.px2, { borderBottomWidth: 1, borderColor: s.greyLight.color } ]}>
              {commitments?.map(({ label, children }, index) => (
                <TouchableOpacity onPress={() => setTabIndex(index)} style={[ s.row, s.mr2, s.itemsCenter, s.pb1, tabIndex === index && { borderBottomWidth: 1, borderColor: s.primary.color }, { bottom: -1 } ]} activeOpacity={1} key={label}>
                  <Text style={[ s.body2, tabIndex === index && s.primary, s.bold ]}>{label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {commitments && commitments[0]?.children.map((_, i) => (
            <View style={[ s.row, s.mx2, s.itemsCenter, s.pr2, s.rounded, { borderBottomWidth: 1, borderColor: commitments[tabIndex]?.children[i]?.label ? s.greyLight.color : 'transparent' }, s.mb1 ]} key={`c-${i}`}>
              <Icon name="thumb-up-fill" size={22} {...s.white} style={[ commitments[tabIndex]?.children[i]?.label && s.backgroundPrimary, s.p2, s.mr1 ]} />
              <Text style={[ s.body1, s.flex, s.ml05 ]}>{commitments[tabIndex]?.children[i]?.label}</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
      
      <Animated.View style={[ s.absolute, s.left, s.right, s.backgroundWhite, s.px2, s.pb1, s.px4,
        { 
          paddingTop: Constants.statusBarHeight,
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
        } ]}>{name}</Animated.Text>
      </Animated.View>
      <Animated.View style={[ s.absolute, s.p1, { paddingTop: s.s1, zIndex: 2 } ]}>
        <Button btnStyle='icon' iconName='arrow-left-line' onPress={navigation.goBack} style={[  ]} />
      </Animated.View>
    </View>
  )
}
