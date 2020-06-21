import React from 'react';
import { StyleSheet, View } from 'react-native';

interface RoundButtonInterface {
  backgroundColor: string;
  icon: any;
}

const RoundButton = ({ backgroundColor, icon }: RoundButtonInterface) => {
  const styles = StyleSheet.create({
    container: {
      width: 32,
      height: 32,
      backgroundColor: backgroundColor,
      borderRadius: 8,
      marginLeft: 5,
      justifyContent: "center",
      alignItems: "center",
    }
  });

  return (
    <View style={styles.container}>
      {icon}
    </View>
  )
}

export default RoundButton;