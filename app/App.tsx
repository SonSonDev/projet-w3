import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { useQuery, useMutation } from "@apollo/react-hooks"
 
import { GET_PLACES, DELETE_PLACE, UPSERT_PLACES } from "./graphql/place"

import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import CardAddress from "./components/organismes/CardAddress";
import NavBottom from './components/molecules/NavBottom';
import NavTab from './components/molecules/NavTab';

const styles = StyleSheet.create({
  container: {
    ...Platform.OS === 'web' && { maxWidth: 380, borderRightWidth: 1 },
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  top: {
    width: "100%",
  },
  content: {
    flex: 1,
  },
  bottom: {
    width: "100%",
    // height: "fit-content",
  }
});

export default function App() {

  const { data: { getPlaces = [] } = {}, loading, error } = useQuery(GET_PLACES, {
    onError: error => console.log(error.message),
    variables: {
      nearby: {
        coordinates: [48.8518269, 2.4204598] // HETIC
      }
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <NavTab />
      </View>
      <View>
        <Input></Input>
      </View>
      <ScrollView style={styles.content}>
        {getPlaces.map((place, id) => (
          <CardAddress {...place} key={`card-${id}`} />
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <NavBottom />
      </View>
    </View>
  );
}
