import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { registerRootComponent } from 'expo';
import Constants from 'expo-constants'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import View from './views/login/onboarding/secondStep';


const client = new ApolloClient({
  link: createHttpLink({ uri: Constants.manifest.extra?.REACT_APP_API_URL || 'http://localhost:3000' }),
  cache: new InMemoryCache()
});

registerRootComponent(() => (
  <ApolloProvider client={client}>
    <View />
  </ApolloProvider>
))


if (Platform.OS !== 'web') {
  // enable network tab in dev console
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}
