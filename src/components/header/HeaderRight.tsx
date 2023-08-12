import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export const HeaderRight = ({ favorites }: any) => {
    const navigation = useNavigation();
    const size = Platform.OS === 'ios' ? 30:35;
    return (
        <>
            {
                favorites ? (<>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Shopping')}>
                        <View style={styles.icon}>
                            <Icon name="cart-outline" size={size } color="white" />
                        </View>

                    </TouchableOpacity>
                </>) : (<>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Shopping')}>
                        <View style={styles.icon}>
                            <Icon name="cart-outline" size={size } color="white" />
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
   icon:{
    borderRadius: 100, 
    backgroundColor: '#E3087E', 
    padding: Platform.OS === 'ios' ? 2:6, 
    alignItems: 'center'
   }
});