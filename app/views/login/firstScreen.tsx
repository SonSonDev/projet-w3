import React from 'react';
import { StyleSheet, View, Image, Text, Linking } from 'react-native';

import Button from "../../components/atoms/Button";
import Typography from "../../components/atoms/Typography"

import * as s from "../../styles/index"

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#FAF7F2',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtContainer: {
    width: 'calc(100% - 48px)',
    paddingTop: 152
  },
  h1: {
    fontSize: 40,
    color: "#181B1B",
    marginBottom: 16,
    width: '75%'
  },
  body1: {
    ...s.body1,
    color: "#181B1B",
    marginBottom: 16,
    width: '75%'
  },
  body2: {
    fontSize: 14,
    color: "#CB6B51",
    marginBottom: 16
  },
  img: {
    width: 38,
    height: 40,
    marginBottom: 16
  },
  btn: {
    paddingBottom: 40,
    width: "calc(100% - 48px)",
    display: 'flex',
    alignItems: 'center'
  },
  illu: {
    position: 'absolute',
    height: '100%',
    width: '50%',
    right: 0,
  }
});

export default function firstScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/img/illu-login01.png")} style={styles.illu} />
      <View style={styles.txtContainer}>
        <Image source={require("../../assets/img/logo_icon.png")} style={styles.img} />
        <Text style={styles.h1}>Bienvenue sur Madu</Text>
        <Text style={styles.body1}>L’application qui vous aide à consommer responsable au quotidien.</Text>
        <Text style={styles.body2} onPress={() => Linking.openURL('http://google.com')}>Découvrir Madu</Text>
      </View>
      <View style={styles.btn}>
        <Button btnStyle='primary' label='J’ai déjà créé mon compte'/>
      </View>
    </View>
  );
}
