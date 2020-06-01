import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Chip from "../atoms/Chip";
import RoundButton from "../atoms/RoundButton";
import Typo from "../atoms/Typography";
import PricingIndicator from "../molecules/PricingIndicator";

const Card = ({ name, category, address: { distance }, headline, description, tags, photos }) => {
  const styles = StyleSheet.create({
    container: {
      margin: 10,
      width: 363,
      height: 379,
      background: "#FFFFFF",
      boxShadow: " 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.04)",
      borderRadius: 4,
    },
    top: {
      flex: 1,
      backgroundColor: "blue",
    },
    topBg: {
      padding: "1rem",
      flex: 1,
      display: "flex",
      justifyContent: "space-between",
    },
    bottom: {
      flex: 1,
      padding: "1rem",
    },
    info: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    topInfoTop: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })

  const image = { uri: "https://www.phenicia-marseille.fr/templates/images/img1.jpg" };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground style={styles.topBg} source={photos[0]}>
          <View style={styles.topInfoTop}>
            <Chip height={33} fontColor="#000" title="Géolocalisation : + 50 pts" />
            <RoundButton color="#000" />
          </View>
          <View>
            <Typo fontSize={18} lineHeight={22} fontWeight="normal" color="#fff" fontFamily="Moche" text={headline} />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bottom}>
        <View style={styles.info}>
          <View style={{ flexDirection: "row" }}>
            <Typo color="#000" fontSize={14} lineHeight={18} text="Européen" iconLeft />
            <Typo color="#000" fontSize={14} lineHeight={18} text={`${Math.round(distance)} m`} iconLeft />
          </View>
          <View style={{ flexDirection: "row" }}>
            <RoundButton outline color="#5A75D6" />
            <RoundButton outline color="#F98560" />
            <RoundButton outline color="#2C463C" />
          </View>
        </View>
        <Typo color="#000" fontSize={18} lineHeight={22} fontFamily="Moche" text={name} />
        <Typo color="#000" fontFamily="HKGrotesk-Regular" fontSize={16} lineHeight={16} text={description} />
        <View>
          <PricingIndicator cost="medium" />
          <Text> | Ouvert</Text>
        </View>
      </View>
    </View>
  )
}

export default Card;