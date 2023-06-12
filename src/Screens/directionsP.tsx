import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from "react-native-paper";
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export const Direction = () => {
    const navigation = useNavigation();
    // const [text, saetText] = React.useState("");
  return(
    
    <> 
              <View style={styles.header}>
        <Text style={styles.headerText}>WAPIZIMA</Text>
        <TouchableOpacity
          style={styles.shoppingCartButton}
          onPress={() => navigation.navigate('Shopping', {})}
        >
          <View style={styles.shoppingCartIcon}>
            <Icon name="shopping-cart" size={30} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      
       
      <Text style={styles.productname}>Agregue su dirección </Text>

     <Card style={styles.cardContainer}>
        <Text style={styles.textMap}> Mapa xd</Text>
     </Card>

     {/* <TextInput
      label="direcction"
      value={text}
      onChangeText={text => setText(text)}
    /> */}


      
    {/* <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Confirmar direccion</Text>
    </TouchableOpacity>  */}

    <Text style={styles.productname}> Datos de la persona  </Text>
      <Text style={styles.textgray}> Nombre: </Text>
      <Text style={styles.textgray}> etc: </Text>
      <Text style={styles.textgray}> Telefono </Text>
      <Text style={styles.textgray}> Uwu</Text>



      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Confirmar Datos </Text>
    </TouchableOpacity> 

   
      
     
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      cardContainer:{
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
    
      },
      productname:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
        marginVertical: 25,
        marginHorizontal: 25,
    
      },
      textgray: {
        color: 'gray',
      },
      textMap:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
        marginVertical: 100,
        marginHorizontal: 140,
    
      
    
      },
      tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        color:'black',
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
      },
      tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      rowText: {
        fontSize: 14,
        color: 'black'
      },
      buyButton: {
        backgroundColor: '#D3AFD4',
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
      
      },
      buyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      TextContainer: {
        color: 'black',
        position: 'absolute',
        top: 20,
        left: 25,
        zIndex: 1,
      },
      IconContainer: {
        position: 'absolute',
        top: 15,
        right: 25,
        zIndex: 1,
      },
      IconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
      style:{
        height: '10%',
          backgroundColor: '#D3AFD4',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#D3AFD4',
      },
    
      shoppingCartButton: {
        marginRight: 10,
      },
      shoppingCartIcon: {
        padding: 5,
        borderRadius: 50,
        backgroundColor: '#FFF',
      },

})