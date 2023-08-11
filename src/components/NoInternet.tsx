import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';


export const NoInternet= () => {

    return(
       <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No hay conexión a internet</Text>
       <Image source={require('../assets/lottie/osuxd.png')} style={styles.errorImage} />
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