import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../Styles/mapStyle';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDisclose, Button, Actionsheet, Modal } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePermissions } from '../hook/usePermission';








export function MapScreen() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [numeroTelefonico, setNumeroTelefonico] = useState('');
  const [referencias, setReferencias] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMarkerDraggable, setIsMarkerDraggable] = useState(false);
  const [datosGuardados, setDatosGuardados] = useState(null);

  const [errorNombre, setErrorNombre] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorTelefonoMessage, setErrorTelefonoMessage] = useState('');
  const { askLocationPermission } = usePermissions();

  const [showModal, setShowModal] = useState(false);



  const getCurrentLocation = () => {
    Geocoder.init('AIzaSyDFHYFl_pImNIwTzu2YwjL5R8pH-nlWCE4');
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(position);

        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    askLocationPermission();
    getCurrentLocation();
    const obtenerDatosGuardados = async () => {
      try {
        const nombreGuardado = await AsyncStorage.getItem('nombre');
        setDatosGuardados({
          nombre: nombreGuardado,
        });
      } catch (error) {
        console.log('Error al obtener los datos guardados:', error);
      }
    };

    obtenerDatosGuardados();
  }, []);


  // const guardarDatos = async () => {
  //   try {
  //     await AsyncStorage.setItem('nombre', nombre);
  //     await AsyncStorage.setItem('numeroTelefonico', numeroTelefonico);
  //     await AsyncStorage.setItem('referencias', referencias);
  //     await AsyncStorage.setItem('selectedAddress', selectedAddress);
  //     console.log('Datos guardados uwu');
  //   } catch (error) {
  //     console.log('Error al guardar los datos unu:', error);
  //   }
  // };



  const guardarDatos = async () => {
    try {
      const datosGuardados = await AsyncStorage.getItem('datos');
      let datosActualizados = [];
      if (datosGuardados) {
        datosActualizados = JSON.parse(datosGuardados);
      }
      const nuevosDatos = {
        nombre,
        numeroTelefonico,
        referencias,
        selectedAddress,
      };
      datosActualizados.push(nuevosDatos);
      await AsyncStorage.setItem('datos', JSON.stringify(datosActualizados));
      console.log('Datos guardados uwu');
      setDatosGuardados(nuevosDatos);
    } catch (error) {
      console.log('Error al guardar los datos unu:', error);
    }
  };



  const handleMapPress = async (coordinate) => {

    try {
      const response = await Geocoder.from(coordinate.latitude, coordinate.longitude);
      const address = response.results[0].formatted_address;
      setSelectedAddress(address);
      setSelectedLocation(coordinate);
    } catch (error) {
      console.log('Error retrieving address:', error);
    }
  };

  const handleAddressChange = async (text,) => {

    setSelectedAddress(text);
    try {
      const response = await Geocoder.from(text);
      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry.location;
        setCurrentLocation({ latitude: lat, longitude: lng });
      }
    } catch (error) {
      console.log('Error retrieving coordinates:', error);
    }
  };
  const handleMarkerDrag = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const isValidPhoneNumber = (phone) => {

    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleSaveData = () => {
    // Validar que los campos no estén vacíos
    if (!nombre || !numeroTelefonico || !selectedAddress) {
      setErrorNombre(!nombre);
      setErrorTelefono(!numeroTelefonico);
      setErrorDireccion(!selectedAddress);
      setErrorTelefonoMessage('Por favor, complete todos los campos.');
      return;
    }

    // Validar el número de teléfono
    if (!isValidPhoneNumber(numeroTelefonico)) {
      setErrorTelefono(true);
      setErrorTelefonoMessage('El número de teléfono debe tener 10 dígitos.');
      return;
    }

    // Guardar los datos
    guardarDatos();
    navigation.navigate('Shopping');
  };

  return (
    <>
      <View style={{
        zIndex: 1, opacity: 0.7,
        position: 'absolute', alignSelf: 'center'
      }}>
        <TextInput
          style={styles.directionInput}
          placeholder="Escriba su calle:"
          placeholderTextColor={'black'}
          onChangeText={handleAddressChange}
        />
      </View>

      {currentLocation && (
        <>
          <MapView
            provider={Platform.OS == "android" ? PROVIDER_GOOGLE : MapView.PROVIDER_GOOGLE}
            style={{ flex: 1, position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            region={{
              latitude: currentLocation?.latitude || 0,
              longitude: currentLocation?.longitude || 0,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            mapType={"standard"}
            onPress={(e) => handleMapPress(e.nativeEvent.coordinate)}
          >
            {currentLocation && (
              <Marker
                coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                title=" Tu ubicación Actual"
                description="Ubicacion aproximada  "
                draggable
              />
            )}
            {selectedLocation && (
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                title="Nueva ubicación"
                description="Ubicación seleccionada"
                draggable={isMarkerDraggable}
                onDragEnd={handleMarkerDrag}
              />
            )}
          </MapView>


          <Actionsheet isOpen={isOpen} onClose={onClose} size="100%"   >
            <Actionsheet.Content>
              <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} >

                <ScrollView style={{ flex: 1 }} keyboardDismissMode='interactive'>

                  <Text style={styles.textgray}> *IMPORTANTE* *recuerde poner los datos de quien va a recibir el paquete*</Text>

                  <View style={{ marginHorizontal: 10 }}>
                    <Text style={styles.headerText}> Direccion:  </Text>
                    <TextInput
                      style={[styles.discountCodeInput, errorDireccion && styles.errorInput]}
                      placeholder="Escriba su calle:"
                      value={selectedAddress}
                      placeholderTextColor={'black'}
                      onChangeText={(text) => {
                        setErrorDireccion(false);
                        setSelectedAddress(text);
                      }}
                    />
                    {errorDireccion && (
                      <Text style={styles.errorMessage}>Este campo es obligatorio.</Text>
                    )}
                    <Text style={styles.headerText}>Nombre de quien recibe:</Text>
                    <TextInput
                      style={[styles.discountCodeInput, errorNombre && styles.errorInput]}
                      placeholder="Por favor, escriba su nombre"
                      placeholderTextColor={'black'}
                      value={nombre}
                      onChangeText={(text) => {
                        setErrorNombre(false);
                        setNombre(text);
                      }}
                    />
                    {errorNombre && (
                      <Text style={styles.errorMessage}>Este campo es obligatorio.</Text>
                    )}
                    <Text style={styles.headerText}>Número telefónico:</Text>
                    <View style={styles.phoneInputContainer}>
                      <Image source={require('../assets/lottie/mexico.png')} style={styles.flagImage} />
                      <TextInput
                        style={[styles.phoneInput, errorTelefono && styles.errorInput]}
                        keyboardType="numeric"
                        placeholder="Escriba su numero:"
                        placeholderTextColor={'black'}
                        value={numeroTelefonico}
                        onChangeText={(text) => {
                          setErrorTelefono(false);
                          setNumeroTelefonico(text);
                        }}
                      />
                      {errorTelefono && (
                        <Text style={styles.errorMessage}>{errorTelefonoMessage}</Text>
                      )}
                    </View>

                    <Text style={styles.headerText}>Referencias (opcional):</Text>
                    <TextInput
                      style={styles.discountCodeInput}
                      placeholder="Escriba su referencia: "
                      value={referencias}
                      placeholderTextColor={'black'}
                      onChangeText={text => setReferencias(text)}
                    />
                  </View>
                  <TouchableOpacity style={styles.buyButton2} onPress={handleSaveData}>
                    <Text style={styles.headerWITHE}> Guardar Datos </Text>
                  </TouchableOpacity>
                </ScrollView>
              </KeyboardAvoidingView>
            </Actionsheet.Content>
          </Actionsheet>

        </>
      )}






        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            onOpen(true)
          }}
        >
          <Text style={styles.buttonText}>Continuar {'>'} </Text>
        </TouchableOpacity>



    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionrow: {
    paddingHorizontal: 15,
    position: 'absolute',
    top: 23,
    zIndex: 1,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
  },
  directionInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '98%',
    minWidth: '98%',
    maxWidth: '98%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 9
  },

  headerWITHE: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    padding: 2,
    justifyContent: 'center'

  },

  cardcontainer: {
    height: '70%',
  },
  CardInfo: {
    height: '10%',
    paddingHorizontal: '15%'
  },
  discountCodeInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    color: 'black',

  },


  header: {
    padding: 15,
    backgroundColor: '#debdce',
    zIndex: 9999,
  },
  headerinput: {
    backgroundColor: '#fff',
    zIndex: 9999,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    padding: 4,
    marginHorizontal: 5,
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flagImage: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  
  buyButton: {
    position: 'absolute',
    shadowColor: 'black',
    shadowOpacity: 30,
    shadowOffset: {
      width: -1,
      height: 3
    },
    right: 30,
    bottom: 50,
    backgroundColor: '#ff1493',
    borderRadius: 100,
    width: '30%',
    height: '10%',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
