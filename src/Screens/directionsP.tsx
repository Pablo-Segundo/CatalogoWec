import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Direction = () => {
    const navigation = useNavigation();
    const [datosGuardados, setDatosGuardados] = useState(null);
   

    useEffect(() => {
      const obtenerDatosGuardados = async () => {
        try {
          const nombreGuardado = await AsyncStorage.getItem('nombre');
          const numeroTelefonicoGuardado = await AsyncStorage.getItem('numeroTelefonico');
          const referenciasGuardadas = await AsyncStorage.getItem('referencias');
    
          setDatosGuardados({
            nombre: nombreGuardado,
            numeroTelefonico: numeroTelefonicoGuardado,
            referencias: referenciasGuardadas,
          });
        } catch (error) {
          console.log('Error al obtener los datos guardados:', error);
        }
      };
    
      obtenerDatosGuardados();
    }, [])
    
  return(
    
    <> 
              <View style={styles.header}>
        <Text style={styles.headerWITHE}>Carrito de compras </Text>
        <View> 
        <TouchableOpacity  onPress={() => navigation.navigate('upload')}>
          <Card style={styles.cardcontainer}> 
            <View>
            <Text style={styles.textgray}> Agrega una nueva direccion  </Text>
            </View> 
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      
       <View style={styles.cardC}>
       <Text style={styles.productname}>Direcciones guardadas   </Text>
       </View>
     

      <TouchableOpacity >
          <Card style={styles.cardcontainer}> 
                <View> 
            {datosGuardados && (
              <View >
                <Text style={styles.productname}> {datosGuardados.nombre}</Text>
                <Text style={styles.textgray}>Calle </Text> 
                <Text style={styles.textgray}>Número telefónico: {datosGuardados.numeroTelefonico}</Text>
                <Text style={styles.textgray} >Referencias: {datosGuardados.referencias}</Text>
              </View>
            )}
          </View>
            </Card>
          </TouchableOpacity>



      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Confirmar Datos </Text>
    </TouchableOpacity> 

   
      
     
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      cardContainer:{
        height: '40%',
      },
      cardC:{
        height: '10%',
        padding: 20,
      },
      productname:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
       
    
      },
      textgray: {
        color: 'gray',
        fontSize: 18,
      },
      textMap:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
        marginVertical: 100,
        marginHorizontal: 140,
    
      
    
      },
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        color:'black',
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
      },
      tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      rowText: {
        fontSize: 14,
        color: 'black'
      },
      buyButton: {
        backgroundColor: '#D3AFD4',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
      
      },
      buyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      TextContainer: {
        color: 'black',
        position: 'absolute',
        top: 20,
        left: 25,
        zIndex: 1,
      },
      IconContainer: {
        position: 'absolute',
        top: 15,
        right: 25,
        zIndex: 1,
      },
      IconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      style:{
        height: '10%',
          backgroundColor: '#D3AFD4',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
      },
      header: {
        padding: 30,
        backgroundColor: '#debdce',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      },
      headerWITHE: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ff',
        padding: 2,
      },
    
      shoppingCartButton: {
        marginRight: 10,
      },
      cardcontainer: {
        padding: 20,
        
      },
      shoppingCartIcon: {
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#FFF',
      },

})