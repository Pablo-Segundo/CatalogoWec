import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import LoadingScreen from '../Screens/loadintgScreen'


const loading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //
    

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
    <View>
      <Text>UWU </Text>
    </View>
  );
};
export default loading;