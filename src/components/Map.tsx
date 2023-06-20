import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform, Button, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../Styles/mapStyle';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import { Card } from 'react-native-paper';

export function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const { showActionSheetWithOptions } = useActionSheet();

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
             
              <Button title="completa tus  datos" onPress={showActionSheet} />
 
             <View style={styles.buyButton}>
            <Card >

              <Text> hola ------------------- </Text>
            </Card>

            </View> 



            
          </>
        )}
      </View>
    </ActionSheetProvider>
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
    backgroundColor: '#ff69b4',
    padding: 50,
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});