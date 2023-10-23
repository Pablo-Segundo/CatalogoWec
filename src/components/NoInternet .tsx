import React from 'react';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  
    height: 40,
    backgroundColor: 'red',
    padding: 5,
    paddingLeft: 10,
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  text: {
    fontSize: 17,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 100,
    marginTop: 350,
  },
  continueButton: {
    backgroundColor: '#ff1493',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  errorImage: {
    width: '70%',
    alignItems: 'center',
    backgroundColor: 'black',
    resizeMode: 'contain',
  },
});

export const NoInternet = () => {
  return (
    <>
      <Animated.View style={[styles.container]}>
        <StatusBar backgroundColor="red" />
        <Text style={styles.text}>No cuenta con internet :c</Text>


<View style={{marginTop:100,  alignItems: 'center',
     }}>
      <Image
          source={require('../assets/lottie/osuxd.png')}
          style={styles.errorImage}
        />
</View>
    


      </Animated.View>


     
     

     
      <View style={{backgroundColor:'white', marginTop: 500}}>  

      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hay conexión a internet</Text>

        {/* <Image
          source={require('../assets/lottie/osuxd.png')}
          style={styles.errorImage}
        /> */}

        <TouchableOpacity style={styles.continueButton}>
          <Text> volver a intentar </Text>
        </TouchableOpacity>
      </View>

      </View>


    </>
  );
};
