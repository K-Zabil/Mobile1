import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrinkList } from '../views/DrinkList';
import { DrinkDetails } from '../views/DrinkDetails';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DrinkList" component={DrinkList} />
      <Stack.Screen name="DrinkDetails" component={DrinkDetails} />
    </Stack.Navigator>
  );
};

export default HomeStack;