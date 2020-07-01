import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as s from "../../styles/index.js";

const CardPost = ({
  large,
  medium,
  small,
  title,
  theme,
  photos,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        large && [{ width: 363, height: 400 }],
        medium && [{ width: 363 }],
        small && [{ width: 268 }],
        style,
      ]}
    >
      <ImageBackground
        style={[{ height: large ? 400 : medium ? 204 : 151 }, s.p2]}
        source={photos}
        resizeMode="cover"
        borderRadius={16}
      >
        <LinearGradient
          colors={[
            "transparent",
            large ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.2)",
          ]}
          style={[s.absolute, s.fill, s.rounder]}
        />
        {large && (
          <View style={[s.mtAuto, s.mb3]}>
            <Text style={[s.body2, s.white, s.mb1]} numberOfLines={1}>
              {theme}
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
            {theme}
          </Text>
          <Text
            style={[medium ? s.heading4 : s.heading5, s.black, s.mtAuto]}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CardPost;
