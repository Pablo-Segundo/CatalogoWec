import React, { useContext, useEffect } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CategoriesScreen } from "../../Screens/categories/CategoriesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { usePermissions } from "../../hook/usePermission";
import { CartContext } from "../../context/cart/CartContext";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();


// console.log(cart, 'uwu')

// const uniqueProductIds = new Set(cart.map((item) => item.product._id));
// console.log('Unique Product IDs:', uniqueProductIds);


export const CategoriesStack = () => {

const { askLocationPermission } = usePermissions();
const navigation = useNavigation();
const size = Platform.OS === "ios" ? 30 : 35;
const { cart } = useContext(CartContext);


  useEffect(() => {
    askLocationPermission();
  }, []);
  

  return (
      <> 
       <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerShown: true,
            header: () => (
              <>
                <SafeAreaView style={{ backgroundColor: "#F00A84" }} />
                <StatusBar
                  animated={true}
                  backgroundColor="#F00A84"
                />

                <View
                  style={{
                    height: Platform.OS === "ios"
                      ? (Dimensions.get("window").height * .07)
                      : (Dimensions.get("window").height * .075),
                    backgroundColor: "#F00A84",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      height: "90%",
                    }}
                  >
                    <View style={{ width: "30%" }}>
                    </View>
                    <View
                      style={{
                        width: "40%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Dimensions.get("window").width / 22,
                          color: "white",
                          fontWeight: "bold",
                          marginVertical: Dimensions.get("window").height * .01,
                        }}
                      >
                        Categorias 
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        width: "30%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => navigation.navigate("Shopping")}
                    >
                      <View
                        style={{
                          borderRadius: 100,
                          backgroundColor: "white",
                          padding: 3,
                          width: "40%",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="cart-outline" size={size} color="black" />
                       
                          <Text style={styles.productCount2}>{cart.length}</Text>
                      
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ),
          }}
        />
      </Stack.Navigator> 
      </>
  );
};

const styles = StyleSheet.create({
  icon: {
    borderRadius: 100,
    backgroundColor: "#E3087E",
    padding: Platform.OS === "ios" ? 2 : 6,
    alignItems: "center",
    position: "relative",
  },
  productCount: {
    position: "absolute",
    top: -9,
    right: 13,
    color: "black",
    fontSize: 20,
    zIndex: 9999,
  },
  productCount2: {
    position: 'absolute',
    top: -9,
    right: 13,
    backgroundColor: 'red', 
    color: 'white', 
    fontSize: 16, 
    borderRadius: 50, 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    zIndex: 9999,
  },
});
