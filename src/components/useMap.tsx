import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform,  TouchableOpacity, Text, TextInput } from 'react-native';;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDisclose, Button, ToastRef, Icon, Card  } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Modal from '../../src/components/Modal';







  export function MapaScreenUwU() {
      const navigation = useNavigation();
      const [nombre, setNombre] = useState('');
      const [numeroTelefonico, setNumeroTelefonico] = useState('');
      const [referencias, setReferencias] = useState('');

      const [isVisibleMap, setIsVisibleMap] = useState(false);
      const [locationUbication, setLocationUbication] = useState(null)







  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', nombre);
      await AsyncStorage.setItem('numeroTelefonico', numeroTelefonico);
      await AsyncStorage.setItem('referencias', referencias);
      console.log('Datos guardados uwu');
    } catch (error) {
      console.log('Error al guardar los datos unu:', error);
    }
  };


  return (
    <> 
        <View style={styles.header}>
            <Text style={styles.headerText}>WAPIZIMA</Text>
            <TouchableOpacity
              style={styles.shoppingCartButton}
              onPress={() => navigation.navigate('Shopping')}
            >
              <View style={styles.shoppingCartIcon}>
                <Icon name="shopping-cart" size={30} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

   

            <View> 
              

              <Text style={styles.textgray}> *IMPORTANTE* *recuerde poner los datos de quien va a recibir el paquete*</Text> 
            <Text style={styles.headerText}> Direccion:  </Text>
            <TextInput style={styles.discountCodeInput} placeholder=" "/>
  

            <Text style={styles.headerText}>Nombre de quien recibe:</Text>

            <TextInput
                  style={styles.discountCodeInput}
                  placeholder="Direccion de la casa"
                  value={nombre}
                  onChangeText={text => setNombre(text)}
                 
                />
     



                <TextInput
                  style={styles.discountCodeInput}
                  placeholder="Por favor, escriba su nombre"
                  value={nombre}
                  onChangeText={text => setNombre(text)}
                />

                <Text style={styles.headerText}>Número telefónico:</Text>
                <TextInput 
                  style={styles.discountCodeInput}
                  placeholder ="Por favor, escriba su número telefónico"
                  value={numeroTelefonico}
                  onChangeText={text => setNumeroTelefonico(text)}
                />

                <Text style={styles.headerText}>Referencias (opcional):</Text>
                <TextInput
                  style={styles.discountCodeInput}
                  placeholder="Casa de dos pisos"
                  value={referencias}
                  onChangeText={text => setReferencias(text)}
                />

              <TouchableOpacity style={styles.buyButton}
               onPress={() => {
                guardarDatos();
                navigation.navigate('Direction');
              }}
              >
               <Text style={styles.headerWITHE}> Guardar Datos </Text>
              </TouchableOpacity>

              <MapScreen
                 isVisibleMap={isVisibleMap}
                 setIsVisibleMap={setIsVisibleMap}
                 setLocationUbication={setLocationUbication}
                 toastRef={ToastRef}
              />

            </View>



            

    </>
    
  );
}

function MapScreen({ isVisibleMap, setIsVisibleMap,setLocationUbication, toastRef  }){
  return(
    <Modal isVisible={isVisibleMap} setIsVisible={isVisibleMap}>
       <Text> Aqui esta el mapa</Text>
    </Modal>
  )
}



  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buyButton: {
    backgroundColor: '#ff1493',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 25,
  },
  headerWITHE: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    padding: 2,
  },
  cardcontainer: {
    height: '70%',
  },
  CardInfo: {
    height: '10%',
    paddingHorizontal:'15%'
  },
  discountCodeInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    color: 'gray',
    marginBottom: 10,
    
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#debdce',
    zIndex: 9999,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    padding: 5,
  },
  shoppingCartIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  shoppingCartButton: {
    marginRight: 10,
  },
  textgray: {
    color: 'gray',
    fontSize: 15,
  },
});