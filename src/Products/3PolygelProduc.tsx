import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import pesta from './1PestañasProduc'

const HomeScreen = ({ navigation }) => {
  const handleImagePress = () => {
    navigation.navigate('pesta');
  };

  return (
    <View>
      <TouchableOpacity onPress={pesta}>
        <Image
          source={require('../Navigators/assets/lottie/react.jpg')}
          style={{ width: 200, height: 200 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;