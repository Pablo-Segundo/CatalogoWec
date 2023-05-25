import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import API from "../API/API";
import {useNavigation } from '@react-navigation/native';


export const Product = () => {
    const navigation = useNavigation();
    
  const [categories, setCategories] = useState();
  const getCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data.categories)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  if (!categories) {
    return null;
  } else {
     return{
                                      




     }
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 400,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 170,
      resizeMode: 'cover',
      margin: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    IconContainer: {
      position: 'absolute',
      top: 15,
      right: 25,
      zIndex: 1,
    },
    TextContainer: {
      color: 'black',
      position: 'absolute',
      top: 20,
      left: 25,
      zIndex: 1,
    }
  });