import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Button, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal } from "native-base";
import {Toast}  from 'react-native-toast-message/lib/src/Toast';



export const Direction = () => {
  const navigation = useNavigation();
  const [datosGuardados, setDatosGuardados] = useState(null);
  const [showModal,setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedAddressData,setUpdatedAddressData] = useState('');
  
  
  useEffect(() => {
    
const obtenerDatosGuardados = async () => {
      try {
        const datosGuardados = await AsyncStorage.getItem('datos');
        if (datosGuardados) {
          const datosParseados = JSON.parse(datosGuardados);
          setDatosGuardados(datosParseados);
        }
      } catch (error) {
        console.log('Error al obtener los datos guardados:', error);
      }
    };
    obtenerDatosGuardados();
  }, []);

const handleUpdate = () => {
    if (selectedAddress && updatedAddressData) {
      const updatedData = datosGuardados.map((data) => {
        if (data.nombre === selectedAddress.nombre) {
          Toast.show({
            type: 'success',
            text1: 'Datos Actualizados ',
            text2: 'Sus datos se han actualizado ',
          });
          return {
            ...data,
            nombre: updatedAddressData.nombre,
            selectedAddress: updatedAddressData.selectedAddress,
            numeroTelefonico: updatedAddressData.numeroTelefonico,
            referencias: updatedAddressData.referencias,
          };
        }
        return data;
       
      });
      AsyncStorage.setItem('datos', JSON.stringify(updatedData))
        .then(() => {
          setDatosGuardados(updatedData);
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error al guardar los datos actualizados:', error);
        });
    }
  };

const handleDelete = (index) => {
    const updatedData = [...datosGuardados];
    updatedData.splice(index, 1);
    setDatosGuardados(updatedData);
    AsyncStorage.setItem('datos', JSON.stringify(updatedData))
      .then(() => {
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error al guardar los datos actualizados:', error);
      });
  };

const handleCardPress = (datos) => {
  setSelectedAddress(datos);
  setUpdatedAddressData({
    nombre: datos.nombre,
    selectedAddress: datos.selectedAddress,
    numeroTelefonico: datos.numeroTelefonico,
    referencias: datos.referencias,
  });
  setShowModal(true);
};

const handleAddressSelect = (selectedAddress) => {
  navigation.navigate('Shopping', {
    selectedAddress: selectedAddress,
  });
};



  return(
    <>

<View>
        <Card style={styles.cardContainer2}>
          <Text style={{color:'black', fontSize: 20, fontWeight: 'bold'}} > Direcciones  </Text>
        </Card>
      </View>

      {datosGuardados && datosGuardados.length > 0 ? (
      
      <ScrollView>

       <View style={styles.rowContainer2}>
      <Text style={styles.titlegray}> Seleccione o edite una direcciónes </Text>
      </View>
      {/* <Text style={{color:'black',}}>La direccion que eliga sera donde llegen sus compras   </Text> */}
       
                {datosGuardados.map((datos, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardcontainer}
              onPress={() => handleAddressSelect(datos)}>
              <View style={styles.rowContainer}>
                <Icon name="user" size={20} color="#000" style={styles.icon} />
                <Text style={styles.productname}>{datos.nombre}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon name="map-marker" size={20} color="#000" style={styles.icon} />
                <Text style={styles.textgray}>Calle: {datos.selectedAddress}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon name="phone" size={20} color="#000" style={styles.icon} />
                <Text style={styles.textgray}>Número telefónico: {datos.numeroTelefonico}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Icon name="info" size={20} color="#000" style={styles.icon} />
                <Text style={styles.textgray}>Referencia: {datos.referencias}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                  <Icon name="trash" size={30} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.updateButton} onPress={() => handleCardPress(datos)}>
                <Icon name="pencil" size={30} color="#fff" />
              </TouchableOpacity>
          
              </View>
            </TouchableOpacity>
          ))}
          </ScrollView>
        ) : (
          <View style={styles.centeredContainer}>
            <Icon name="map" size={70} color="black" />
            {/* <Image
              source={require('../Navigators/assets/lottie/osuxd.png')}
              style={styles.noDataImage}
            /> */}
            <Text style={styles.noDataText}>Ninguna dirección guardada</Text>
          </View>
        )}


      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Actualizar Dirección</Modal.Header>
          <Modal.Body>
            <TextInput
              style={styles.input}
              value={updatedAddressData?.nombre}
           
              onChangeText={(text) =>
                setUpdatedAddressData((prevState) => ({
                  ...prevState,
                  nombre: text,
                }))
              }
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={updatedAddressData?.selectedAddress}
              placeholderTextColor={'black'}
              onChangeText={(text) =>
                setUpdatedAddressData((prevState) => ({
                  ...prevState,
                  selectedAddress: text,
                }))
              }
              placeholder="Calle"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={updatedAddressData?.numeroTelefonico}
              placeholderTextColor={'black'}
              onChangeText={(text) =>
                setUpdatedAddressData((prevState) => ({
                  ...prevState,
                  numeroTelefonico: text,
                }))
              }
              placeholder="Número telefónico"
            />
           
            <TextInput
              style={styles.input}
              value={updatedAddressData?.referencias}
              onChangeText={(text) =>
                setUpdatedAddressData((prevState) => ({
                  ...prevState,
                  referencias: text,
                }))
              }
              placeholder="Referencia"
            />
          </Modal.Body>
          <Modal.Footer>
             <TouchableOpacity onPress={handleUpdate} style={styles.buyButton}>
              <Text style={styles.headerWITHE}> Actualizar Datos</Text>
             </TouchableOpacity>

            {/* <Button onPress={handleUpdate} style={styles.buyButton}>Actualizar Datos</Button> */}
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* <Card style={{backgroundColor: '#f8f8ff'}}>
        <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => handleContinuar()}>
                  <Text style={styles.continueButtonText}>  </Text>
        </TouchableOpacity>

      </Card> */}



    </>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      cardContainer2: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10
      },
      continueButton: {
        backgroundColor: '#ff1493',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginVertical: 15,
        marginHorizontal: 20,
      },
      continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
   
      input: {
        color: 'black',
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 2,
        marginTop: 10
        
      },
      centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      noDataImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
      },
      noDataText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'gray',
      },
      emptyCartContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      emptyCartText: {
        fontSize: 30,
        marginBottom: 20,
        color: 'gray'
      },
      exploreButton: {
            flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      exploreButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray'
      },
      discountCodeInput: {
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        color: 'black',
      },
      
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
      },

      deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
      },
      updateButton: {
        backgroundColor: '#1E90FF',
        padding: 5,
        borderRadius: 5,
      },
      updateButton2: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 15
      },

      icon: {
        marginRight: 10,
        flexDirection: 'row'
      },
      cardContainer:{
        height: '40%',
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      rowContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginVertical: 10,
        marginHorizontal: 20
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
      titlegray: {
        color: '#ff1493',
        fontSize: 20 ,
        
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
      headerText2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
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
        backgroundColor: '#ff1493',
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 15,
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
        marginHorizontal: 15,
        backgroundColor: '#F0F0F0',
        borderColor: 'gray',
        borderWidth: 2,

      },
 
    
})