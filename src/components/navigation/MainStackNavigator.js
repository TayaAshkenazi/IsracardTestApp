import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Browse from '../screens/Browse';
import Movie from '../screens/Movie';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Browse" component={Browse} />
            <Stack.Screen name="Movie" component={Movie} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
