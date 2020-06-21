import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Chip from "../atoms/Chip";
import RoundButton from "../atoms/RoundButton";
import Typo from "../atoms/Typography";
import Icon from '../atoms/Icon';

interface cardInterface {
  name: string;
  category: string;
  description: string;
  distance: number;
  headline: string;
  discription: string;
  tags?: [];
  photos: [];
  cardStyle?: "large" | "small";
}

const CardAddress = ({ cardStyle, name, category, headline, description, tags, photos }: cardInterface) => {
  let styles: any;
  const isSmall = () => cardStyle === "small";
  switch (cardStyle) {
    case "small":
      styles = StyleSheet.create({
        container: {
          width: 268,
          height: 221,
          boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.04)",
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
        },
        top: {
          flex: 1,
          backgroundColor: "#181A1E",
          borderRadius: 16,
        },
        topBg: {
          padding: 20,
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
        },
        bottom: {
          flex: 1,
          padding: 10,
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
      break;

    default:
      styles = StyleSheet.create({
        container: {
          width: 363,
          height: 387,
          boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.04)",
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
        },
        top: {
          flex: 1,
          backgroundColor: "#181A1E",
          borderRadius: 16,
        },
        topBg: {
          padding: 20,
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
        },
        bottom: {
          flex: 1,
          padding: 10,
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
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageBackground style={styles.topBg} source={photos[0]}>
          <View style={styles.topInfoTop}>
            {!isSmall() &&
              <Chip height={33} fontColor="#000" title="Gagnez des points en vous y rendant" />
            }
          </View>
          <View>
            {!isSmall() &&
              <Typo fontSize={24} lineHeight={30} fontWeight="normal" color="#fff" text={headline} />
            }
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bottom}>
        <View style={styles.info}>
          <View style={{ flexDirection: "row" }}>
            <Typo color="#BA5A40" fontSize={14} lineHeight={18} text="Fast Food" iconLeft={<Icon name="restaurant-fill" size={20} color="#BA5A40" />} />
            <Typo color="#BA5A40" fontSize={14} lineHeight={18} text="13 min" iconLeft={<Icon name="walk-line" size={20} color="#BA5A40" />} />
            {/* <Typo color="#000" fontSize={14} lineHeight={18} text={`${Math.round(distance)} m`} iconLeft /> */}
          </View>
          <View style={{ flexDirection: "row" }}>
            <RoundButton backgroundColor="#DAEEE6" icon={<Icon name="leaf-fill" size={20} color="#44A881" />} />
            <RoundButton backgroundColor="#EDECF8" icon={<Icon name="wheelchair-fill" size={20} color="#9188F6" />} />
          </View>
        </View>
        <Typo color="#181B1B" fontSize={24} lineHeight={31} fontFamily="HKGrotesk-Medium" text={name} />
        {!isSmall() &&
          <Typo color="##181B1B" fontFamily="HKGrotesk-Light" fontWeight={300} fontSize={16} lineHeight={24} text={description} />
        }
      </View>
    </View>
  )
}

export default CardAddress;