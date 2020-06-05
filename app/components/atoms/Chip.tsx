import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from "./Typography";

interface ChipsInterface {
  title: string;
  fontColor: string;
  height: number;
}

const Chip = ({ title, fontColor, height }: ChipsInterface): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      height: height,
      padding: "7.5 8",
      paddingBottom: 7.5,
      paddingTop: 7.5,
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: "#FAF7F2",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    }
  });

  return (
    <View style={styles.container}>
      <Typography text={title} color={fontColor} fontWeight={400} fontFamily="HKGrotesk-Regular" />
    </View>
  )
}

export default Chip;
