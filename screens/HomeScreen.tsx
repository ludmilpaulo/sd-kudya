import React, {useState} from 'react'
import { ScrollView, View, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import tailwind from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import RestaurantItem from '../components/RestaurantItem';
import Screen from '../components/Screen';
import colors from '../configs/colors';
import HeaderTabs from '../components/HeaderTabs';
import Categories from '../components/Categories';

const HomeScreen = () => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([] as any[]);
    const [masterDataSource, setMasterDataSource] = useState([] as any[]);
    const [activeTab, setActiveTab] = useState("Delivery");
    const [loading, setLoading] = useState(false)


    ///******************************Procurar************************* */
    const searchFilterFunction = (text:any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with restaurantData
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };


  return (
    <Screen style={tailwind`bg-white flex-1`}>
    <HeaderTabs />
    <View style={tailwind`mt-2 mx-4 mb-1 relative justify-center`}>
            <Ionicons name="search-sharp" size={20} color="#B1B1B3" style={tailwind`absolute left-4 z-10 self-center`} />
            <TextInput style={[tailwind`rounded-full py-2 px-5 pl-10 bg-gray-100`, styles.input]}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search} 
            placeholder="Pesquisar restaurantes" />
        </View>
    <Categories />

    <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
                <Categories />
                {loading && <ActivityIndicator size="large" color={colors.primary} style={tailwind`mt-2 mb-6`} />}
                <RestaurantItem restaurantData={filteredDataSource} />
            </ScrollView>


    </Screen>
  
  )
}

const styles = StyleSheet.create({
  input: {
      borderColor: colors.medium,
      borderWidth: 1,
  },
})

export default HomeScreen;