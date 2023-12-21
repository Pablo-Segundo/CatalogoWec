import React, { useEffect, useRef, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  BounceIn,
  BounceOut,
  FadeInLeft,
} from "react-native-reanimated";

const DURATION = 500;
const DELAY = 500;
const text = ['React', 'Native', 'Reanimate'];



const AnimatedText = Animated.createAnimatedComponent(Text);

export const FirstScreen = () => {
    const [showModal, setShowModal] = useState(false);
    // animation
    const [isShown, setShown ] = useState(false);
    const opacity1 = useSharedValue(0);
    const opacity2 = useSharedValue(0);
    const opacity3 = useSharedValue(0);

   


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

    const show = () => {
      if (isShown) {
        opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
        opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION })); 
        opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION })); 
        }else{
        opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
        opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
        opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));

        }
        setShown(!isShown);
    };

 

    
 

    return (
        <>
        <View>
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
         <Animated.Text style={{ ...styles.label, opacity: opacity1 }}> ¡Bienvenido! </Animated.Text>

         <Animated.Text style={{ ...styles.label, opacity: opacity2 }}>a </Animated.Text>

         <Animated.Text style={{ ...styles.label2, opacity: opacity3 }}>catàlogo wec </Animated.Text>



            <View style={styles.container}>
      <View style={styles.text}>

      <Animated.Image entering={FadeInLeft} exiting={BounceOut} 
          source={require('../assets/lottie/osuxd.png')}
          style={{
            width: 100,
            height: 100,
            marginBottom: 10,
        }}
        /> 

       

        {/* <Animated.Text style={{ ...styles.label, opacity: opacity1 }}> ¡Bienvenido! </Animated.Text>
        <Animated.Text style={{ ...styles.label, opacity: opacity2 }}>a </Animated.Text>
        <Animated.Text style={{ ...styles.label2, opacity: opacity3 }}>catalogo wec </Animated.Text> */}

      </View>
      <Button title={isShown ? 'Hide' : 'Show'} onPress={show} />
    </View>

      

            <TouchableOpacity onPress={closeModal}>
              <Text style={{ color: 'black', fontSize: 20 }}> Omitir xd</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      
        
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
      // text: {
      //   color: '#b58df1',
      //   textTransform: 'uppercase',
      //   fontWeight: 'bold',
      // },
     
      //---
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 60
      },
      // container: {
      //   flexDirection: 'row',
      //   alignItems: 'center',
      // },
      imageContainer: {
        marginRight: 20,
      },
      // textContainer: {
      //   flex: 1,
      // },
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
      //----
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      text: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      label: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: 8,
      },
      label2: {
        fontSize: 20,
        color: '#FF1493',
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: 8,
      },
      divider: {
        borderRightWidth: 1,
        borderRightColor: '#ddd',
      },
      animatedBorder: {
        height: 8,
        width: 64,
        backgroundColor: 'tomato',
        borderRadius: 20,
      },
});