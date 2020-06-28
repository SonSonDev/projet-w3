import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import Chip from "../atoms/Chip";
import RoundButton from "../atoms/RoundButton";
import Typo from "../atoms/Typography";
import Icon from '../atoms/Icon';
import { LinearGradient } from 'expo-linear-gradient'
import * as s from '../../styles'

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

const categoryNames = {
  FOOD: "Restaurant",
  SHOP: "Boutique",
  ACTIVITY: "Activité",
}

const days = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
}

const CardAddress = ({ cardStyle, name, category, headline, description, hours, tags, address: { distance }, photos, style }: cardInterface) => {
  let styles: any;
  const isSmall = () => cardStyle === "small";
  switch (cardStyle) {
    case "small":
      styles = StyleSheet.create({
        container: {
          width: 268,
          height: 221,
          // boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.04)",
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
          // width: 363,
          // height: 387,
          // boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.04)",
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
        },
        top: {
          flex: 1,
          backgroundColor: "#181A1E",
          borderRadius: 16,
        },
        topBg: {
          padding: 16,
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          height: 200,
        },
        bottom: {
          flex: 1,
          padding: 16,
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

  const { start, end } = hours.filter(({ day }) => day === days[new Date().getDay()]).pop()
  const [ startDate, endDate ] = [ start && new Date().setHours(...start.split(':')), end && new Date().setHours(...end.split(':')) ]

  return (
    <View style={[ styles.container, style ]}>
      <View style={styles.top}>
        <ImageBackground style={styles.topBg} source={photos[0]} resizeMode='cover' borderRadius={16} >
          <LinearGradient colors={[ 'transparent', 'rgba(0,0,0,0.8)' ]} style={[ s.absolute, s.fill, s.rounder ]} />
          {/* <View style={styles.topInfoTop}>
            {!isSmall() &&
              <Chip height={33} fontColor="#000" title="Gagnez des points en vous y rendant" />
            }
          </View> */}
          {!isSmall() &&
            <Text style={[ s.heading3, s.white, s.mtAuto ]} numberOfLines={2}>
              “{headline}”
            </Text>
          }
        </ImageBackground>
      </View>
      <View style={[ s.p2, s.pt1 ]}>
        <View style={[ s.row, s.itemsCenter, s.flex, s.mt05, { height: 32 } ]}>
          <Icon name="restaurant-fill" size={14} {...s.grey} style={[ s.mr05 ]} />
          <Text style={[ s.body2, s.grey, s.mr1 ]}>{categoryNames[category]}</Text>
          <Icon name="walk-fill" size={14} {...s.grey} style={[ s.mr05 ]} />
          <Text style={[ s.body2, s.grey, s.mrAuto ]}>{Math.round(distance / 100)} min</Text>
          {tags.some(({ label }) => label.includes('Vegan')) && (
            <RoundButton backgroundColor="#DAEEE6" icon={<Icon name="leaf-fill" size={20} color="#44A881" />} />
          )}
          {tags.some(({ label }) => label.includes('Handicap')) && (
            <RoundButton backgroundColor="#EDECF8" icon={<Icon name="wheelchair-fill" size={20} color="#9188F6" />} />
          )}
        </View>
        <Text style={[ s.heading5, s.mb05 ]}>{name}</Text>
        {!isSmall() &&
          <Text style={[ s.body1 ]} numberOfLines={3}>
            {description}
          </Text>
        }
        <View style={[ s.row, s.itemsCenter, s.mt1 ]}>
          <Text style={[ s.body2, s.grey ]}>
            <Text style={[ tags.some(({ label }) => label.includes('€')) && s.black ]}>€</Text>
            <Text style={[ tags.some(({ label }) => label.includes('€€')) && s.black ]}>€</Text>
            <Text style={[ tags.some(({ label }) => label.includes('€€€')) && s.black ]}>€</Text>
          </Text>
          <View style={[ s.backgroundGreyLight, { width: 1, height: 14 }, s.mx1 ]} />
          {startDate && Date.now() >= startDate && endDate && Date.now() <= endDate ? (
            <Text style={[ s.body2, s.primary ]}>Ouvert</Text>
          ) : (
            <Text style={[ s.body2, s.grey ]}>Fermé</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default CardAddress;