import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const FirstScreen = () => {
    const [showModal, setShowModal] = useState(false);

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


    return (
        <View>

            <Modal visible={showModal} animationType="slide" >
                <View>
                    <Text style={{color:'black'}}>¡Bienvenido! Esta es tu primera vez aquí.</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


        </View>
    )
}