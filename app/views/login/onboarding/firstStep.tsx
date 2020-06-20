import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Button from "../../../components/atoms/Button";
import Steps from "../../../components/atoms/Steps";

import * as s from "../../../styles/index";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#FAF7F2',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContainer: {
    width: 'calc(100% - 48px)',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%'
  },
  h1: {
    fontSize: 40,
    fontFamily: "Maragsa",
    color: "#181B1B",
    marginBottom: 16,
    textAlign: 'center',
    width: '75%'
  },
  body1: {
    ...s.body1,
    color: "#181B1B",
    marginBottom: 72,
    textAlign: 'center',
    lineHeight: s.body1.fontSize * 1.5,
    width: '75%'
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

export default function OBFirstStep() {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/img/illu-login02.png")} style={styles.illu} />
      <View style={styles.mainContainer}>
        <View style={{alignItems: 'center', paddingTop:144}}>
          <Text style={styles.h1}>Madu s’adapte à vous</Text>
          <Text style={styles.body1}>Dites nous en un peu plus sur vous pour que nous puissions adapter l’expérience à vos besoins</Text>
          <Image source={require("../../../assets/img/logo_icon.png")} style={styles.img} />
        </View>
        <View style={{width: '100%', alignItems: 'center', paddingBottom: 16}}>
          <Steps length={3} currentStep={1}></Steps>
          <View style={{width: '100%', marginBottom:8, marginTop: 16}}>
            <Button btnStyle='primary' label='Commencer' />
          </View>
          <Button btnStyle='secondary' label='Passer' />
        </View>
      </View>
    </View>
  );
}
