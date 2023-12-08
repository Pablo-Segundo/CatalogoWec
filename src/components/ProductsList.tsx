import { Box } from 'native-base';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
// import { CardProductBuy } from './CardProductBuy';
import { ProductCard } from './ProductCard';
import { Product } from '../interfaces/ProductInterfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface Props extends NativeStackScreenProps<any, any> {
  products: Product[];
}

export const ProductsList = ({ products, navigation, route}: Props) => {

  return (
    <>
        <Box rounded="md" alignContent={'center'} mb={'1'}>
          <FlatList
            data={products}
            numColumns={2}
            onEndReachedThreshold={ 0.4 }
            keyExtractor={item => item._id}
            renderItem={({ item }) => 
            // <View>
            //     <Text style={{color:'black'}}> {item.name} </Text>
                
            // </View>
            <ProductCard product={item} navigation={navigation} route={route} />
            
            }>

            </FlatList>
        </Box>
    </>
  );
};
