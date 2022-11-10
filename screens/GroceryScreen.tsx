import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../components/Screen'
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../components/AppHead';

import colors from '../configs/colors';



import OrderDetais from '../components/OrderDetais'


import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";



const GroceryScreen = () => {

      const [data, setData ]= useState([{}]);
      const [driverData, setdriverData] = useState({});
      const [restaurantData, setRestaurantData] = useState([]);
      const [orderData, setOrderData] = useState([]);

      const [loadingOrder, setLoadingOrder] = useState();

      const navigation = useNavigation();

      console.log("order==>", driverData)

      
const pickOrder = async() => {
    const value = await AsyncStorage.getItem('authUser');
    const tokenData = JSON.parse(value || {});
    let tokenvalue = tokenData.token;

    let response = await fetch('https://www.sunshinedeliver.com/api/customer/order/latest/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: tokenvalue
          
          })
      })
       .then((response) => response.json())
       .then((responseJson) => {
         if(responseJson.order.total==null){     
         alert(" Voce Nao tem nenhum Pedido a Caminho")
          navigation.navigate("Home")
           
            }
            else{
        setData(responseJson.order);
        setdriverData(responseJson.order.driver);
        setRestaurantData(responseJson.order.restaurant);
        setOrderData(responseJson.order.order_details);
    }
        })  
        .catch((error) => {
          console.error(error);
        });
}

useEffect(() =>{

  pickOrder();

}, []);




/*useEffect(() => {
  const timer = setInterval(() => pickOrder(), 3000);
  return () => clearInterval(timer);
},[pickOrder]);
*/



   
    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Confira`} icon="basket-outline" />
            <View style={tailwind`flex-1`}>

               <OrderDetais resData={restaurantData}  driver={driverData} order={orderData} data={data} />


            </View>
        
        </Screen>
    );
}

const styles = StyleSheet.create({
    left: {
        marginRight: 20
    },
    right: {
        flex: 1
    },
    total: {
        fontSize: 14,
        color: colors.title
    },
    totalAmount: {
        fontSize: 23,
    },
})


export default GroceryScreen;
