import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { InternetComponet } from '../../components/InternetComponet';


 const LoadingScreen: React.FC = () => (


  <InternetComponet>

  <View style={styles.container}>
    <ActivityIndicator size="large" color="#ff1493" />
      <Text style={{color:'#ff1493', fontSize: 20}}>
        Cargando... 
    </Text>
  </View>

  </InternetComponet>

);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
    
  },
}); 

export default LoadingScreen;


