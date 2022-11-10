import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';
import SuccessScreen from '../screens/SuccessScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import MainTabNavigator from './MainTabNavigator';
import CartScreen from '../screens/CartScreen';



const Stack = createStackNavigator();



export default function HomeNavigator() {





    return (
      
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
     

        </Stack.Navigator>
        
    )
}