import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform,  TouchableOpacity, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../Styles/mapStyle';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import { Card } from 'react-native-paper';

import Buttonsh from 'react-native-paper';
import { useDisclose, Button, Actionsheet, Icon  } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const { isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();



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
 
   
            <Actionsheet isOpen={isOpen} onClose={onClose}>
           <Actionsheet.Content>
            <View>  

              <Text> Nombre de quíen recibe:</Text>
            <TextInput style={styles.discountCodeInput} placeholder="Código de descuento"/>
            <TextInput style={styles.discountCodeInput} placeholder="Código de descuento"/>
           
            <TextInput style={styles.discountCodeInput} placeholder="Código de descuento"/>
                <Text> Número telefónico </Text>
            <TextInput style={styles.discountCodeInput} placeholder="Código de descuento"/>
            <Text>Referencias: </Text>
            <TextInput style={styles.discountCodeInput} placeholder="Código de descuento"/>
             
             <Button> Guardar </Button>

            </View>
            </Actionsheet.Content>
            </Actionsheet>
             

             {/* <View>     
              <Card style={StyleSheet.cardcontainer}>
            <Button onPress={onOpen}>     
             Ver Detalles
             </Button>
             </Card>
             </View>  */}


             
       <Button title='botton' onPress={onOpen}>     
        Ver Detalles
        </Button>

        {/* <Card style={styles.cardcontainer}> 
        <Text> hola ------------------- </Text>
        </Card> */}
            
              </>
            )}
          </View>
        </ActionSheetProvider>

        <Button title='botton' onPress={onOpen}>     
        Agregue sus datos 
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
    height: '35%',
    paddingHorizontal:'35%'
  },
  discountCodeInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D3AFD4',
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
});