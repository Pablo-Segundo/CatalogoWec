import React, { useRef } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

export const MyActionSheet = () => {
  const bottomSheet = useRef();

  return (
    <SafeAreaView style={styles.container}>
      
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
        <View>
          <Text style={styles.text1} >hola uwu </Text>
        </View>
      </BottomSheet>

     




      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}>
        <Text style={styles.text}>Open</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  text1: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});



