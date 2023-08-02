import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/Navigators/Navigation';
import { NativeBaseProvider } from 'native-base';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
// import Icons from './src/Screens/Api/Icon';
import { StripeProvider } from '@stripe/stripe-react-native';
import { TarjetaScreen } from './src/Screens/Tarjeta';


export default function App() {
  return (
    <> 
    <NavigationContainer>
      <NativeBaseProvider>
       <Navigation/>
      </NativeBaseProvider>
    </NavigationContainer>
    <Toast/>
    </>
  );
  }



