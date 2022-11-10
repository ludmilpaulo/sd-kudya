import React from 'react';
import { StyleSheet, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';

const Categories = () => {

    const categoriesData = [
        {
            image: "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg",//require("../assets/images/shopping-bag.png"),
            text: "Pick-up",
        },
        {
            image: 'https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg',// require("../assets/images/soft-drink.png"),
            text: "Soft Drinks",
        },
        {
            image: 'https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg',// require("../assets/images/bread.png"),
            text: "Bakery Items",
        },
        {
            image: "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg", //require("../assets/images/fast-food.png"),
            text: "Fast Foods",
        },
        {
            image: "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg", //require("../assets/images/deals.png"),
            text: "Deals",
        },
        {
            image: "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg", //require("../assets/images/coffee.png"),
            text: "Coffee & Tea",
        },
        {
            image: "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg", //require("../assets/images/desserts.png"),
            text: "Desserts",
        },
    ];
    



    
    return (
        <View style={tailwind`mx-3`}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categoriesData.map(({ image, text }, index) => (
                    <TouchableOpacity key={index} style={tailwind`mx-1 my-3 items-center bg-gray-50 px-3 py-2 rounded-lg`}>
                        <Image
                            source={image}
                            style={tailwind`w-10 h-10`}
                        />
                        <Text style={tailwind`text-center mt-1 text-xs`}>{text}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Categories;
