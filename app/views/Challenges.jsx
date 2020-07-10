import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import getWeek from "date-fns/getWeek"
import setDay from "date-fns/setDay"
import format from "date-fns/format"
import { fr } from 'date-fns/locale'
import { useApolloClient } from "@apollo/react-hooks"

import { challengeContent, contextualisation } from "../utils/wording"
import VectChallenges from "../assets/img/vect-challenges.svg";
import Blob from "../assets/img/blob.svg";
import IconWinner from "../assets/img/ic-winner.svg";
import IconBlogpost from "../assets/img/ic-diy.svg";
import IconDIY from "../assets/img/ic-recipe.svg";
import Icon from "../components/atoms/Icon"

import { CHECK_AUTH } from '../graphql/auth'
import { VALIDATE_CHALLENGE } from '../graphql/user'
import { GET_REWARDS } from '../graphql/reward'
import * as s from "../styles";
import * as fns from "date-fns";

/* Page défis */
export default function Challenges({ navigation }) {
  const client = useApolloClient()
  /* Informations de l'utilisateur */
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  
  const weekPoints = userData?.history?.filter(item => getWeek(Number(item.date), { weekStartsOn: 1 }) === getWeek(Date.now(), { weekStartsOn: 1 }))
    .reduce((acc, cur) => acc + cur.bounty, 0)

  /* Onglets */
  const [tabs, setTabs] = useState([
    { key: 'challenges', label: 'Défis de la semaine', selected: true },
    { key: 'ranking', label: 'Classement' },
  ])
  // console.log(userData?.company?.challenges)
  const challengeList = userData?.company?.challenges.reduce((acc, cur, i) => {
    const day = new Date().getDay()
    if (i+1 <= day) {
      acc.push({
        ...cur,
        date: format(setDay(Date.now(), i+1), "E d", {locale: fr}).split('.').join(''),
        validated: userData.history.filter(({ date }) => {
          const msDate = new Date(parseInt(date));
          return fns.isThisWeek(msDate, { weekStartsOn: 1 });
        }).find(({ originId }) => originId === cur.id)?.bounty,
        selected: i+1 === day
      })
    }
    return acc
  }, []).reverse()

  const [validateChallenge] = useMutation(VALIDATE_CHALLENGE, {
    async update (cache, { data: { validateChallenge } }) {
      cache.writeQuery({
        query: CHECK_AUTH,
        data: { checkAuthApp: validateChallenge }
      })
      const challenge = validateChallenge.history[validateChallenge.history.length - 1]
      client.writeData({ data: {
        toast: challenge.bounty
          ? `SUCCESS::Bonne réponse ! Tu gagnes __${challenge.bounty} points__ dans ta cagnotte de la semaine !::${Date.now()}`
          : `FAIL::Mauvaise réponse ! Continue de lire le blog et retente ta chance::${Date.now()}`
      } })
    },
    onError: error => console.log(error.message) || client.writeData({ data: { toast: `FAIL::Une erreur est survenue::${Date.now()}` } }),
  })

  const participate = (challengeId) => {
    validateChallenge({ variables: { challengeId }})
  };

  const isOnChallengesTab = () =>
    tabs.find((tab) => tab.key === "challenges").selected;

  const toggleTab = (index) => {
    setTabs(tabs.map((tab, i) => ({ ...tab, selected: i === index })));
  };

  /* Récompenses */
  const { data: { getRewards: rewards } = {}} = useQuery(GET_REWARDS)
  const rewardsList = rewards?.filter(item => item?.article?.theme === userData?.company?.currentTheme)
    .reduce((acc, cur, i) => {
      acc.push({
        ...cur,
        value: (acc[i-1]?.value || 0) + cur.value
      })
      return acc
    }, []) || []
  
  return (
    <ScrollView style={[s.flex, s.backgroundPale]} stickyHeaderIndices={[0]}>
      <View style={[s.backgroundPale]}>
        <Text style={[s.body2, s.px2, s.pt3]}>
          {contextualisation().greeting || 'Bonjour'} {userData?.firstName}
        </Text>
        <Text style={[s.heading4, s.px2, s.mb1]}>
          Tes défis éco-responsables de la semaine
        </Text>
        {/* Onglets */}
        <View style={[s.mx2]}>
          <View horizontal snapToInterval={100} style={[s.row, s.pt1, { borderBottomWidth: 0, borderColor: s.greyLight.color }]} contentContainerStyle={[]} showsHorizontalScrollIndicator={false}>
            {tabs.map((item, index) => (
              <TouchableOpacity onPress={() => toggleTab(index)} style={[s.flex, s.justifyCenter, s.row, s.px05, s.itemsCenter, s.pb1, { borderBottomWidth: 1, borderColor: item.selected ? s.primary.color : s.greyLight.color }]} activeOpacity={1} key={item.label}>
                <Text style={[s.body1, item.selected ? s.primary : s.black, s.bold]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {isOnChallengesTab() ? (
        <>
          {/* Points cumulés */}
          <View style={[ s.mt2, s.flex, s.round3, s.mx2, s.p2, s.mb2, { backgroundColor: '#B4543A' }]}>
            <Text style={[s.body1, { color: '#FFFFFF' }]}>
              { weekPoints ? `Tu as déjà cumulé ${weekPoints} points cette semaine ! Continue de participer tous les jours !` : "Tu n'as obtenu aucun point cette semaine."}
            </Text>
          </View>

          {/* Thème de la semaine */}
          <View style={[s.flex, s.round3, s.mx2, s.p2, { backgroundColor: '#FBEAE9', overflow: 'hidden' }]}>
            <Blob style={[s.absolute, s.bottom, s.right]}/>
            { challengeContent[userData?.company.currentTheme]?.illustation([s.absolute, { bottom: -32, right: -32 }]) }
            <VectChallenges style={[s.absolute, s.bottom, s.left]} />
            <Text style={[s.heading2, { color: '#B4543A' }]}>{ challengeContent[userData?.company.currentTheme]?.title }</Text>
            <Text style={[s.mt05, s.mb4, s.body2, { width: '60%' }]}>{ challengeContent[userData?.company.currentTheme]?.text }</Text>
          </View>

          {/* Liste des défis */}
          <FlatList
            style={{width: '100%'}}
            data={challengeList}
            renderItem={({ item }) => (
              <View style={[s.px2, s.mt2, { flex: 1, flexDirection: 'row', alignItems: 'center'}]}>

                {/* Date du défi */}
                <View style={{flex: 0, alignItems: 'center', flexDirection: 'column', paddingBottom: 24, width: 48}}>
                  <Text style={[s.body1, s.bold, {textTransform: "capitalize"}, item.selected && {color: "#B4543A"}]}>{ item.date }</Text>
                  { 
                    item.selected ? (
                      <View style={{borderWidth: 8, padding: 4, borderColor:"#B4543A", borderRadius: 16}}/>
                    ) : (
                      <View 
                        style={[
                          item.validated ? {backgroundColor: "#0D6166", borderColor:"#DAEEEE"} : { backgroundColor: "#E8AEA2", borderColor:"#FBEAE9" },
                          {borderWidth: 4, padding: 4, margin: 4, borderRadius: 16}
                        ]}
                      />
                    )
                  }
                </View>

                {/* Détail du défi */}
                <View style={[s.backgroundWhite, s.border, s.round3, s.p2, s.ml2, {borderColor: item.selected ? "#B4543A" : "#FFFFFF", flex: 1, alignItems: "flex-start"}]}>
                  <Text style={[s.body1, s.bold, s.mb05, item.validated && !item.selected && s.pr3, {color: '#B4543A', lineHeight: 18}]}>{ item.name }</Text>
                  <Text style={[(item.selected || item.validated) && s.mb1]}>{ item.description }</Text>
                  { item.selected && !item.validated &&
                    <TouchableOpacity
                      style={[ s.py1, s.px2, s.row, s.itemsCenter, s.round2, { borderWidth: 1, borderColor: s.black.color } ]} activeOpacity={1}
                      onPress={() => participate(item.id)}>
                      <Text style={s.bold}>Je l'ai fait (+{item.value} pts)</Text>
                    </TouchableOpacity>
                  }

                  {/* Si le défi est validé */}
                  {
                    item.validated && (
                    <>
                      <View style={[ s.py1, s.px1, s.row, s.itemsCenter, s.round2, s.bold, { borderWidth: 1, borderColor: "#0D6166" } ]}>
                        <Icon name="check-fill" size={20} color="#0D6166" style={[{paddingTop: 1}]} />
                        <Text style={[s.ml1, {color: "#0D6166"}]}>{ item.validated } pts gagnés</Text>
                      </View>
                      {!item.selected && <Icon name="checkbox-circle-fill" color="#0D6166" size={20} style={[s.absolute, {top: 10, right : 10}]} />}
                    </>
                    )
                  }
                </View>
              </View>
            )}
          />

          {/* List de récompenses */}
          <Text style={[s.heading5, s.m2, s.mb1]}>À débloquer cette semaine...</Text>
          <FlatList
            style={[]}
            contentContainerStyle={[s.pl2, s.py1, s.mb1]}
            data={rewardsList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  s.round3,
                  s.backgroundWhite,
                  s.px3,
                  s.py2,
                  s.mr2,
                  { flex: 1, flexDirection: "row", alignItems: "center" },
                  !(weekPoints >= item.value) && { opacity: 0.5 },
                ]}
                key={item.id}
                activeOpacity={1}
                disabled={!(weekPoints >= item.value)}
                onPress={() => {
                  if (weekPoints >= item.value) navigation.navigate("Article", { article: item.article });
                }}
              >
                {item.type === "DIY" ? <IconDIY /> : <IconBlogpost />}
                <View style={[s.ml2]}>
                  <Text style={[s.HKGroteskSemiBold]}>
                    1 {item.type === "DIY" ? "DIY" : "recette"}
                  </Text>
                  <Text>{weekPoints > item.value ? item.value : weekPoints}/{item.value} pts</Text>
                </View>
                {weekPoints >= item.value && <Icon name="checkbox-circle-fill" color="#0D6166" size={20} style={[s.absolute, {top: 10, right : 10}]} />}
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
            style={[s.mx2, s.p2, s.backgroundWhite, s.round3, s.mb2]}
            data={userData?.company.users
              .map(({ id, firstName, history, lastName }) => {
                if (history.length <= 0) {
                  return { id, firstName, lastName, pts: "0" };
                } else {
                  const data = history.filter(({ date, originType, _CHALLENGE }) => {
                    const msDate = new Date(parseInt(date));
                    return fns.isThisWeek(msDate, { weekStartsOn: 1 })
                  });

                  const msgTotal = data.reduce((prev, cur) => {
                    return prev + cur.bounty;
                  }, 0);
                  return { id, firstName, lastName, pts: msgTotal };
                }
              })
              .sort((a, b) => b.pts - a.pts)}
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
                  <Text style={[s.bold, { width: 22, textAlign: "center" }, item.id === userData.id && s.primary]}>
                    {index + 1}
                  </Text>
                )}
                <Text style={[s.pl2, s.bold, item.id === userData.id && s.primary, index === 0 && s.white]}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={[item.id === userData.id && s.primary, index === 0 && s.white, { marginLeft: "auto" }]}>
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
