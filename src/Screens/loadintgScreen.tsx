import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';



 const LoadingScreen: React.FC = () => (



  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000FF" />
    
  </View>

);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
}); 

export default LoadingScreen;


