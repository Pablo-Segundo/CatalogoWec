import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../../context/cart/CartContext';


export const HeaderRight = ({ favorites }: any) => {
    const navigation = useNavigation();
    const size = Platform.OS === 'ios' ? 30:35;

    const { totalProducts, cart } = useContext(CartContext);

    const uniqueProductIds = new Set(cart.map(item => item.product._id));
    // console.log('Unique Product IDs:', uniqueProductIds);

    return (
        <>
            {
                favorites ? (<>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Shopping')}>
                        <View style={styles.icon}>
                    <Icon name="cart-outline" size={size} color="white" />
                    {uniqueProductIds.size > 0 && (
                        <Text style={styles.productCount}>{uniqueProductIds.size}</Text>


                    )}
                </View>

                    </TouchableOpacity>
                </>) : (<>

                    <TouchableOpacity
                onPress={() => navigation.navigate('Shopping')}>
                <View style={styles.icon}>
                    <Icon name="cart-outline" size={size} color="white" />
                    {uniqueProductIds.size > 0 && (
                        <Text style={styles.productCount}>{uniqueProductIds.size}</Text>

                    )}
                </View>
                 </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{ marginLeft: 15 }}
                        onPress={() => navigation.navigate('Favorites')}>
                        <View style={styles.icon}>
                            <Icon name="heart-outline" size={size } color="white" />
                        </View>
                    </TouchableOpacity>

                    
                </>)
            }

        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        borderRadius: 100,
        backgroundColor: '#E3087E',
        padding: Platform.OS === 'ios' ? 2 : 6,
        alignItems: 'center',
        position: 'relative', 
       
    },
    productCount: {
        position: 'absolute',
        top: -9,
        right: 13,
        backgroundColor: 'red', 
        color: 'white', 
        fontSize: 16, 
        borderRadius: 50, 
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        zIndex: 9999,
      },
      
    productCount2: {
        position: 'absolute', 
        top: -9, 
        right: 13, 
        color: 'black',
        fontSize: 20,
        zIndex: 9999,
    },
});