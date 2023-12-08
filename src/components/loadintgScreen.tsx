import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { InternetComponet } from './InternetComponet';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';


const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

 const LoadingScreen: React.FC = () => (
 


  <InternetComponet>

  <View style={styles.container}>
    <ActivityIndicator size="large" color="#ff1493" />
      <Text style={{color:'#ff1493', fontSize: 20}}>
        Cargando ... 
    </Text>
  </View>

  </InternetComponet>

);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 999
    
  },
}); 

export default LoadingScreen;


