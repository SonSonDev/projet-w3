import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, Text, Animated } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
import * as SecureStore from 'expo-secure-store'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useApolloClient } from "@apollo/react-hooks"

import FirstScreen from './views/login/firstScreen'
import Login from './views/login/login'
import OnboardingFirstStep from './views/login/onboarding/firstStep'
import OnboardingSecondStep from './views/login/onboarding/secondStep'
import OnboardingThirdStep from './views/login/onboarding/thirdStep'
import Home from './views/Home'
import Challenges from './views/Challenges'
import Explore from './views/Explore'
import Place from './views/Explore/Place'
import Profile from './views/Profile'
import Settings from './views/Profile/Settings'
import Article from './views/Article'

import Header from './components/organismes/Header'
import TabBar from './components/organismes/TabBar'
import Toaster from './components/organismes/Toaster'
import * as s from './styles'

import { CHECK_AUTH } from './graphql/auth'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const GET_LOCAL_STATE = gql`
  {
    isOnboarded @client
  }
`


export default function () {
  const client = useApolloClient()

  /* Vérification de la validation de l'onboarding */
  const { data: { isOnboarded } = {} } = useQuery(GET_LOCAL_STATE)

  /* Informations de l'utilisateur '*/
  const { data: { checkAuthApp: userData } = {}, loading } = useQuery(CHECK_AUTH)

  /* Chargement des polices */
  const [ isLoaded ] = useFonts({
    Maragsa: require('./assets/fonts/Maragsa/Maragsâ.otf'),
    HKGrotesk: require('./assets/fonts/HK-Grotesk/HKGrotesk-Regular.otf'),
    HKGroteskSemiBold: require('./assets/fonts/HK-Grotesk/HKGrotesk-SemiBold.otf'),
    NowAltMedium: require('./assets/fonts/Now-Alt/NowAlt-Medium.otf'),
  })

  useEffect(() => {
    Promise.all([
      SecureStore.getItemAsync('isOnboarded'),
    ]).then(([ isOnboarded ]) => {
      client.writeData({ data: { isOnboarded } })
    })
  })

  if (!isLoaded || loading) return <AppLoading />

  const initialRouteName = !isOnboarded
    ? 'FirstScreen'
    : !userData
      ? 'Login'
      : 'MainNavigator'

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }} headerMode='screen' initialRouteName={initialRouteName}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ animationTypeForReplace: 'pop' }} />
        <Stack.Screen name="Login" component={Login} options={{ animationTypeForReplace: 'pop', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />

        <Stack.Screen name="OnboardingFirstStep" component={OnboardingFirstStep} options={{ header: Header, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
        <Stack.Screen name="OnboardingSecondStep" component={OnboardingSecondStep} options={{ header: Header, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
        <Stack.Screen name="OnboardingThirdStep" component={OnboardingThirdStep} options={{ header: Header, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />

        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        <Stack.Screen name="Place" component={Place} />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toaster />
    </>
  )
}

/* Barre de navigation */
function MainNavigator () {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={Home} options={{ title: 'Accueil', icon: 'home-line' }} />
      <Tab.Screen name="Explore" component={Explore} options={{ title: 'Découvrir', icon: 'map-2-line' }} />
      <Tab.Screen name="Challenges" component={Challenges} options={{ title: 'Défis', icon: 'award-line' }} />
      <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ title: 'Profil', icon: 'apps-2-line' }} />
    </Tab.Navigator>
  )
}

function ProfileNavigator () {
  return (
    <Stack.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}


// console.disableYellowBox = true