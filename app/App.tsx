import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery, useMutation } from "@apollo/react-hooks"

import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "../back-office/src/graphql/place"

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

  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(GET_PLACES, {
    onError: error => console.log(error.message),
    variables: {
      nearby: {
        coordinates: [ 48.8518269, 2.4204598 ] // HETIC
      }
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <NavTab />
      </View>

      <View style={styles.content}>
        {getPlaces.map(place => (
          <Card {...place} />
        ))}
      </View>

      <View style={styles.bottom}>
        <NavBottom />
      </View>
    </View>
  );
}
