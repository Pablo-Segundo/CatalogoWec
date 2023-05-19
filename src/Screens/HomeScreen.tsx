import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-bootstrap';
import prueba from './prueba';


const HomeScreen = ()  => {
   //img       
   const imageUrl = '';
   const image = ''; 
  return (
    <View  >
      <View style={[styles.boxhome]}> 
      <Text style={styles.screenTitle}> WAPIZIMA  </Text>
      </View>

      <ScrollView>
        
      <View style={[styles.box]}>
           <Text style={styles.screenTitle}> Producto  </Text>
       <View style={[styles.box1]}>
       <Image source={{ uri: imageUrl }} style={{ width: 150, height: 150 }} /> 
       </View>
       </View>

      
       <View style={[styles.box]}>
           <Text style={styles.screenTitle}> Producto  </Text>
       <View style={[styles.box1]}>
       <Image source={{ uri: imageUrl }} style={{ width: 200, height: 150 }} /> 
       </View>
       </View>

       
      
      






      <Text style={styles.screenTitle}> inicio  </Text>
      

      
     

      </ScrollView>
    </View>

  );
  };
   
   

 const styles = StyleSheet.create({

   screenTitle: {
      fontSize: 20,
      color:'black',
      margin: 8,
      fontWeight: 'bold',
   },
   box: {
    width: 170,
    height: 200,
    backgroundColor: '#d3afd4',
    marginBottom: 30
  },
  box1: {
    width: 170,
    height: 200,
    fontSize: 25,
    backgroundColor: 'white',
    marginBottom: 30
  },

  boxhome: {
    width:150,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 30,
    borderBottomRightRadius: 5
  },
  textrose: {
    fontSize: 20,
    color:'#d3afd4',
    margin: 8,
    fontWeight: 'bold',
 },
   

 }
 )
 export default HomeScreen;