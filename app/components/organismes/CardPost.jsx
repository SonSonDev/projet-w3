import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Chip from "../atoms/Chip";
import RoundButton from "../atoms/RoundButton";
import Typo from "../atoms/Typography";
import Icon from '../atoms/Icon';
import { LinearGradient } from 'expo-linear-gradient'

import * as s from '../../styles/index.js'

// interface cardInterface {
//   title: string;
//   subtitle: string;
//   photos: any;
//   cardStyle?: "large" | "medium" | "small";
// }



const CardPost = ({large, medium, small, title, subtitle, photos}) => {

  return (
    <View style={[ 
      large && [{ width: 363, height: 400 }], 
      medium && [{ width: 363, height: 204}],
      small && [{width: 268, height: 151}]
    ]}>
      <ImageBackground style={[{ height: large ? 400 : medium ? 204 : 151 }, s.p2]} source={photos} resizeMode='cover' borderRadius={16}>
        <LinearGradient colors={['transparent', large ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.2)']} style={[s.absolute, s.fill, s.rounder]} />
        {large && (
          <View style={[s.mtAuto, s.mb3]}>
            <Text style={[s.body2, s.white, s.mb1]} numberOfLines={1}>
              {subtitle}
            </Text>
            <Text style={[s.heading3, s.white, s.mtAuto]} numberOfLines={2}>
              {title}
            </Text>
          </View>
        )}
      </ImageBackground>
      {(medium || small) && (
         <View style={s.mt2}>
          <Text style={[s.body2, s.black]} numberOfLines={1}>
            {subtitle}
          </Text>
          <Text style={[medium ? s.heading4 : s.heading5, s.black, s.mtAuto]} numberOfLines={2}>
            {title}
          </Text>
       </View>
      )}
    </View>
  )
}

export default CardPost;