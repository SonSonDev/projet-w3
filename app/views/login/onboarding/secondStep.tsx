import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView, Text, Image } from 'react-native';

import Button from "../../../components/atoms/Button";
import Steps from "../../../components/atoms/Steps";
import Filter from "../../../components/atoms/Filter";

import * as s from "../../../styles/index";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#FAF7F2',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  mainContainer: {
    // width: 'calc(100% - 48px)',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // height: '100%'
  },
  h1: {
    fontSize: 40,
    // fontFamily: "Maragsa",
    color: "#181B1B",
    marginBottom: 16,
    textAlign: 'center',
    // width: '75%',
    maxWidth: 340,
  },
  body1: {
    ...s.body1,
    color: "#181B1B",
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: s.body1.fontSize * 1.5,
    // width: '75%',
    maxWidth: 340,
  },
  illu: {
    position: 'absolute',
    height: '40%',
    width: '45%',
    right: 0,
  },
  img: {
    width: 84,
    height: 88
  },
});

export default function OBSecondStep() {

  const [filterList, setFilterList] = useState([{
    label: 'Casher',
    selected: false,
    isUnique: false
  }, {
    label: 'Halal',
    selected: false,
    isUnique: false
  }, {
    label: 'Sans-gluten',
    selected: false,
    isUnique: false
  }, {
    label: 'Vegan',
    selected: false,
    isUnique: false
  },
  {
    label: 'Végétarien',
    selected: false,
    isUnique: false
  },
  {
    label: 'Pas de restrictions',
    selected: false,
    isUnique: true
  },])

  return (
    <ImageBackground source={require('../../../assets/img/illu-login02.png')} style={[]}>
      <ScrollView style={styles.container} contentContainerStyle={[ s.flex ]}>
        {/* <Image source={require("../../../assets/img/illu-login02.png")} style={styles.illu} /> */}
        <View style={[ styles.mainContainer, s.p2, s.flex ]}>
          <View style={[ s.flex ]}>
            <Text style={[styles.h1, s.selfCenter ]}>Votre régime alimentaire</Text>
            <Text style={[styles.body1, s.selfCenter]}>Dites nous en un peu plus sur vous pour que nous puissions adapter l’expérience à vos besoins</Text>
            <Filter filterList={filterList} setFilterList={setFilterList} numbColumns={3} />
          </View>
          <View style={[{ width: '100%', alignItems: 'center' } ]}>
            <Steps length={3} currentStep={2}></Steps>
            <View style={{ width: '100%', marginBottom: 8, marginTop: 16 }}>
              <Button btnStyle='primary' label='Commencer' />
            </View>
            <Button btnStyle='secondary' label='Passer' />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
