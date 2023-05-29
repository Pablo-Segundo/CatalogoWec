import * as React from 'react';


import { NavigationContainer } from '@react-navigation/native';

import { Navigation } from './src/Navigators/Navigation';
// import Icons from './src/Screens/Api/Icon';


export default function App() {
  return (
    <NavigationContainer>
       <Navigation/>
    </NavigationContainer>
  

  );
  }



