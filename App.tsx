import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/Navigators/Navigation';
import { NativeBaseProvider } from 'native-base';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CartState } from './src/context/cart/CartState';
import { CopilotProvider } from "react-native-copilot";


export default function App() {
  const style = {
    backgroundColor: "black",
    borderRadius: 10,
    paddingTop: 5,

    
  };


  return (


    <>
      {/* <StripeProvider
      publishableKey="pk_test_51NNPllBsn6AXnSPi6VTNj1dg4eBhC4HCHadwxH1a4JNJ0Ffp3tqutylGB7mocT7tJAajQR8tV2p8xDtUNZvjfVXq00oKgyVEmy"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    > */}





      <NavigationContainer>
        <NativeBaseProvider>
          <CartState>
            <CopilotProvider overlay="svg" tooltipStyle={style}  arrowColor='black' stopOnOutsideClick androidStatusBarVisible>
              <Navigation />
            </CopilotProvider>
          </CartState>
        </NativeBaseProvider>
      </NavigationContainer>
      <Toast />

      {/* <TarjetaScreen/> */}
      {/* </StripeProvider> */}
    </>
  );
}



