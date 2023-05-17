import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const navigateToOtherScreen = () => {
    navigation.navigate('Other');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={navigateToOtherScreen}>
        <Icon name="shopping-basket" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});