import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

interface ButtonInterface {
  title: string;
  outline?: boolean;
  iconLeft?: any;
  iconRight?: any;
  color: string;
  width: number;
  height: number;
  textColor?: string;
}

const Button = ({ height, width, title, color, outline, iconLeft, iconRight, textColor }: ButtonInterface): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: outline ? "" : color,
      flexDirection: "row",
      borderWidth: outline ? 1 : 0,
      borderColor: outline ? color : "",
      borderRadius: outline ? 2 : 0,
    },
    text: {
      color: textColor,
    },
    img: {
      width: 25,
      height: 25
    },
  });

  const image = { uri: "https://www.pinclipart.com/picdir/middle/485-4851736_free-png-search-icon-search-icon-free-download.png" };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {iconLeft &&
          <Image
            style={styles.img}
            source={image}
          />
        }

        <Text style={styles.text}>{title}</Text>

        {iconRight &&
          <Image
            style={styles.img}
            source={image}
          />
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Button;
