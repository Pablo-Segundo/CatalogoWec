
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, { 
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    withRepeat,
    
    

} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

//  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const pruebasanimacion = () => {
    const defaultAnim = useSharedValue(200);
    const linear = useSharedValue(200);
    const translateX = useSharedValue(0);
    const r = useSharedValue(10);

    const animatedDefault = useAnimatedStyle(() => ({
        transform: [{ translateX: defaultAnim.value }],
      }));
      const animatedChanged = useAnimatedStyle(() => ({
        transform: [{ translateX: linear.value }],
      }));

      React.useEffect(() => {
        linear.value = withRepeat(
          withTiming(-linear.value, {
            duration,
            easing: Easing.linear,
          }),
          -1,
          true
        );
        defaultAnim.value = withRepeat(
          withTiming(-defaultAnim.value, {
            duration,
          }),
          -1,
          true
        );
      }, []);

    // const handlePress = () => {
    //     r.value += 10;
    // };

    // const animatedProps = useAnimatedProps(() => ({
    //     r: withTiming(r.value),
    // }));




    return (
        <View style={styles.container}>

<Text style={{color:'black'}}> Bienvenido a "Catàlogo wec" </Text>

            <Animated.Image
           source={require('../assets/lottie/osuxd.png')}
            style={[styles.box, animatedDefault]}
            >
            </Animated.Image>

            <Animated.View style={[styles.box, animatedChanged]}>
                <Text style={styles.text}> HOLA A TODOS </Text>
            </Animated.View>
            {/* <Svg style={styles.svg}>
                <AnimatedCircle
                    cx="50%"
                    cy="50%"
                    fill="#b58df1"
                    animatedProps={animatedProps}
                />
            </Svg>
            <Button onPress={handlePress} title="Click me" /> */}
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
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
});