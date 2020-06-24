import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'

// import Explore from './screens/Explore'
import FirstScreen from './views/login/firstScreen'
import Login from './views/login/login'
import OnboardingFirstStep from './views/login/onboarding/firstStep'
import OnboardingSecondStep from './views/login/onboarding/secondStep'
import OnboardingThirdStep from './views/login/onboarding/thirdStep'

import Header from './components/organismes/Header'


const Stack = createStackNavigator()

function App () {
  const [ isLoaded ] = useFonts({
    Maragsa: require('./assets/fonts/Maragsa/Maragsâ.otf'),
  })

  if (!isLoaded) return <AppLoading />

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: Header }} headerMode='screen'>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnboardingFirstStep" component={OnboardingFirstStep} />
        <Stack.Screen name="OnboardingSecondStep" component={OnboardingSecondStep} />
        <Stack.Screen name="OnboardingThirdStep" component={OnboardingThirdStep} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
