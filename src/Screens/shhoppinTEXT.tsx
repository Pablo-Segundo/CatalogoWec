import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const ShoppingTest  = () => {
  const route = useRoute();
  const { quantity } = route.params;

  return (
    <View>
      <Text>Cantidad seleccionada : {quantity}</Text>
    </View>
  );
};

