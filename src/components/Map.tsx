import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform,  TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../Styles/mapStyle';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDisclose, Button, Actionsheet, Icon, Card  } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import { Image } from 'react-native';







export function MapScreen() {
  const { isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [numeroTelefonico, setNumeroTelefonico] = useState('');
  const [referencias, setReferencias] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMarkerDraggable, setIsMarkerDraggable] = useState(false);
  const [datosGuardados, setDatosGuardados] = useState(null);


  const requestLocationPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      } else if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }
      const granted = await request(permission);
      if (granted === 'granted') {
        getCurrentLocation();
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getCurrentLocation = () => {
    Geocoder.init('AIzaSyDFHYFl_pImNIwTzu2YwjL5R8pH-nlWCE4');   
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
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

  const  handleAddressChange = async (text,) => {
    
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


  return (
    <> 


<View style={styles.header}>
  <View style={styles.headerInput}>
    <TextInput
      style={styles.directionInput}
      placeholder="Escriba su calle:"
      placeholderTextColor={'black'}
      onChangeText={handleAddressChange}
    />
  </View>
</View>


   


    <ActionSheetProvider>    
        <View style={styles.container}>
          {currentLocation && (
            <>
    <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          latitude: currentLocation?.latitude || 0,
          longitude: currentLocation?.longitude || 0,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
        onPress={e => handleMapPress(e.nativeEvent.coordinate)}
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
          

            <View> 
         

              <Text style={styles.textgray}> *IMPORTANTE* *recuerde poner los datos de quien va a recibir el paquete*</Text> 

            <Text style={styles.headerText}> Direccion:  </Text>
            <TextInput
            style={styles.discountCodeInput} 
            placeholder="Escriba su calle" 
            placeholder="Escriba su calle:"
            value={selectedAddress} 
            onChangeText={handleAddressChange =>setSelectedAddress(handleAddressChange) }
            />



            <Text style={styles.headerText}>Nombre de quien recibe:</Text> 
                 <TextInput
                  style={styles.discountCodeInput}
                  placeholder="Por favor, escriba su nombre"
                  placeholder="Escriba su calle:"
                  value={nombre}
                  onChangeText={text => setNombre(text)}
                />

                {/* <Text style={styles.headerText}>Número telefónico:</Text>
                <TextInput keyboardType="numeric"
                  style={styles.discountCodeInput}
                  placeholder ="Por favor, escriba su número telefónico"
                  value={numeroTelefonico}
                  onChangeText={text => setNumeroTelefonico(text)}
                /> */}
              <Text style={styles.headerText}>Número telefónico:</Text>
                <View style={styles.phoneInputContainer}>
                <Image source={require('../Navigators/assets/lottie/mexico.png')} style={styles.flagImage} />
                <TextInput
                  keyboardType="numeric"
                  style={styles.phoneInput}
                  placeholder="Escriba su calle:"
                  placeholder="Por favor, escriba"
                  value={numeroTelefonico}
                  onChangeText={text => setNumeroTelefonico(text)}
                />
              </View>

                <Text style={styles.headerText}>Referencias (opcional):</Text>
                <TextInput
                  style={styles.discountCodeInput}
                  placeholder="Casa de dos pisos"
                  value={referencias}
                  placeholder="Escriba su calle:"
                  onChangeText={text => setReferencias(text)}
                /> 


              <TouchableOpacity style={styles.buyButton2}
               onPress={() => {
                guardarDatos();
                navigation.navigate('Shopping');
              }}
              >
               <Text style={styles.headerWITHE}> Guardar Datos </Text>
              </TouchableOpacity>

              
            </View> 
  
            </Actionsheet.Content>
            </Actionsheet>
          
              </>
            )}
          </View>
        </ActionSheetProvider>

         {/* <View> 
          <Card>
        <TouchableOpacity onPress={onOpen} style={styles.buyButton}>
             <Text style={styles.headerWITHE}> Agregue sus datos </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}
         onPress={() => {
        navigation.navigate('Direction');
         }}
        >
           <Text style={styles.headerWITHE}>Direcciones guardads  </Text>
        </TouchableOpacity> 
        </Card>
        </View>  */}

  

        <View style={styles.buttonContainer}>
  <TouchableOpacity onPress={onOpen} style={styles.buyButton}>
  
    <Text style={styles.buttonText}>Agregue sus datos</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.buyButton}
    onPress={() => {
      navigation.navigate('Direction');
    }}
  >
    <Text style={styles.buttonText}>Direcciones guardadas</Text>
  </TouchableOpacity>
</View>
        


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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buyButton: {
    backgroundColor: '#ff1493',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '48%',
  },
  buyButton2: {
    backgroundColor: '#ff1493',
    borderRadius: 8,
    paddingVertical: 12,
   
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
