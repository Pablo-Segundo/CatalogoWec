import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const ImageStyle = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Navigators/assets/lottie/react.jpg')}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Hola </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black', 
    fontSize: 20, 
    fontWeight: 'bold', 
  },
});
export default ImageStyle;