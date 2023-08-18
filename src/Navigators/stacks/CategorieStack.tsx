import React from 'react';
import { Dimensions, Platform, SafeAreaView, Text, View } from 'react-native';
import { CategoriesScreen } from '../../Screens/categories/CategoriesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export const CategoriesStack = () => {
    return (
        <>
        <Stack.Navigator
            initialRouteName="Categories"
        >
            <Stack.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    headerShown: true,
                    header: () =>
                    (
                        <>
                            <SafeAreaView style={{ backgroundColor: '#F00A84' }} />
                            <StatusBar
                                animated={true}
                                backgroundColor="#F00A84"
                            />
                            <View style={{
                                height: Platform.OS === 'ios'
                                    ? (Dimensions.get('window').height * .07)
                                    : (Dimensions.get('window').height * .075), backgroundColor: '#F00A84',
                            }}>
                                <View style={{ flexDirection: 'row', width: '100%', height: '90%' }}>
                                    <View style={{ width: '30%' }}>
                                    </View>
                                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: Dimensions.get('window').width / 22, color: 'white', fontWeight: 'bold', marginVertical: Dimensions.get('window').height * .01 }}  >
                                            Categorias
                                        </Text>
                                    </View>
                                     
                                    <TouchableOpacity style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }} >
                                        <View style={{borderRadius: 100, backgroundColor: 'white', padding: 3, width: '40%', alignItems: 'center'}}>
                                            <Icon name="cart-outline" size={35} color="black" />
                                        </View>
                                    </TouchableOpacity>
                                   
                                </View>
                            </View>
                        </>
                    ),
                }}
            />

        </Stack.Navigator>
     </>
    );
};
