import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native'

import { categories, categoryIcons, days, openOrClosed } from '../../utils/wording'

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
    <TouchableOpacity style={[ s.backgroundWhite, s.round3, s.flex, !full && { width: 280 }, style ]} onPress={onPress} activeOpacity={1}>
      <ImageBackground style={[ { height: full ? 200 : 120 }, s.p2 ]} source={photos[0]} resizeMode='cover' borderRadius={16}>
        <View style={[ s.backgroundPrimaryLight, s.absolute, s.fill, s.round3, { zIndex: -1 } ]} />
        <LinearGradient colors={[ 'transparent', full ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)' ]} style={[ s.absolute, s.fill, s.round3 ]} />
        {/* {full && <Chip height={33} title="Gagnez des points en vous y rendant" />} */}
        {full && (
          <Text style={[ s.heading3, s.white, s.mtAuto ]} numberOfLines={2}>
            “{headline}”
          </Text>
        )}
      </ImageBackground>
      <View style={[ s.p2, s.pt1 ]}>
        <View style={[ s.row, s.itemsCenter, s.mt05, { height: 32 } ]}>
          <Icon name={categoryIcons[category]} size={14} {...s.primary} style={[ s.mr05 ]} />
          <Text style={[ s.body2, s.primary, s.bold, s.mr1 ]}>{categories[category]}</Text>
          <Icon name="walk-fill" size={14} {...s.primary} style={[ s.mr05 ]} />
          <Text style={[ s.body2, s.primary, s.bold, s.mrAuto ]}>{Math.round(distance / 100)} min</Text>
          {tags.some(({ label }) => label.includes('Vegan')) && <RoundButton backgroundColor="#DAEEE6" icon={<Icon name="leaf-fill" size={20} color="#44A881" />} />}
          {tags.some(({ label }) => label.includes('Handicap')) && <RoundButton backgroundColor="#EDECF8" icon={<Icon name="wheelchair-fill" size={20} color="#9188F6" />} />}
        </View>
        <Text style={[ s.heading5, s.mb05 ]} numberOfLines={1}>
          {name}
        </Text>
        {full && (
          <>
            <Text style={[ s.body1, s.overflow, s.mb1 ]} numberOfLines={3}>{description}</Text>
            {/* <View style={[ s.row, s.itemsCenter, s.mt1 ]}>
              <Text style={[ s.body2, s.grey ]}>
                <Text style={[ tags.some(({ label }) => label.includes('€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€')) && s.black ]}>€</Text>
                <Text style={[ tags.some(({ label }) => label.includes('€€€')) && s.black ]}>€</Text>
              </Text>
              <View style={[ s.backgroundGreyLight, { width: 1, height: 14 }, s.mx1 ]} />
              <Text style={[ s.body2, open ? s.primary : s.grey ]}>{openLabel}</Text>
            </View> */}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

export function CardAddressSkeleton ({ onPress, full, style }) {
  return (
    <TouchableOpacity style={[ s.flex, !full && { width: 363 }, style ]} onPress={onPress} activeOpacity={1}>
      <View style={[ { backgroundColor: 'rgba(0, 0, 0, 0.02)', height: full ? 200 : 120 }, s.round3 ]} />
      <View style={[ s.p2, s.pt1 ]}>
        <View style={[ s.row, s.itemsCenter, s.mt05, { height: 32 } ]}>
          <Text style={[ s.body2, { backgroundColor: 'rgba(0, 0, 0, 0.02)', width: full ? '40%' : '60%' } ]}>{' '}</Text>
        </View>
        <Text style={[ s.heading5, s.mb05, { backgroundColor: 'rgba(0, 0, 0, 0.02)', width: full ? '60%' : '80%' } ]} numberOfLines={1}>{' '}</Text>
        {full && (
          <>
            <Text style={[ s.body1, { backgroundColor: 'rgba(0, 0, 0, 0.02)' }, s.mb1 ]} numberOfLines={3}>{'\n\n'}</Text>
            {/* <View style={[ s.row, s.itemsCenter, s.mt1 ]}>
              <Text style={[ s.body2, { backgroundColor: 'rgba(0, 0, 0, 0.02)', width: '20%' } ]}>{' '}</Text>
            </View> */}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CardAddress