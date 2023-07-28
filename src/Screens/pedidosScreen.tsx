import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



export const PedidosScreen = () => {
      const navigation = useNavigation();


    return(
        <>
        <View style={styles.container}>
        <TouchableOpacity style={styles.directionrow}  onPress={() => navigation.navigate('home', {})}>
         <Text style={styles.textWhite}>Mis compras</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.directionrow}
            onPress={() => navigation.navigate('Home', {})}>
            <Icon name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={styles.shoppingCartButton}
            onPress={() => navigation.navigate('Shopping')}>
            <View style={styles.shoppingCartIcon}>
              <Icon name="shopping-cart" size={30} color="#000" />
            </View>
          </TouchableOpacity> */}
        </View>  

        <View style={styles.containertext}>
            <Text style={styles.textblack}> Tus compras  </Text>


       </View>



        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#DEBDCE',
        // borderBottomLeftRadius: 50,
        // borderBottomRightRadius: 50,
      },
      containertext: {
        justifyContent: 'center',
      },
      directionrow:{
        paddingHorizontal: 10,
      },
      shoppingCartButton: {
        position: 'absolute',
        top: 20,
        right: 30,
        zIndex: 1,
      },
      shoppingCartIcon: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textWhite: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
      },
      textblack: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginHorizontal: 20
      }
      // directionrow:{
      //   paddingHorizontal: 22,
      //   position: 'absolute',
      //   top: 15, 
      //   zIndex: 1,
      // },

})