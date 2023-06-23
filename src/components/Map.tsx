import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform,  TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../Styles/mapStyle';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';




import { useDisclose, Button, Actionsheet, Icon  } from 'native-base';
import { useNavigation } from '@react-navigation/native';



export function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const { isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [numeroTelefonico, setNumeroTelefonico] = useState('');
  const [referencias, setReferencias] = useState('');




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

  const showActionSheet = () => {
    const options = ['Datos 1', 'Option 2', 'Cancel'];



    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          console.log('Option 1 selected');
        } else if (buttonIndex === 1) {
          console.log('Option 2 selected');
        } else {
          console.log('Cancel button pressed');
        }
      }
    );
  };

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

    <ActionSheetProvider>    
        <View style={styles.container}>
          {currentLocation && (
            <>
            <MapView
              customMapStyle={mapStyle}
              provider={PROVIDER_GOOGLE}
              style={styles.mapStyle}
              region={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
              mapType="standard"
            >
              <Marker
                coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                title="Mi ubicación"
                description="Esta es mi ubicación actual"
              />
            </MapView>
 
   
            <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
           <Actionsheet.Content>
            <View> 
              <Text style={styles.textgray}> *IMPORTANTE* *recuerde poner los datos de quien va a recibir el paquete*</Text> 
            <Text style={styles.headerText}> Direccion:  </Text>
            <TextInput style={styles.discountCodeInput} placeholder=" "/>
  

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
              <Button
               
              style={styles.CardInfo}
                onPress={() => {
                  guardarDatos();
                  navigation.navigate('Direction');
                }}
            />

                
            </View>


            </Actionsheet.Content>
            </Actionsheet>
             
             
       <Button title='botton' onPress={onOpen}>     
        Ver Detalles
        </Button>   
              </>
            )}
          </View>
        </ActionSheetProvider>

        <Button title='botton' onPress={onOpen}>     
        Agregue sus Dtos 
        </Button>
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
  },
  buyButton: {
    backgroundColor: 'gray',
    padding: 50,
    borderRadius: 5,
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
    color: 'gray'
    
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