import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,

} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tailwind from "tailwind-react-native-classnames";
import * as Device from "expo-device";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateBusket } from "../redux/slices/basketSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


import colors from "../configs/colors";
import Screen from "../components/Screen";

const CheckoutScreen = ({ navigation } : { navigation:any}) => {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  const dispatch = useDispatch();

  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);



  const allCartItems = useSelector(selectCartItems);

  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const initialCoordinate = {
    latitude: latitude,
    longitude: longitude,
  };

  console.log('endereco++>', userAddress)
  const userLocation = async () => {
    if (Platform.OS === "android" && !Device.isDevice) {
        alert(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLongitude(location.coords.longitude);
    setLatitude(location.coords.latitude);
    setLocation(location);
  };

  useEffect(() => {
    const timer = setInterval(() => userLocation(), 2000);
    return () => clearInterval(timer);
  }, [userLocation]);

  const tags = Object.keys(allCartItems).reduce((result, key) => {
    return result.concat(allCartItems[key].foods);
  }, []);

  let newA = tags.map(({ id, quantity }) => {
    return { meal_id: id, quantity };
  });

  let resId = allCartItems.map(({ resId } : { resId : any }) => {
    return `${resId}`.toString();
  });
  let restaurantId = resId.toString();

  const onPressBuy = async () => {
    setLoading(true);

    // Success;
    completeOrder();

    setLoading(false);
  };

  const completeOrder = async () => {
    const value = await AsyncStorage.getItem("authUser");
    const tokenData = Object.assign(value) //JSON.parse(value || {});
    let tokenvalue = tokenData.token;

    // if (restaurantId == )

    if (userAddress == null) {
      alert("Por favor Preencha o Endereço de Entrega");
    } else {
      let response = await fetch(
        "https://webhook.site/f3877b1a-5831-48c6-a5f5-e10576341a4d",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: tokenvalue,
            restaurant_id: restaurantId,
            address: userAddress,
            order_details: newA,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson.status);
          //alert(responseJson.error);
          console.log("Response", responseJson);
          setTimeout(() => {
            setLoadingOrder(false);
            dispatch(updateBusket([]));
            navigation.navigate("SuccessScreen");
          }, 2000);
        })
        .catch((error) => {
          alert("Selecione Comida apenas de um restaurante");
          navigation.navigate("CartScreen");
          console.log(error);
        });
    }
  };

  const mapRef = useRef();

  return (
    <>
      <View style={[tailwind`bg-blue-300 relative `, { height: 250 }]}>
        <MapView
         ///  mapType="satellite"
          provider={PROVIDER_GOOGLE}
          region={initialRegion}
          // ref={mapRef}
          style={tailwind`h-full z-10`}
        >
          <Marker
            coordinate={initialCoordinate}
            identifier="shop"
            anchor={{ x: 0.5, y: 0.5 }}
            title="Shop"
          >
            <Image
              source={require("../assets/images/shop.png")}
              style={{ height: 27, width: 27 }}
            />
          </Marker>
        </MapView>
      </View>

      <Screen style={tailwind`flex-1`}>
      
      <GooglePlacesAutocomplete
        query={{ key: "AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw",
        language: 'en',
       }}
        onPress={(data, details = null) => {
          console.log(data.description);
          const city = data.description.split(",")[0];
          setUserAddress(city);
        }}
        placeholder="Digite o Endereço de Entrega"
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              backgroundColor: "white",
              padding: 9,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircle"
              size={11}
              style={{ marginRight: 6 }}
            />
            <Text>Search</Text>
          </View>
        )}
      />

        <TouchableOpacity 
         style={tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `} 
          onPress={completeOrder}>
          <Text>FAÇA SEU PEDIDO </Text>
        </TouchableOpacity>
      </Screen>
    </>
  );
};


export default CheckoutScreen;
