import React from 'react';
import { StyleSheet, View } from 'react-native';

interface RoundButtonInterface {
  outline?: boolean;
  color: string;
}

const RoundButton = ({ outline = false, color }: RoundButtonInterface) => {
  const styles = StyleSheet.create({
    container: {
      width: 40,
      height: 40,
      backgroundColor: "#FFFFFF",
      borderRadius: 50,
      borderWidth: outline ? 2 : 0,
      borderColor: outline ? color : "",
      marginLeft: 5,
    }
  });

  return (
    <View style={styles.container}></View>
  )
}

export default RoundButton;