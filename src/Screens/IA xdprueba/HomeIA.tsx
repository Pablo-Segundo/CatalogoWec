import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Image, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnimatedText = Animated.createAnimatedComponent(Text);

export const HomeIA = () => {
  const [fadeIn, setFadeIn] = useState(new Animated.Value(0));
  const [isAnimated, setIsAnimate] = useState(false);
  const [text, setText] = useState('Hola! bienvenido a ');
  const [text2, setText2] = useState('Wapizima app xd (no hay nombre)');
  const [image, setImage] = useState(require('../../assets/lottie/osuxd.png'));
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAnimated) {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 3000,
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
    // Cuando el usuario toca la pantalla, cambia el texto y la imagen
    setText('Mi nombre es: ');
    setText2('wapiUwU');
    setImage(require('../../assets/lottie/mexico.png')); // Cambia a la nueva imagen
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
            transform: [{ translateY: avatarAnim }],
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
            {text}
          </AnimatedText>

          <AnimatedText style={{
            fontSize: 20,
            marginBottom: 10,
            color: '#ff1493',
            opacity: fadeIn,
          }}>
            {text2}
          </AnimatedText>
        </View>
      
      </View>
    </TouchableWithoutFeedback>
    <View>
        <Text style={styles.touchToContinue}>(Toque para continuar)</Text>
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  emptyCartContainer: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  touchToContinue: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical:60
  },
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
  greetingBox: {
   marginVertical: 50,
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 5,
    padding: 10,
  },
  greetingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  exploreImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
  },
  emptyCartText: {
    fontSize: 30,
    marginBottom: 20,
    color: 'gray',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  exploreButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});


