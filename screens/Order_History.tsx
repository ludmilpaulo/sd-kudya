import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import tailwind from "tailwind-react-native-classnames";
import AppHead from "../components/AppHead";

import colors from "../configs/colors";

import HistoyDetais from "../components/HistoyDetais";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const Order_History = () => {
  const [data, setData] = useState([{}]);
  const [driverData, setdriverData] = useState();
  const [restaurantData, setRestaurantData] = useState([{}]);
  const [orderData, setOrderData] = useState([{}]);

  const [loadingOrder, setLoadingOrder] = useState();

  const navigation = useNavigation();

  //let a = JSON.parse(orderData || {});

  // console.log("order==>", a)

  const orderHistory = async () => {
    const value = await AsyncStorage.getItem("authUser");
    const tokenData = JSON.parse(value || {});
    let tokenvalue = tokenData.token;

    let response = await fetch(
      "https://www.sunshinedeliver.com/api/customer/order/history/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: tokenvalue,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.order_history);
        setdriverData(responseJson.order_history.driver);
        setRestaurantData(responseJson.order_history.restaurant);
        setOrderData(responseJson.order_history.order_details);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    orderHistory();
  }, []);

  return (
    <Screen style={tailwind`flex-1 bg-white`}>
      <AppHead title={`Confira`} icon="basket-outline" />
      <View style={tailwind`flex-1`}>
        {data?.map((order) => {
          return (
            <HistoyDetais
              key={order.id}
              resData={restaurantData}
              driver={driverData}
              order={order}
              data={data}
            />
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  left: {
    marginRight: 20,
  },
  right: {
    flex: 1,
  },
  total: {
    fontSize: 14,
    color: colors.title,
  },
  totalAmount: {
    fontSize: 23,
  },
});

export default Order_History;
