import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { InternetComponet } from '../../components/InternetComponet';


 const LoadingScreen: React.FC = () => (


  <InternetComponet>

  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000FF" />
    
  </View>

  </InternetComponet>

);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
}); 

export default LoadingScreen;


