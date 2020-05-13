import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from "./components/atoms/Button";
import Card from "./components/organismes/Card";
import NavBottom from './components/molecules/NavBottom';
import NavTab from './components/molecules/NavTab';

const styles = StyleSheet.create({
  container: {
    height: "fit-content",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    width: "100%",
  },
  content: {
    flex: 3,
  },
  bottom: {
    width: "100%",
    height: "fit-content",
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <NavTab />
      </View>

      <View style={styles.content}>
        <Card />
        <Card />
      </View>

      <View style={styles.bottom}>
        <NavBottom />
      </View>
    </View>
  );
}
