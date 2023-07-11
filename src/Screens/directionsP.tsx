import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Button, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal } from "native-base";


export const Direction = () => {
    const navigation = useNavigation();
    const [datosGuardados, setDatosGuardados] = useState(null);
    const [showModal,setShowModal] = useState(false);

 
    
   

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

    const handleDelete = (index) => {
      const updatedData = [...datosGuardados];
      updatedData.splice(index, 1);
      setDatosGuardados(updatedData);
    };

    const handleCardPress = (datos) => {
      navigation.navigate('Shopping', { nombre: datos.nombre });
    };

    const handleUpdate = () => {
      
    }
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

      
      <ScrollView>
      {datosGuardados && datosGuardados.map((datos, index) => (
          <TouchableOpacity key={index} onPress={() => handleCardPress(datos)}>
  <Card key={index} style={styles.cardcontainer}>
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
        <Icon name="trash" size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateButton}  onPress={() => setShowModal(true)}>
        <Icon name="pencil" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  </Card>
  </TouchableOpacity>
))}
</ScrollView>

<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="500px">
        <Modal.CloseButton />
        <Modal.Header>Editar informacion</Modal.Header>
        <Modal.Body>
        <Text style={styles.headerText2}> Direccion:  </Text>
            <TextInput
            style={styles.discountCodeInput} 
            placeholder="Escriba su calle" 
            />
        <Text style={styles.headerText2}> Nombre de quien recibe: </Text>
         <TextInput
          style={styles.discountCodeInput} 
          placeholder="Escriba su nombre" 
         />
         
        <Text style={styles.headerText2}>Número Telefónico: </Text>
         <TextInput 
          style={styles.discountCodeInput} 
          placeholder="Escriba su número telefónico" 
         />

        <Text style={styles.headerText2}>Referencia</Text>
        <TextInput 
          style={styles.discountCodeInput} 
          placeholder="casa color uwu" 
        />
  
        </Modal.Body>
        <TouchableOpacity style={styles.buyButton}>
          <Text> Confirmar datos </Text>
        </TouchableOpacity>

      </Modal.Content>
    </Modal>

{/* 
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Confirmar Datos </Text>
    </TouchableOpacity>  */}

   
      
     
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 5,
      },

      icon: {
        marginRight: 10,
      },
      cardContainer:{
        height: '40%',
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
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