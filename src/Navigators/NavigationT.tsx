import React, { useEffect, useReducer, useRef } from 'react'
import { Pressable, StatusBar,StyleSheet,View,Text,LayoutChangeEvent,} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Svg, { Path } from 'react-native-svg'
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated'
import Lottie from 'lottie-react-native'
import { CategoriesScreen } from '../Screens/CategoriesScreen';
import { ShoppingScreen } from '../Screens/shoppingcart'
import { Direction } from '../Screens/directionsP'
import { ActionSh } from '../Screens/Actionproduct'

const Tab = createBottomTabNavigator()
const AnimatedSvg = Animated.createAnimatedComponent(Svg)


export const NavigationTab =  () => {
return (
    <>
    <StatusBar barStyle="light-content" />
     <Tab.Navigator
          tabBar={(props) => <AnimatedTabBar {...props} />}
        >
      <Tab.Screen
            name="Home"
            options={{
              headerShown: false,
              // @ts-ignore
              tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./assets/lottie/home.icon.json')} style={styles.icon} />,
            }}
            component={CategoriesScreen}
           
          />
            <Tab.Screen
            name="upload"
                             
            options={{
              headerShown: false,
              // @ts-ignore
              tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./assets/lottie/upload.icon.json')} style={styles.icon} />,
            }}
            component={ ActionSh }
          />
       </Tab.Navigator>

    </>
)
}
const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors } : BottomTabBarProps) => {
    const { bottom } = useSafeAreaInsets()
  
  
    const reducer = (state: any, action: { x: number, index: number }) => {
      return [...state, { x: action.x, index: action.index }]
    }
  
    const [layout, dispatch] = useReducer(reducer, [])
    console.log(layout)
  
    const handleLayout = (event: LayoutChangeEvent, index: number) => {
      dispatch({ x: event.nativeEvent.layout.x, index })
    }
  
    
  const xOffset = useDerivedValue(() => {
   
    if (layout.length !== routes.length) return 0;
    
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25
   
  }, [activeIndex, layout])

  const animatedStyles = useAnimatedStyle(() => {
    return {
    
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    }
  })

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill="#dcdcdc"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex
          const { options } = descriptors[route.key]

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          )
        })}
      </View>
    </View>
  )
}
type TabBarComponentProps = {
    active?: boolean
    options: BottomTabNavigationOptions
    onLayout: (e: LayoutChangeEvent) => void
    onPress: () => void
  }
  
  const TabBarComponent = ({ active, options, onLayout, onPress }: TabBarComponentProps) => {
   
    const ref = useRef(null)
  
    useEffect(() => {
      if (active && ref?.current) {
        // @ts-ignore
        ref.current.play()
      }
    }, [active])
  
   
    const animatedComponentCircleStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withTiming(active ? 1 : 0, { duration: 250 })
          }
        ]
      }
    })
  
    const animatedIconContainerStyles = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
      }
    })
  
    return (
      <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
        <Animated.View
          style={[styles.componentCircle, animatedComponentCircleStyles]}
        />
        <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
          {/* @ts-ignore */}
          {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
        </Animated.View>
      </Pressable>
    )
  }
  
  // ------------------------------------------------------------------
  
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: '#d3afd4',
     
    },
    activeBackground: {
      position: 'absolute',
    },
    tabBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
       
    },
    component: {
      height: 60,
      width: 60,
      marginTop: -5,
    },
    componentCircle: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: 'white',
    },
    iconContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      height: 36,
      width: 36,
    }
  })
  
  
  

