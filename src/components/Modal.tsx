import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements';


export default function Modal([ isVisible, setVisible, children]) {
    return (
          <Overlay 
                isVisible={isVisible} 
                overlayStyle={styles.Overlay}
                onBackdropPress={() =>setVisible(false)}
                >
                {
                    children
                }
            </Overlay>
     
      )
    }

 const styles = StyleSheet.create({
    Overlay: {
        width: "90%"
    }
 })
   
   
 
  