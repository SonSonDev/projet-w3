import React from 'react';
import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import Constants from 'expo-constants'
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from '@apollo/react-hooks'
import * as SecureStore from 'expo-secure-store'

import App from './App';


const devApiUrl =
  //'http://localhost:3000'
  'http://staging-elb-api-27308169.eu-west-2.elb.amazonaws.com/'

/* Configuration du endpoint de l'API */
const httpLink = createHttpLink({ uri: Constants.manifest.extra?.REACT_APP_API_URL || devApiUrl })

/* Configuration du header pour l'API */
const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('authToken')
  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : '' 
    }
  }
})

/* Initialidation du client apollo pour l'API */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  resolvers: {},
});


registerRootComponent(() => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
))


if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}