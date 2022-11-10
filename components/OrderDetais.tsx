import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

import tailwind from 'tailwind-react-native-classnames';


import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from '../configs/colors';
import AppHead from '../components/AppHead';
import AppButton from '../components/AppButton'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native";

const OrderDetais = ({ data, driver, order, resData }) => {

    const navigation = useNavigation();

   
    const [ driver_avatar, setDriver_avatar ] = useState('');
    const [ driver_address, setDriver_address ] = useState("");
    const [ driver_phone, setDriver_phone ] = useState('');
    const [ driver_name, setDriver_name ] = useState('');
    const [ driver_photo, setDriver_photo ] = useState('');


    const [ restaurant_name, setRestaurant_name ] = useState("");
    const [ restaurant_phone, setRestaurant_phone ] = useState("");
    const [ restaurant_address, setRestaurant_address ] = useState("");

    const [ order_address, setOrder_address ] = useState('');
    const [ order_quantity, setOrder_quantity ] = useState('');
    const [ order_sub_total, setOrder_sub_total ] = useState('');
    const [ order_id,  setOrder_id ] = useState('');
    const [ order_status, setOrder_status ] = useState('');
    const [ order_total, setOrder_total ] = useState('');
    const [ order_name, setOrder_name ] = useState('');
    const [ order_price, setOrder_price ] = useState('');
    




    const driverDetais = async() => {
        const url = 'https://www.sunshinedeliver.com';

            if(driver_avatar==null){
                alert(" Voce Nao tem nenhum Pedido a Caminho ")
                navigation.navigate("Home")
            }else{

                const driver_photo = `${url}${driver_avatar}`;
                setDriver_photo(driver_photo);
                setDriver_avatar(driver.avatar);
                setDriver_address(`${driver.address}`);
                setDriver_name(`${driver.name}`);
                setDriver_phone(`${driver.phone}`);

                setRestaurant_name(`${resData.name}`);
                setRestaurant_phone(`${resData.phone}`);
                setRestaurant_address(`${resData.address}`);


                 const tags = Object.keys(order).reduce((result, key) => {
                  return result.concat(order[key].meal);
                }, [])

                let newA = tags.map(({name})=>{
                  return (`${name}`).toString()
                })
                let _name = newA.toString();

                 let p = tags.map(({price})=>{
                  return (`${price}`).toString()
                })
                let _price = p.toString();  

                setOrder_address(data.address);
                setOrder_quantity(order.quantity);
                setOrder_sub_total(order.sub_total);
                setOrder_id(data.id);
                setOrder_status(data.status);
                setOrder_total(data.total);
                setOrder_name(_name);
                setOrder_price(_price);

            }

    }

    useEffect(() =>{
        driverDetais();

    }, [])
    

   
      const pressCall=()=>{
        const curl='tel://';
        const phone = `${curl}${driver_phone}`;
        Linking.openURL(phone)
      }





   

    return (
 <>
        <ScrollView style={tailwind`mx-4 mt-3`} showsVerticalScrollIndicator={false}>

         

        
                <View  style={tailwind`mb-4`}>
                    <View style={tailwind`mb-4 relative justify-center`}>
                        <Image style={tailwind`w-full h-16 rounded-lg`} source={{ uri: driver_photo }} />
                        <View style={[tailwind`absolute top-0 left-0 w-full h-full bg-black rounded-lg`, { opacity: 0.5 }]} />
                        <Text style={tailwind`absolute self-center text-white w-3/4 text-center font-bold text-xl`} numberOfLines={1}>{resData.name}</Text>
                    </View>
                   
                        <View style={tailwind`mb-3 flex-row justify-between items-center pb-3 border-b border-gray-100`}  >
                            <View style={tailwind`flex-1 pr-3 flex-row items-center`}>
                             
                                    <BouncyCheckbox fillColor={colors.black} isChecked={true}  />
                             
                                  
                            
                                <View style={tailwind`flex-1 pl-2`}>
                                    <Text style={[tailwind`text-gray-900 font-bold mb-1`, { fontSize: 16 }]}>{order_name}</Text>
                                    <Text style={tailwind`text-gray-800 text-xs`}>{order_price} Kz</Text>
                                    <Text style={tailwind`text-gray-600 text-xs`}>{order_address}</Text>
                                </View>
                            </View>

                            <View style={tailwind``} >
                                <Image style={tailwind`h-16 w-16 rounded-lg`} source={{ uri: driver_photo }} />
                            </View>
                        </View>
               
                </View>
          
        </ScrollView>
         <View style={tailwind`flex-row items-center px-5 pb-5`}>
            <View style={styles.left}>
                <Text style={styles.totalAmount}>
                <AntDesign name="car" size={28} color={colors.primary} />{'\t'}
                   {driver_name}{'\n'}</Text>

                <TouchableOpacity  onPress={pressCall}>
                
                <Text style={styles.totalAmount}>
                <AntDesign name="phone" size={28} color={colors.primary} />{'\t'}
                  {driver_phone}</Text>
                 </TouchableOpacity>
            </View>
        </View>

              <Text style={{
              width: '100%',
              borderTopWidth: 0,
              borderRadius: 100,
              paddingTop: 1,
               paddingBottom: 15,
               height: 50,
                backgroundColor: "rgba(0,74,173,1)",
                color: colors.white,
                fontSize: 28,
                textAlign: "center",
            }}>{order_status}</Text>
      
         


    </>
    );
}

const styles = StyleSheet.create({
    left: {
        marginRight: 20,
        marginTop: -100
    },
    right: {
        flex: 1,
        width: '100%'
    },
    total: {
        fontSize: 14,
        color: colors.title
    },
    totalAmount: {
        fontSize: 23,
    },
    materialCardWithImageAndTitle: {
    height: 166,
    width: 375,
    borderRadius: 100,
    marginTop: 576
  }
})

export default OrderDetais;
