import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';
import { Favorites } from '../views/FavoritesScreen';
import { DrinkRandom } from '../views/DrinkRandom';

const Tab = createBottomTabNavigator();

export const Root = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
        <Tab.Screen name="Random" component={DrinkRandom} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};