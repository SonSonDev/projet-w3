import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const image = { uri: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" };

interface TypoInterface {
  text: string;
  iconLeft?: any;
  iconRight?: any;
  color: string;
  fontFamily?: string;
  fontStyle?: "normal" | "italic" | undefined,
  fontWeight?: "normal" | "bold",
  fontSize?: number,
  lineHeight?: number,
}

const Typo = ({ text, iconLeft, iconRight, color, fontFamily, fontStyle, fontWeight , fontSize, lineHeight}: TypoInterface): React.ReactElement => {

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
      // fontFamily: fontFamily,
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      fontSize: fontSize,
      lineHeight: lineHeight,
    }
  });

  return (
    <View style={styles.container}>
      {iconLeft &&
        <Image
          style={styles.img}
          source={image}
        />
      }

      <Text style={styles.text}>{text}</Text>

      {iconRight &&
        <Image
          style={styles.img}
          source={image}
        />
      }
    </View>
  )
}

export default Typo;
