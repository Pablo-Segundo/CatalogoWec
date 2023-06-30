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
  }, []);


  const guardarDatos = async () => {

    try {
      await AsyncStorage.setItem('nombre', nombre);
      await AsyncStorage.setItem('numeroTelefonico', numeroTelefonico);
      await AsyncStorage.setItem('referencias', referencias);
      await AsyncStorage.setItem('selectedAddress', selectedAddress);
      console.log('Datos guardados uwu');
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
        <View style={styles.headerinput}>
          <TextInput
            style={styles.directionInput}
            placeholder="Escriba su calle"
             onChangeText={handleAddressChange}
          />
        </View>
      </View>


      {/* <View style={styles.header}>
        <View style={styles.headerinput}>
           <GooglePlacesAutocomplete
            placeholder='Escriba su calle plox uwu '
            onPress={(data, details = null) => {
              console.log(data.details);
            }}
            query={{
              key:'AIzaSyDFHYFl_pImNIwTzu2YwjL5R8pH-nlWCE4',
              language: 'es'
            }}
           />
           </View>
      </View> */}

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
            value={selectedAddress} 
            onChangeText={handleAddressChange =>setSelectedAddress(handleAddressChange) }
            />



            <Text style={styles.headerText}>Nombre de quien recibe:</Text> 
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

              
            </View> 
                   
            </Actionsheet.Content>
            
            </Actionsheet>
             
             
  
              </>
            )}
          </View>
        </ActionSheetProvider>

        <TouchableOpacity onPress={onOpen} style={styles.buyButton}>
             <Text style={styles.headerWITHE}> Agregue sus datos </Text>
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
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
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    color: 'black',
  },
  directionInput: {
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
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
});