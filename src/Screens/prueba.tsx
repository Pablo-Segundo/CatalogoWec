import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

 function App() {
  return (
    <View style={{height: '100%'}}>
    <View
      style={{
        height: '10%',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
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
         
          

        }
        )
        export default App;
 