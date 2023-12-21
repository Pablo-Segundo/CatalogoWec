import React, { useEffect, useRef, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AnimatedText = Animated.createAnimatedComponent(Text);

export const FirstScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [fadeIn, setFadeIn] = useState(new Animated.Value(0));
    const [isAnimated, setIsAnimate] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [texts, setTexts] = useState([
        'Hola! bienvenido a',
    'Catalogo Web xd (no hay nombre)',
    'y estoy para ayudarte ',
    'uwu',
    'Más frases...',
    'Como quieres comprar manual o automatica',
  ]);
  const [image, setImage] = useState(require('../assets/lottie/osuxd.png'));
   
  useEffect(() => {
    if (!isAnimated) {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimate(true);
        slideInAnimation();
      });
    }
  }, [isAnimated]);

  const slideAnim = useRef(new Animated.Value(1000)).current;
  const avatarAnim = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        checkIfFirstTime();
    })

    const checkIfFirstTime = async () => {
        try {
            const isFirstTime = await AsyncStorage.getItem('isFirstTime');
            if (isFirstTime === null) {

                setShowModal(true);

                await AsyncStorage.setItem('isFirstTime', 'false');
            }
        } catch (error) {
            console.error('Error al verificar si es la primera vez:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const handleTouch = () => {
        if (textIndex < texts.length - 1) {
          // Si hay más frases, actualiza el texto con la siguiente frase
          setTextIndex(textIndex + 1);
        } else {
          // Si es la última frase, muestra los botones para continuar manual o asistido
          // Puedes implementar lógica adicional aquí según la elección del usuario
          console.log('Mostrar botones para elegir continuar manual o asistido');
        }
      };

      useEffect(() => {
        Animated.spring(avatarAnim, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }, []);
    
      const slideInAnimation = () => {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      };


    return (
        <>
        <View>
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={{ color: 'black' }}>¡Bienvenido! Esta es tu primera vez aquí.</Text>
  
            <TouchableWithoutFeedback onPress={handleTouch}>
              <View style={styles.container}>
                <View style={styles.imageContainer}>
                  <Animated.View
                    style={{
                      transform: [{ translateX: avatarAnim }],
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image source={image} style={{ width: 100, height: 100 }} />
                  </Animated.View>
                </View>
  
                <View style={styles.textContainer}>
                  <AnimatedText
                    style={{
                      fontSize: 20,
                      marginBottom: 10,
                      color: 'gray',
                      opacity: fadeIn,
                    }}
                  >
                    {texts[textIndex]}
                  </AnimatedText>
                </View> 
              </View>
            </TouchableWithoutFeedback>
  
            <View style={styles.buttonContainer}>
              {textIndex === texts.length - 1 && (
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.button}>
                    <Text> Manual </Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity style={styles.button}>
                    <Text> Asistido </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
  
            <TouchableOpacity onPress={closeModal}>
              <Text style={{ color: 'black' }}> Omitir xd</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      
            {/* <View>
            <Text style={styles.touchToContinue}>(Toque para continuar)</Text>
            </View> */}
     </View>
</>
    );
  };

const styles = StyleSheet.create({
      box: {
        height: 80,
        width: 80,
        margin: 20,
        borderWidth: 1,
        borderColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: '#b58df1',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
     
      //---
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 60
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      imageContainer: {
        marginRight: 20,
      },
      textContainer: {
        flex: 1,
      },
      buttonContainer: {
        marginTop: 20,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      button: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
      },
      touchToContinue: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 60
      },
});