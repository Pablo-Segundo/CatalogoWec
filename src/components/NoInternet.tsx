import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';


export const NoInternet= () => {

    return(
       <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hay conexión a internet</Text>
       <Image source={require('../assets/lottie/osuxd.png')} style={styles.errorImage} />
        
       <TouchableOpacity style={styles.continueButton}>
        <Text> volver a intentar </Text>

       </TouchableOpacity>
      </View> 
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
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
      color: 'black'
    },
    errorImage: {
      width: '70%',
      alignItems: 'center',
      backgroundColor: 'black',
      resizeMode: 'contain',
    },

});