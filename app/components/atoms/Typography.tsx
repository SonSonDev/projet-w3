import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const image = { uri: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" };

interface TypoInterface {
  text: string;
  iconLeft?: any;
  iconRight?: any;
  color: string;
  fontStyle?: "normal" | "italic" | undefined,
  fontWeight?: "normal" | "bold" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  fontSize?: number,
  lineHeight?: number,
  fontFamily?: string;
}

const Typo = ({ text, iconLeft, fontFamily, iconRight, color, fontStyle, fontWeight, fontSize, lineHeight }: TypoInterface): React.ReactElement => {

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    img: {
      width: fontSize,
      height: fontSize,
    },
    text: {
      color: color,
      textAlign: "left",
      width: "100%",
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      fontSize: fontSize,
      lineHeight: lineHeight,
      fontFamily: fontFamily
    }
  });

  return (
    <View style={styles.container}>
      {iconLeft}
      {/* @ts-ignore  */}
      <Text style={styles.text}>{text}</Text>
      {iconRight}
    </View>
  )
}

export default Typo;
