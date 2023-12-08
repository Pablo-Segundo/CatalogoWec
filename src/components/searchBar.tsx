import React, { useState } from "react";
import API from "../API/API";
import { Product } from "../interfaces/ProductInterfaces";
import { Icon, Input, Spinner, VStack, Text } from "native-base";
import { SearchResponse } from "../interfaces/SearchInterface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductsList } from "./ProductsList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from "react-native";

interface Props extends NativeStackScreenProps<any, any> { }

export const SearchBar = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const loadSearch = async (word: string) => {
    try {
      setLoading(true);
      if (word.length > 1) {
        const { data } = await API.get<SearchResponse>(`/search/products?search=${word}`);
        setProducts(data.results);
      } else {
        setProducts([]);
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <VStack w="100%" alignSelf="center" alignItems={'center'} mt={4} mb={2}>
        <Input
          placeholder="Busca un producto uwu "
          width={80}
          borderRadius="4"
          borderColor={'#ff1493'}
          onChangeText={(text) => {
            setSearch(text);
            setTimeout(() => { loadSearch(text) }, 250)
          }}
          InputLeftElement={
            <Icon
              as={Ionicons}
              onPress={() => loadSearch(search)}
              name="search-outline"
              size="md"
              color="black"
            />
          }
        />
      </VStack>
      {loading ? <Spinner size="lg" /> :
        products.length > 0 ? <ProductsList products={products} navigation={navigation} route={route} /> :

        <View style={{justifyContent:'center', alignItems:'center', marginTop: 50}}>
           <Text>No se encontraron productos. Busca tus productos.</Text>
        </View>
         
      }
    </>
  );
};
