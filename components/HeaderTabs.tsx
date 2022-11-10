import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';

const HeaderTabs = () => {

    return (
        <View style={tailwind`flex-row justify-center mt-3 pt-6 bg-yellow-400`}>
            <Text style={tailwind`text-2xl font-bold leading-7 text-blue-600 pt-6`}>SD-Kudya</Text>  
        </View>
    );
}



export default HeaderTabs;