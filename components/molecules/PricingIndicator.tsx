import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typo from "../atoms/Typography";

interface PricingIndicatorInterface {
  cost: "low" | "medium" | "high";
}

const PricingIndicator = ({ cost }: PricingIndicatorInterface): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
    },
  });

  return (
    <View style={styles.container}>
      <Typo color="#000" text="€" />
      <Typo color={cost === "medium" || "hight" ? "#000" : "#9E9794"} text="€" />
      <Typo color={cost === "high" ? "#000" : "#9E9794"} text="€" />
    </View>
  )
}

export default PricingIndicator;
