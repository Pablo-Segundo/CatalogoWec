import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { useDisclose, Button, Actionsheet, Modal, Card } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePermissions } from '../hook/usePermission';
import LoadingScreen from './loadintgScreen';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Marker as MemoizedMarker } from 'react-native-maps';


export function MapScreen() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isMarkerDraggable, setIsMarkerDraggable] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const MapView = React.lazy(() => import('react-native-maps'));
  const { askLocationPermission } = usePermissions();


  useEffect(() => {
    const askLocationPermissionAsync = async () => {
      await askLocationPermission();
      getCurrentLocation();
    };
    askLocationPermissionAsync();
  }, []);

  useEffect(() => {
    const loadMapState = async () => {
      const cachedMapState = await AsyncStorage.getItem('mapState');
      if (cachedMapState) {
       
        setCurrentLocation(JSON.parse(cachedMapState));
      } else {
     
        getCurrentLocation();
      }
    };
  
    loadMapState();
  }, []);
  

  const getCurrentLocation = () => {
    Geocoder.init('AIzaSyDFHYFl_pImNIwTzu2YwjL5R8pH-nlWCE4');
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        setCurrentLocation({ latitude, longitude });
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };



  
  const handleMapPress = async (coordinate: React.SetStateAction<null>) => {
    try {
      const response = await Geocoder.from(
        coordinate.latitude,
        coordinate.longitude,
      );
      const address = response.results[0].formatted_address;
      setSelectedAddress(address);
      setSelectedLocation(coordinate);
    } catch (error) {
      console.log('Error retrieving address:', error);
    }
  };
  const handleAddressChange = async text => {
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
  const handleMarkerDrag = e => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  return (
    <>

      <View
        style={{
          zIndex: 1,
          opacity: 0.7,
          position: 'absolute',
          alignSelf: 'center',
        }}>


        <TouchableOpacity>
          <Text style={{ color: '#ff1493', fontSize: 20, fontWeight: 'bold', }}>
            ¿Comó funciona el mapa?
          </Text>
        </TouchableOpacity>


        <TextInput
          style={styles.directionInput}
          placeholder="Escriba su calle:"
          placeholderTextColor={'black'}
          onChangeText={handleAddressChange}
        />
      </View>



      {currentLocation && (
        <>
        <React.Suspense fallback={<LoadingScreen />}> 

          <MapView
            provider={
              Platform.OS == 'android'
                ? PROVIDER_GOOGLE
                : MapView.PROVIDER_GOOGLE
            }
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            region={{
              latitude: currentLocation?.latitude || 0,
              longitude: currentLocation?.longitude || 0,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            onPress={e => handleMapPress(e.nativeEvent.coordinate)}>
            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
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
                pinColor="#ff1493"
                description="Ubicación seleccionada"
                draggable={isMarkerDraggable}
                onDragEnd={handleMarkerDrag}
              />
              // <MemoizedMarker
              //   coordinate={{
              //     latitude: selectedLocation.latitude,
              //     longitude: selectedLocation.longitude,
              //   }}
              //   title="Nueva ubicación"
              //   pinColor="#ff1493"
              //   description="Ubicación seleccionada"
              //   draggable={isMarkerDraggable}
              //   onDragEnd={handleMarkerDrag}
              // />
            )}
           </MapView>
          </React.Suspense>

          <Actionsheet
            isOpen={isOpen}
            onClose={onClose}
            size="100%"></Actionsheet>
        </>
      )}
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => {
          navigation.navigate('Datos', { selectedAddress: selectedAddress });
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.buttonText}> continuar</Text>
          <Icon name="play-outline" size={30} color="white" />
        </View>
      </TouchableOpacity>



      <View >
        <Card style={styles.containeruwu}>

        </Card>
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
    marginTop: 9,
  },

  headerWITHE: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    padding: 2,
    justifyContent: 'center',
  },

  cardcontainer: {
    height: '70%',
  },
  CardInfo: {
    height: '10%',
    paddingHorizontal: '15%',
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
    backgroundColor: 'black',
    zIndex: 9999,
  },
  headerinput: {
    backgroundColor: 'black',
    zIndex: 999,
    color: 'black',
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
      height: 3,
    },
    right: 30,
    bottom: 50,
    backgroundColor: '#ff1493',
    borderRadius: 100,
    width: '30%',
    height: '10%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  containeruwu: {
    position: 'absolute',
    shadowColor: 'black',
    shadowOpacity: 30,
    shadowOffset: {
      width: -1,
      height: 3,
    },
    right: 30,
    bottom: 50,
    backgroundColor: '#ff1493',
    borderRadius: 100,
    width: '30%',
    height: '10%',
    justifyContent: 'center',
  },
});
