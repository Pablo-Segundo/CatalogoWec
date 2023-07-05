import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast, Modal, useDisclose } from 'native-base';

export const Direction = () => {
    const navigation = useNavigation();
    const [datosGuardados, setDatosGuardados] = useState(null);
  
    const [modalVisible, setModalVisible] = useState(null);
    const [modalData, setModalData] = useState(null);
   

    useEffect(() => {
      const obtenerDatosGuardados = async () => {
        try {
          const nombreGuardado = await AsyncStorage.getItem('nombre');
          const numeroTelefonicoGuardado = await AsyncStorage.getItem('numeroTelefonico');
          const referenciasGuardadas = await AsyncStorage.getItem('referencias');
          const direcionesGuardadas = await AsyncStorage.getItem('selectedAddress');

    
          setDatosGuardados({
            nombre: nombreGuardado,
            numeroTelefonico: numeroTelefonicoGuardado,
            referencias: referenciasGuardadas,
            selectedAddress: direcionesGuardadas,
    
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
        <Text style={styles.headerWITHE}>Direcciones del usuario  </Text>
        <View> 
        <TouchableOpacity  onPress={() => navigation.navigate('upload')}>
          <Card style={styles.cardcontainer}> 
            <View>
            <Text style={styles.textgray}> Agregar una nueva direccion   </Text>
            </View> 
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      
       <View style={styles.cardC}>
       <Text style={styles.productname}>Direcciones guardadas   </Text>
       </View>
     
       <TouchableOpacity onPress={() => {
          setModalVisible(true);
          setModalData(datosGuardados);
        }}>
          <Card style={styles.cardcontainer}> 
          <View>             
            {datosGuardados && (
              <View >
                <Text style={styles.productname}> {datosGuardados.nombre}</Text>
                <Text style={styles.textgray}>Calle: {datosGuardados.selectedAddress}</Text> 
                <Text style={styles.textgray}>Número telefónico: {datosGuardados.numeroTelefonico}</Text>
                <Text style={styles.textgray}>Refernecia {datosGuardados.referencias} </Text>
              </View>
            )} 
          </View>
          </Card>
         </TouchableOpacity>
         


         <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.container}>
              {modalData && (
                <View>
                  <Text style={styles.productname}>{modalData.nombre}</Text>
                  <Text style={styles.textgray}>Calle: {modalData.selectedAddress}</Text>
                  <Text style={styles.textgray}>Número telefónico: {modalData.numeroTelefonico}</Text>
                  <Text style={styles.textgray}>Referencia: {modalData.referencias}</Text>
                </View>
              )}
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
        </Modal>
 

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
        fontSize: 15 ,
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
        color: '#fff',
        padding: 2,
      },
    
      shoppingCartButton: {
        marginRight: 10,
      },
      cardcontainer: {
        padding: 20,
        marginBottom: 15,
      },
      shoppingCartIcon: {
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#FFF',
      },

})