import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { LoadingScreen } from './loadintgScreen';


export const productsLoading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
   


    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View>
      <Text>í</Text>
    </View>
  );
};
