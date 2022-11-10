import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';

export default function AppNavigator() {

     // Get auth state from context




  

   

    return (
        <NavigationContainer>
           
               
          
                <HomeNavigator />
        

        </NavigationContainer>
    )


}