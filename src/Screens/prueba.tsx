import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, NativeAppEventEmitter } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

 function App() {
  return (
    <View style={{height: '60%'}}>
       
       <TouchableOpacity style={styles.IconContainer} >
        <Icon name= "basket-check" size={30} color="#000" />
      </TouchableOpacity>
    <View
      style={{
        height: '15%',
        // borderBottomRightRadius: 25,
        // borderBottomLeftRadius: 25,
        backgroundColor: '#d3afd4',
      }}
      
    />





   

   



    <Text style={styles.screenTitle}>Colecciones de 3 piezas 
    </Text>
    <Text style={styles.screenTitle}>Colecciones de 4 piezas </Text>
    <Text style={styles.screenTitle}>Colecciones de 6 piezas </Text>
    <Text style={styles.screenTitle}>Colecciones de 8 piezas </Text>

     </View>
  );
 };

        const styles = StyleSheet.create({

          screenTitle: {
            fontSize: 25,
            color:'#ff69b4',
            margin: 20,
            fontWeight: 'bold',
          },
          container: {
            flex: 1,
            paddingTop: 25,
            paddingHorizontal: 15,
          },
          IconContainer: {
            position: 'absolute',
            top: 15,
            right: 25,
            zIndex: 1,
          },
          
         
          

        }
        )
        export default App;
 