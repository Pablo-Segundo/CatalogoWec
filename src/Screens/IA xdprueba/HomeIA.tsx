import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Image, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnimatedText = Animated.createAnimatedComponent(Text);

export const HomeIA = () => {
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
  const [image, setImage] = useState(require('../../assets/lottie/osuxd.png'));
    
    
   
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAnimated) {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimate(true);
        slideInAnimation();
      });
    }
  }, [isAnimated]);

  const slideAnim = useRef(new Animated.Value(1000)).current;
  const avatarAnim = useRef(new Animated.Value(-1000)).current;

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

      <TouchableWithoutFeedback onPress={handleTouch}>
        <View style={styles.container}>
          <Animated.View
            style={{
              transform: [{ translateX: avatarAnim }],
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={image}
              style={{ width: 100, height: 100 }}
            />
          </Animated.View>

          <View style={styles.textContainer}>
            <AnimatedText style={{
              fontSize: 20,
              marginBottom: 10,
              color: 'gray',
              opacity: fadeIn,
            }}>
              {texts[textIndex]}
            </AnimatedText>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={{ alignContent: 'center', alignItems: 'center',  justifyContent: 'space-between'  }}>
        {textIndex === texts.length - 1 && (
          <View style={{ flexDirection: 'row', }}>
          
              
               <TouchableOpacity style={{ backgroundColor: 'gray',  }}>
              <Text> Manual </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'gray',  }}>
              <Text> Asistido </Text>
            </TouchableOpacity>
            
          
          </View>
        )}
      </View>

      <View>
        <Text style={styles.touchToContinue}>(Toque para continuar)</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50,
    justifyContent: 'space-between',
    marginHorizontal: 50
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  touchToContinue: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 60
  },
});
