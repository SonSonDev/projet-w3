import React from 'react';
import { Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import Constants from 'expo-constants'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from '@apollo/react-hooks'
import * as SecureStore from 'expo-secure-store'

import App from './App';


const devApiUrl =
  // 'http://localhost:3000'
  'http://elb-api-1880898738.eu-west-2.elb.amazonaws.com'

const client = new ApolloClient({
  link: createHttpLink({ uri: Constants.manifest.extra?.REACT_APP_API_URL || devApiUrl }),
  cache: new InMemoryCache(),
  resolvers: {},
  request: operation => {
    const token = SecureStore.getItemAsync('authToken')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
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