import React from 'react';
import { StyleSheet, View, Text, Linking, Image } from 'react-native';

import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#FAF7F2',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContainer: {
    width: 'calc(100% - 48px)',
    paddingTop: 24
  },
  h1: {
    fontSize: 40,
    color: "#181B1B",
    marginBottom: 16
  },
  body1: {
    fontSize: 16,
    color: "#181B1B",
    marginBottom: 32
  },
  body2: {
    fontSize: 14,
    color: "#949E9E",
    textAlign: 'center'
  },
  img: {
    width: 38,
    height: 40,
    marginBottom: 16
  },
  btnPrimary: {
    paddingBottom: 40,
    width: "calc(100% - 48px)",
    display: 'flex',
    alignItems: 'center'
  },
  btnIcon: {
    width: "100%",
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 24
  },
  illu: {
    position: 'absolute',
    height: '40%',
    width: '45%',
    right: 0,
  }
});

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/img/illu-login02.png")} style={styles.illu} />
      <View style={styles.mainContainer}>
        <View style={styles.btnIcon}>
          <Button btnStyle='icon' iconName='arrow-left-line'/>
        </View>
        <Text style={styles.h1}>Bon retour parmi nous</Text>
        <Text style={styles.body1}>Vous avez reçu votre mot de passe par mail</Text>
        <View style={{marginBottom:16}}>
         <Input />
        </View>
        <View style={{marginBottom:24}}>
          <Input isPwd/>
        </View>
        <Text style={styles.body2} onPress={() => Linking.openURL('http://google.com')}>
          Mot de passe oublié ?
        </Text>
      </View>
      <View style={styles.btnPrimary}>
        <Button btnStyle='primary' label='Connexion'/>
      </View>
    </View>
  );
}
