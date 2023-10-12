import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View,Platform, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground,Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';



export const DatosPScreen = () => {
  const navigation = useNavigation();

  const [errorNombre, setErrorNombre] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [errorTelefonoMessage, setErrorTelefonoMessage] = useState('');

  const [nombre, setNombre] = useState('');
  const [numeroTelefonico, setNumeroTelefonico] = useState('');
  const [referencias, setReferencias] = useState('');
 

  const [datosGuardados, setDatosGuardados] = useState(null);
  const [isInputFocused, setInputFocused] = useState(false);

  const route = useRoute();
  const selectedAddress = route.params.selectedAddress;
  

  useEffect(() => {
    const obtenerDatosGuardados = async () => {
      try {
        const nombreGuardado = await AsyncStorage.getItem('nombre');
        setDatosGuardados({
          nombre: nombreGuardado,
        });
      } catch (error) {
        console.log('Error al obtener los datos guardados:', error);
      }
    };

    obtenerDatosGuardados();
  }, []);

  const guardarDatos = async () => {
    try {
      const datosGuardados = await AsyncStorage.getItem('datos');
      let datosActualizados = [];
      if (datosGuardados) {
        datosActualizados = JSON.parse(datosGuardados);
      }
      const nuevosDatos = {
        nombre,
        numeroTelefonico,
        referencias,
        selectedAddress,
      };
      datosActualizados.push(nuevosDatos);
      await AsyncStorage.setItem('datos', JSON.stringify(datosActualizados));
      console.log('Datos guardados uwu');
      setDatosGuardados(nuevosDatos);
    } catch (error) {
      console.log('Error al guardar los datos unu:', error);
    }
  };

  const isValidPhoneNumber = (phone: string) => {

    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleSaveData = () => {
   
    if (!nombre || !numeroTelefonico || !selectedAddress) {
      setErrorNombre(!nombre);
      setErrorTelefono(!numeroTelefonico);
      setErrorDireccion(!selectedAddress);
      setErrorTelefonoMessage('Por favor, complete todos los campos.');
      return;
    }

   
    if (!isValidPhoneNumber(numeroTelefonico)) {
      setErrorTelefono(true);
      setErrorTelefonoMessage('El número de teléfono debe tener 10 dígitos.');
      return;
    }

   
    guardarDatos();
    navigation.navigate('Shopping');
  };

  return (
     <>
    <ScrollView>
   
      <View style={styles.container}>
       
        
          <View style={styles.container2}>
          <ImageBackground  source={require('../assets/lottie/icon/marcador.png')} resizeMode="cover" style={styles.image}>
                <View style={styles.overlay}>
                  <Text style={{color:'white',fontSize: 20,fontWeight: 'bold',}}>Agrega tu información </Text>
                </View>
              </ImageBackground>
      </View>

   
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} >

      <Text style={styles.title}>Datos de dirección </Text>
      <Text style={styles.note}>*IMPORTANTE* *Recuerda poner los datos de quien va a recibir el paquete*</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={[styles.input, errorNombre && styles.errorInput]}
          placeholder="Por favor, escriba su nombre"
          placeholderTextColor="gray"
          value={nombre}
          onChangeText={(text) => {
            setErrorDireccion(false);
            setNombre(text);
          }}
        />
             {errorNombre && (
        <Text style={styles.errorMessage}>Este es obligatorio.</Text>
      )}

        <Text style={styles.label}>Número de Teléfono:</Text>
        <TextInput
          style={[styles.input, errorTelefono && styles.errorInput]}
          keyboardType="numeric"
          placeholder="Ingrese su número"
          placeholderTextColor="gray"
          value={numeroTelefonico}
          onChangeText={(text) => {
            setErrorTelefono(false);
            setNumeroTelefonico(text);
          }}
          />
            {errorTelefonoMessage && (
        <Text style={styles.errorMessage}>Este  campo debe tener 10 digitos.</Text>
      )}

     
     

        <Text style={styles.label}>Referencia (opcional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Escriba su referencia:"
          placeholderTextColor="gray"
          value={referencias}
          onChangeText={(text) => setReferencias(text)}
        />

        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={[styles.input, errorDireccion && styles.errorInput]}
          placeholder="Escriba su calle:"
          placeholderTextColor="gray"
          value={selectedAddress} 
          onChangeText={(text) => {
            setErrorDireccion(false);
            selectedAddress(text);
          }}
        />
{errorDireccion && (
        <Text style={styles.errorMessage}>Este campo es obligatorio.</Text>
      )}
        <Text style={styles.note}>*Los datos de dirección se llenan en la ventana del mapa*</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveData}>
        <Text style={styles.buttonText}>Guardar Datos</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
     
    </View>
    
     
    </ScrollView>
   
    </>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth:'100%'
  },
  container2: {
    width: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? '100%' : '48%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: Dimensions.get('window').height / Dimensions.get('window').width > 1.6 ? 0 : 5,
    marginBottom: 5
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 20,
  },
  note: {
    color: 'black',
    marginTop: 20,
    marginHorizontal: 15,
  },
  inputContainer: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    color: 'black',
  },
  errorInput: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#ff1493',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default DatosPScreen;
