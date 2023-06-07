import { View } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";



export const direction = () => {
  return(
    <View style={(styles.container)}>
        <Text>
              hola a todos 
        </Text>   

        <Text> Agregue su direccion </Text>

        
        
    </View>

  )

};

const styles = StyleSheet.create({
   container:{
    alignItems: 'center',
   },
   Textstyles: {
    color:  'black'
   }
    

   
     
  }
 )

