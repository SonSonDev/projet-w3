import React, { useState } from "react";
import { StatusBar, View, ScrollView, TouchableHighlight, Text, FlatList, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import Button from "../components/atoms/Button"
import IllustrationChallenges from "../assets/img/illu-challenges.svg"
import VectChallenges from "../assets/img/vect-challenges.svg"
import IconWinner from "../assets/img/ic-winner.svg"
import IconDIY from "../assets/img/ic-diy.svg"
import IconRecipe from "../assets/img/ic-recipe.svg"
import { CHECK_AUTH } from '../graphql/auth'
import * as s from "../styles";

export default function Challenges({ navigation }) {
  const { data: { checkAuthApp: userData } = {} } = useQuery(CHECK_AUTH)
  const [tabs, setTabs] = useState([
    { key: 'challenges', label: 'Défis de la semaine', selected: true },
    { key: 'ranking', label: 'Classement' },
  ])

  const getRewards = [
    {
      id: '11',
      type: 'diy',
      neededPts: 80,
    },
    {
      id: '12',
      type: 'recipe',
      neededPts: 80,
    },
  ]

  const getCompany = {
    employees: [
      {
        id: '1',
        firstName: 'Quentin',
        lastName: 'Lenglin',
        pts: '1230'
      },
      {
        id: '2',
        firstName: 'Mahel',
        lastName: 'Zeroual',
        pts: '1000'
      },
      {
        id: '3',
        firstName: 'Christella',
        lastName: 'Levieux',
        pts: '3000'
      },
    ]
  }

  const isOnChallengesTab = () => tabs.find(tab => tab.key === 'challenges').selected

  const toggleTab = (index) => {
    setTabs(tabs.map((tab, i) => ({...tab, selected: i === index})))
  }

  const participate = () => {}

  return (
    <ScrollView style={[s.flex, s.backgroundPale]}>
      <Text style={[s.body2, s.grey, s.px2, s.pt3]}>
        Bonjour { userData?.firstName } { userData?.lastName }
      </Text>
      <Text style={[s.heading4, s.px2, s.mb2]}>
        Vos défis de la semaine
      </Text>
      <FlatList 
        contentContainerStyle={[s.px2, s.py1, s.mb1]}
        data={tabs}
        horizontal
        renderItem={({ item, index }) => (
        <TouchableHighlight
          onPress={() => toggleTab(index)} 
          key={item.key}
          underlayColor="transparent">
          <View 
            style={[ { minHeight: 30, borderColor: '#949E9E', borderWidth: item.selected ? 0 : 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: item.selected ? '#BA5A40' : 'transparent' }, s.p1, s.mr1 ]}>
            <Text
              style={{ color: item.selected ? '#FFFFFF' : '#949E9E', fontSize: 16, textAlign: 'center' }}>{ item.label }</Text>
          </View>
        </TouchableHighlight>
      )}/>
      { isOnChallengesTab() ?
      <>
        <View style={[ s.flex, s.round3, s.mx2, s.p2, {backgroundColor: '#FBEAE9', overflow: 'hidden'}]}>
          <IllustrationChallenges style={[ s.absolute, {bottom: -48, right: -32}]} />
          <VectChallenges style={[s.absolute, s.bottom, s.left]} />
          <Text style={[s.heading2, {color:'#B4543A'}]}>Faites du tri</Text>
          <Text style={[s.mt05, s.mb4, s.body2, {width: '60%'}]}>Débarassez-vous du superflu en adoptant des méthodes de tri responsables</Text>
        </View>
        <Text style={[s.heading5, s.m2]}>À débloquer cette semaine...</Text>
        <FlatList
          style={[]}
          contentContainerStyle={[s.pl2, s.py1]}
          data={getRewards}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[s.round3, s.backgroundWhite, s.px3, s.py2, s.mr2, {flex: 1, flexDirection: 'row', alignItems: 'center'}]}
              key={item.id}
              horizontal>
              { item.type === 'diy' ? <IconDIY/> : <IconRecipe/>}
              <View style={[s.ml2]}>
                <Text style={[s.HKGroteskSemiBold]}>1 {item.type === 'diy' ? 'DIY' : 'recette'}</Text>
                <Text>{item.neededPts} pts</Text>
              </View>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </> :
      <>
        <Text style={[s.heading5, s.m2]}>Vos collègues sont déjà en course !</Text>
        <FlatList
          style={[s.mx2, s.p2, s.backgroundWhite, s.round3]}
          data={getCompany.employees.sort((a,b)=>Number(b.pts-a.pts))}
          renderItem={({item, index}) => (
            <View
              style={[s.round3, s.px2, s.py1, s.mb05, {flex: 1, flexDirection: 'row', alignItems: 'center'}, (index === 0) && [{backgroundColor: '#FFBB6B'}, s.py2]]}
              key={item.id}>
              {index === 0 ? <IconWinner/> : <Text style={[s.bold, {width: 22, textAlign: 'center'}]}>{index + 1}</Text>}
              <Text style={[s.pl2, s.bold, (index === 0 && s.white)]}>{item.firstName} {item.lastName}</Text>
              <Text style={[(index === 0 && s.white), {marginLeft: 'auto'}]}>{item.pts} pts</Text>
            </View>
          )}
        />
      </>
      }
      <Button btnStyle='primary' label='Je participe !' onPress={participate} style={[ s.mx2, s.my2 ]} />

    </ScrollView>
  );
}
