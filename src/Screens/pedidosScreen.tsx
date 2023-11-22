import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Card } from "react-native-paper";



export const PedidosScreen = () => {
      const navigation = useNavigation();


    return(
        <>
        <View style={styles.container}>
         <TouchableOpacity style={styles.directionrow}  onPress={() => navigation.navigate('home', {})}>
         <Text style={styles.textWhite}>Mis compras</Text>
          </TouchableOpacity> 

          <TouchableOpacity
            style={styles.shoppingCartButton}
            onPress={() => navigation.navigate('Shopping')}>
            <View style={styles.shoppingCartIcon}>
              <Icon name="shopping-cart" size={30} color="#000" />
            </View>
          </TouchableOpacity>

        </View>  


        {/* <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText} >Empieza a comprar   </Text>

          <TouchableOpacity>
          <Image source={require('../assets/lottie/osuxd.png')} style={styles.exploreImage} />
            <Text style={styles.exploreButtonText}> Explora y ecuentra nuevos productos </Text>

          </TouchableOpacity>

        </View> */}





       <View>
     



       </View>

       <Card style={{backgroundColor:'gray', marginTop: 40}}>
         <Text style={{color:'black'}}>No. de pedido </Text>
         <Text> Entregado</Text>

        
       </Card>

       



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
        backgroundColor: '#ff1493',
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
        top: 15,
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
      },
      // directionrow:{
      //   paddingHorizontal: 22,
      //   position: 'absolute',
      //   top: 15, 
      //   zIndex: 1,
      // },
      emptyCartContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
      },
      exploreImage: {
        width: 30,
        height: 30,
        marginRight: 10,
      },
      exploreButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray'
      },
      emptyCartText: {
        fontSize: 30,
        marginBottom: 20,
        color: 'gray'
      },

})