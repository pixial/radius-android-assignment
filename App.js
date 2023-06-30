import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faDiceOne,
  faDiceTwo,
  faChevronRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
library.add(faDiceOne, faDiceTwo, faChevronRight, faArrowLeft);

import WelcomeScreen from './components/common/WelcomeScreen';
import Dashboard from './components/dashboard';
import ChooseFacilities from './components/chooseFacilities';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer initialRouteName="WelcomeScreen">
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            title: 'Welcome',
            headerStyle: {
              backgroundColor: '#2d2d2d',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ChooseFacilities"
          component={ChooseFacilities}
          options={{
            title: 'ChooseFacilities',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
