import * as React from 'react';
import { Button, View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo'
import Constants from 'expo-constants'

import Button2 from './components/atoms/Button'
import * as s from './styles'


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

import Explore from './screens/Explore'
import OnboardingFirstStep from './views/login/onboarding/firstStep';
import OnboardingSecondStep from './views/login/onboarding/secondStep';
import OnboardingThirdStep from './views/login/onboarding/thirdStep';


const Stack = createStackNavigator()


const header = ({ scene, previous, navigation }) => (
  <View style={[ s.absolute, s.px2, s.pt1, { top: Constants.statusBarHeight } ]}>
    {previous && (
      <Button2 btnStyle='icon' iconName='arrow-left-line' onPress={navigation.goBack} />
    )}
  </View>
)


function App () {

  const [ isLoaded ] = useFonts({
    Maragsa: require('./assets/fonts/Maragsa/Maragsâ.otf'),
  })

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        cardStyle: {
          ...Platform.OS === 'web' && { maxWidth: 400, maxHeight: 800 },
        }
      }}>
        <Stack.Screen name="OnboardingFirstStep" component={OnboardingFirstStep} options={{ header }} />
        <Stack.Screen name="OnboardingSecondStep" component={OnboardingSecondStep} options={{ header }} />
        <Stack.Screen name="OnboardingThirdStep" component={OnboardingThirdStep} options={{ header }} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
