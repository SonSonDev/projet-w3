import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import getWeek from "date-fns/getWeek"
import setDay from "date-fns/setDay"
import format from "date-fns/format"
import { fr } from 'date-fns/locale'

import IllustrationChallenges from "../assets/img/illu-challenges.svg";
import VectChallenges from "../assets/img/vect-challenges.svg";
import IconWinner from "../assets/img/ic-winner.svg";
import IconDIY from "../assets/img/ic-diy.svg";
import IconRecipe from "../assets/img/ic-recipe.svg";

import { CHECK_AUTH } from '../graphql/auth'
import * as s from "../styles";
import * as fns from "date-fns";

/* Page défis */
export default function Challenges({ navigation }) {
  /* Informations de l'utilisateur */
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  const weekPoints = userData.history?.filter(item => getWeek(Number(item.date)) === getWeek(Date.now()))
    .reduce((acc, cur) => acc + cur.bounty, 0)

  /* Onglets */
  const [tabs, setTabs] = useState([
    { key: 'challenges', label: 'Défis de la semaine', selected: true },
    { key: 'ranking', label: 'Classement' },
  ])

  const challengeList = userData.company.challenges.reduce((acc, cur, i) => {
    const day = new Date().getDay()
    if (i+1 <= day) {
      acc.push({
        ...cur,
        date: format(setDay(Date.now(), i+1), "E d", {locale: fr}).split('.').join(''),
        selected: i+1 === day
      })
    }
    return acc
  }, []).reverse()

  /* TODO: Liste des récompense */
  const getRewards = [
    {
      id: "11",
      type: "diy",
      neededPts: 80,
    },
    {
      id: "12",
      type: "recipe",
      neededPts: 80,
    },
  ];

  const isOnChallengesTab = () =>
    tabs.find((tab) => tab.key === "challenges").selected;

  const toggleTab = (index) => {
    setTabs(tabs.map((tab, i) => ({ ...tab, selected: i === index })));
  };

  const participate = () => {};
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return (
    <ScrollView style={[s.flex, s.backgroundPale]} stickyHeaderIndices={[0]}>
      <View style={[s.backgroundPale]}>
        <Text style={[s.body2, s.px2, s.pt3]}>
          Bonjour {userData?.firstName}
        </Text>
        <Text style={[s.heading4, s.px2, s.mb2]}>
          Tes défis éco-responsables de la semaine
        </Text>
      </View>

      <View style={[s.mx2, s.mt2]}>
        <View horizontal snapToInterval={100} style={[s.row, s.pt1, s.mb2, { borderBottomWidth: 1, borderColor: s.greyLight.color }]} contentContainerStyle={[]} showsHorizontalScrollIndicator={false}>
          {tabs.map((item, index) => (
            <TouchableOpacity onPress={() => toggleTab(index)} style={[s.flex, s.justifyCenter, s.row, s.px05, s.itemsCenter, s.pb1, { borderBottomWidth: 1, borderColor: item.selected ? s.primary.color : 'transparent' }]} activeOpacity={1} key={item.label}>
              <Text style={[s.body1, item.selected ? s.primary : s.black, s.bold]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isOnChallengesTab() ? (
        <>
          <View style={[s.flex, s.round3, s.mx2, s.p2, s.mb2, { backgroundColor: '#B4543A' }]}>
            <Text style={[s.body1, { color: '#FFFFFF' }]}>
              { weekPoints ? `Tu as déjà cumulé ${weekPoints} points cette semaine ! Continue de participer tous les jours !` : "Tu n'as obtenu aucun point cette semaine."}
            </Text>
          </View>
          <View style={[s.flex, s.round3, s.mx2, s.p2, { backgroundColor: '#FBEAE9', overflow: 'hidden' }]}>
            <IllustrationChallenges style={[s.absolute, { bottom: -48, right: -32 }]} />
            <VectChallenges style={[s.absolute, s.bottom, s.left]} />
            <Text style={[s.heading2, { color: '#B4543A' }]}>Faites du tri</Text>
            <Text style={[s.mt05, s.mb4, s.body2, { width: '60%' }]}>Débarassez-vous du superflu en adoptant des méthodes de tri responsables</Text>
          </View>

          <FlatList
            style={{width: '100%'}}
            data={challengeList}
            renderItem={({ item, index }) => (
              <View style={[s.px2, s.mt2, { flex: 1, flexDirection: 'row', alignItems: 'center'}]}>
                <View style={{flex: 0, alignItems: 'center', flexDirection: 'column', paddingBottom: 20, width: 48}}>
                  <Text style={[s.bold, {textTransform: "capitalize"}, item.selected && {color: "#B4543A"}]}>{ item.date }</Text>
                  <View style={{borderWidth: 8, borderColor: item.selected ? "#B4543A" : "#DDDDDD", borderRadius: 16}}>
                    <View style={{borderWidth: 4, borderColor: "#FFFFFF", borderRadius: 16}}></View>
                  </View>
                </View>

                <View style={[s.backgroundWhite, s.border, s.round3, s.p2, s.ml2, {borderColor: "#B4543A", flex: 1, alignItems: "flex-start"}]}>
                  <Text style={[s.body1, s.bold, s.mb05, {color: '#B4543A', lineHeight: 18}]}>{ item.name }</Text>
                  <Text style={[item.selected && s.mb1]}>{ item.description }</Text>
                  { item.selected &&
                    <TouchableOpacity
                      style={[ s.py1, s.px2, s.row, s.itemsCenter, s.round2, { borderWidth: 1, borderColor: s.black.color } ]} activeOpacity={1}>
                      <Text style={s.bold}>Je l'ai fait (+{item.value} pts)</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            )}
          />
          <Text style={[s.heading5, s.m2, s.mb1]}>À débloquer cette semaine...</Text>
          <FlatList
            style={[]}
            contentContainerStyle={[s.pl2, s.py1]}
            data={getRewards}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  s.round3,
                  s.backgroundWhite,
                  s.px3,
                  s.py2,
                  s.mr2,
                  { flex: 1, flexDirection: "row", alignItems: "center" },
                ]}
                key={item.id}
                horizontal
              >
                {item.type === "diy" ? <IconDIY /> : <IconRecipe />}
                <View style={[s.ml2]}>
                  <Text style={[s.HKGroteskSemiBold]}>
                    1 {item.type === "diy" ? "DIY" : "recette"}
                  </Text>
                  <Text>{item.neededPts} pts</Text>
                </View>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          <Text style={[s.heading5, s.m2]}>
            Vos collègues sont déjà en course !
          </Text>
          <FlatList
            style={[s.mx2, s.p2, s.backgroundWhite, s.round3]}
            data={userData.company.users
              .map(({ firstName, history, lastName }) => {
                if (history.length <= 0) {
                  return { firstName, lastName, pts: "0" };
                } else {
                  const data = history.filter(({ date }) => {
                    const msDate = new Date(parseInt(date));
                    return fns.isThisWeek(msDate, { weekStartsOn: 1 });
                  });

                  const msgTotal = data.reduce((prev, cur) => {
                    return prev + cur.bounty;
                  }, 0);
                  return { firstName, lastName, pts: msgTotal };
                }
              })
              .sort((a, b) => a.pts <= b.pts)}
            renderItem={({ item, index }) => (
              <View
                style={[
                  s.round3,
                  s.px2,
                  s.py1,
                  s.mb05,
                  { flex: 1, flexDirection: "row", alignItems: "center" },
                  index === 0 && [{ backgroundColor: "#B4543A" }, s.py2],
                ]}
                key={item.id}
              >
                {index === 0 ? (
                  <IconWinner />
                ) : (
                  <Text style={[s.bold, { width: 22, textAlign: "center" }]}>
                    {index + 1}
                  </Text>
                )}
                <Text style={[s.pl2, s.bold, index === 0 && s.white]}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={[index === 0 && s.white, { marginLeft: "auto" }]}>
                  {item.pts} pts
                </Text>
              </View>
            )}
          />
        </>
      )}
    </ScrollView>
  );
}
