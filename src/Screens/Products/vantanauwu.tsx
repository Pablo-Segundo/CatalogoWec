import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity,Platform, StyleSheet,ImageBackground,Dimensions, TextInput,ScrollView, Linking } from "react-native";
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';




export const Ventanauwu = () => {
    const navigation = useNavigation();


    const openMapLink = () => {
        const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.14544889983!2d-99.66265068578412!3d19.276040050664797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89a337ab3863%3A0xe5209d75006ddf53!2sDr.%20Andr%C3%A9s%20Benavides%20304%2C%20Residencial%20Col%C3%B3n%20y%20Col%20Cipr%C3%A9s%2C%2050120%20Toluca%20de%20Lerdo%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1650566416705!5m2!1ses-419!2smx'; // Cambia las coordenadas según tu enlace
        Linking.openURL(mapUrl);
      };

      
  return(
    <>
      
    <View> 
        
    
    <View style={{
        zIndex: 1, opacity: 0.7,
        position: 'absolute', alignSelf: 'center',
      }}>
        <TextInput
          style={styles.directionInput}
          placeholder="Escriba su calle:"
          placeholderTextColor={'black'}
        //   onChangeText={handleAddressChange}
        />
      </View>
      <ScrollView>


    <TouchableOpacity style={styles.container}>
      <ImageBackground  source={require('../../assets/lottie/fondoxd.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.overlay}>
              <Text style={{color:'white',fontSize: 20,fontWeight: 'bold',}}>Contáctanos</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

    <View style={styles.containericontainer}>


      


        <Text style={styles.Text}> Envianos un mensaje </Text>


        <TextInput
             style={[styles.discountCodeInput  ]}
             placeholder="ingresa tu nombre"
            //  value={}
             placeholderTextColor={'black'}
                />
        <TextInput
             style={[styles.discountCodeInput  ]}
             placeholder="ingresa tu correo electronico"
            //  value={}
             placeholderTextColor={'black'}
                />
        <TextInput
             style={[styles.discountCodeInput  ]}
             placeholder="ingresa tu número telefonico "
            //  value={}
             placeholderTextColor={'black'}
                />

        <TextInput
            style={[styles.discountCodeInput2  ]}
             placeholder="¿como podemos ayudarte? "
            //  value={}
             placeholderTextColor={'black'}
                />
        </View>

        <TouchableOpacity style={styles.Button} >
            <Text style={{color:'white',fontSize: 20,fontWeight: 'bold', }}>ENVIAR</Text>
        </TouchableOpacity>


       <View>
        <Card>
          <View>
          <Text style={styles.Text}>Dirección</Text>
          <Icon name="user" size={20} color="#000" style={styles.icon} />
          <Text style={{color: 'black'}}>Dr. Andrés Benavides 304, Residencial Colón y Col Ciprés, 50120 Toluca de Lerdo, Méx.</Text>
          </View>
          <View>
          <Text style={styles.Text}>Hablemos </Text>
          <Icon name="phone" size={20} color="#000" style={styles.icon} />
          <Text style={{color: 'black'}} >+52 (722 781 5291)</Text>
          <Text style={{color: 'black'}}>+52 (729 143 9285)</Text>
          </View>
          <View>
          <Text style={styles.Text}>Soporte de venta </Text>
          <Icon name="envelope" size={20} color="#000" style={styles.icon} />
          <Text style={{color: 'black'}}>info@wapizima.com.mx</Text>
          </View>
       </Card>
           <Card style={styles.container}>

            <TouchableOpacity onPress={openMapLink} >

            </TouchableOpacity>

      
            </Card>
       

       </View>
       </ScrollView>
        
     </View>
  
    


    </>
  )
}
 const styles = StyleSheet.create({
    containericontainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', 
      },
      Button: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginVertical: 15,
        marginHorizontal: 80,
      },

    icon: {
        marginRight: 10,
        flexDirection: 'row'
      },
      Text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        width: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? '100%' : '48%',
        justifyContent: 'center',
        marginTop: 70,
        alignItems: 'center',
        margin: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? 0 : 5,
        marginBottom: 5
      },
      image: {
        width: '100%',
        height: 170,
        resizeMode: 'cover',
      },
      directionInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginHorizontal: 5,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        width: '100%',
        minWidth: '98%',
        maxWidth: '98%',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10
      },
      discountCodeInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        color: 'black',
        
      },
      discountCodeInput2: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        color: 'black',
        height: 150,
      },
      map: {
        flex: 1,
      },
 })
