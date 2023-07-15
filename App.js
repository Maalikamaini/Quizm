/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useColorScheme} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Quiz from './src/screens/Quiz';
const Stack = createStackNavigator();
const App = () => {
  const colorScheme = useColorScheme();
  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#FFFFFF';
  return (
    <NavigationContainer>
      <Stack.Navigator style={{backgroundColor}}>
        
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
         <Stack.Screen
          component={Quiz}
          name="Quiz"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Signup}
          name="Signup"
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
