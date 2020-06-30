import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native'

import { categories, days, openOrClosed } from '../../utils/wording'

import Chip from "../atoms/Chip"
import RoundButton from "../atoms/RoundButton"
import Typo from "../atoms/Typography"
import Icon from '../atoms/Icon'
import { LinearGradient } from 'expo-linear-gradient'
import * as s from '../../styles'


const CardAddress = ({
  place: { name, category, headline, description, hours = [], tags = [], address: { distance } = {}, photos = [] } = {},
  onPress,
  full,
  style,
}) => {

  const { start, end } = { ...hours.filter(({ day }) => day === days[new Date().getDay()]).pop() }
  const [ open, openLabel ] = openOrClosed(start, end)

  return (
    <TouchableOpacity style={[ s.backgroundWhite, s.rounder, s.flex, !full && { width: 280 }, style ]} onPress={onPress} activeOpacity={1}>
      <ImageBackground style={[ { height: full ? 200 : 120 }, s.p2 ]} source={photos[0]} resizeMode='cover' borderRadius={16}>
        <LinearGradient colors={[ 'transparent', full ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)' ]} style={[ s.absolute, s.fill, s.rounder ]} />
        {/* {full && <Chip height={33} title="Gagnez des points en vous y rendant" />} */}
        {full && (
          <Text style={[ s.heading3, s.white, s.mtAuto ]} numberOfLines={2}>
            “{headline}”
          </Text>
        )}
      </ImageBackground>
      <View style={[ s.p2, s.pt1 ]}>
        <View style={[ s.row, s.itemsCenter, s.mt05, { height: 32 } ]}>
          <Icon name="restaurant-fill" size={14} {...s.grey} style={[ s.mr05 ]} />
          <Text style={[ s.body2, s.grey, s.mr1 ]}>{categories[category]}</Text>
          <Icon name="walk-fill" size={14} {...s.grey} style={[ s.mr05 ]} />
          <Text style={[ s.body2, s.grey, s.mrAuto ]}>{Math.round(distance / 100)} min</Text>
          {tags.some(({ label }) => label.includes('Vegan')) && <RoundButton backgroundColor="#DAEEE6" icon={<Icon name="leaf-fill" size={20} color="#44A881" />} />}
          {tags.some(({ label }) => label.includes('Handicap')) && <RoundButton backgroundColor="#EDECF8" icon={<Icon name="wheelchair-fill" size={20} color="#9188F6" />} />}
        </View>
        <Text style={[ s.heading5, s.mb05 ]} numberOfLines={1}>
          {name}
        </Text>
        {full && (
          <>
            <Text style={[ s.body1, s.overflow, s.rounded ]} numberOfLines={3}>{description}</Text>
            <View style={[ s.row, s.itemsCenter, s.mt1 ]}>
              <Text style={[ s.body2, s.grey ]}>
                <Text style={[ tags.some(({ label }) => label.includes('€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€€')) && s.black ]}>€</Text>
              </Text>
              <View style={[ s.backgroundGreyLight, { width: 1, height: 14 }, s.mx1 ]} />
              <Text style={[ s.body2, open ? s.primary : s.grey ]}>{openLabel}</Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

export function CardAddressSkeleton ({ onPress, full, style }) {
  return (
    <TouchableOpacity style={[ !full && { width: 280 }, style ]} onPress={onPress} activeOpacity={1}>
      <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: full ? 200 : 120 }, s.rounder ]} />
      <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: 16, width: '40%' }, s.rounded, s.m2 ]} />
      <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: 20, width: '60%' }, s.rounded, s.mx2 ]} />
      {full && (
        <>
          <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: 20 }, s.rounded, s.mt1, s.mx2 ]} />
          <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: 20 }, s.rounded, s.mt05, s.mx2 ]} />
          <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: 20 }, s.rounded, s.mt05, s.mx2 ]} />
          <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: 16, width: '20%' }, s.rounded, s.mt1, s.m2 ]} />
        </>
      )}
    </TouchableOpacity>
  )
}

export default CardAddress