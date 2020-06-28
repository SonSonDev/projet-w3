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


const client = new ApolloClient({
  link: createHttpLink({ uri: Constants.manifest.extra?.REACT_APP_API_URL || 'http://elb-api-1324571725.eu-west-2.elb.amazonaws.com' }),
  cache: new InMemoryCache()
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