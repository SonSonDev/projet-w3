import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { themes } from '../../utils/wording'
import Chip from "../atoms/Chip";
import RoundButton from "../atoms/RoundButton";
import Typo from "../atoms/Typography";
import Icon from '../atoms/Icon';

import * as s from '../../styles/index.js'



const CardPost = ({
  large,
  medium,
  small,
  title,
  theme,
  photo,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        large && [{ }],
        medium && [{ }],
        small && [{ width: 300 }],
        style,
      ]}
    >
      <ImageBackground
        style={[{ height: large ? 320 : medium ? 160 : 160 }, s.p2]}
        source={photo}
        resizeMode="cover"
        borderRadius={16}
      >
        <LinearGradient
          colors={[
            "transparent",
            large ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.2)",
          ]}
          style={[s.absolute, s.fill, s.round3]}
        />
        {large && (
          <View style={[s.mtAuto, s.mx1, s.mb2]}>
            <Text style={[s.body2, s.white, s.mb1]} numberOfLines={1}>
              {themes[theme]}
            </Text>
            <Text style={[s.heading3, s.white, s.mtAuto]} numberOfLines={2}>
              {title}
            </Text>
          </View>
        )}
      </ImageBackground>
      {(medium || small) && (
        <View style={s.mt1}>
          <Text style={[s.body2, s.black]} numberOfLines={1}>
            {themes[theme]}
          </Text>
          <Text
            style={[medium ? s.heading5 : s.heading5, s.black, s.mtAuto, s.mb05]}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CardPost;
