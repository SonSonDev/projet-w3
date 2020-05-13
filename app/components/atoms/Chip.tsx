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
      width: "fit-content",
      padding: "1rem",
      backgroundColor: "#FAF7F2",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2,
    }
  });

  return (
    <View style={styles.container}>
      <Typography text={title} color={fontColor} fontWeight="bold" fontFamily="HKGrotesk-Regular" />
    </View>
  )
}

export default Chip;
