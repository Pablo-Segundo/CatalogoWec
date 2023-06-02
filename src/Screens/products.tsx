import React from "react";
import { Slide, Button, Box, Heading, VStack, HStack, Text, Spacer, WarningIcon, Input, Center, useSafeArea, NativeBaseProvider } from "native-base";
import { View,  Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


const Products = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const safeAreaProps = useSafeArea({
    safeAreaTop: true
  });
  return <Center>
     {/* <Text style={styles.TextContainer}> WAPIZIMA</Text>
        <TouchableOpacity style={styles.IconContainer}
            onPress={() => navigation.navigate('shopping', { })}>
          <Icon name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
        <View
          style={{
            height: '30%',
            backgroundColor: '#D3AFD4',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius:20,
          }}
        /> */}
        {/* <View>       */}
  
    




       
         



      <Box w={["250", "300"]}>
        <Box w="100%" alignItems="flex-start" justifyContent="center">
          <VStack space={3} w="100%">
            <HStack alignItems="flex-end">
              <Heading>orden</Heading>
              <Spacer />
              <WarningIcon color="orange.600" size="xs" mb="1.5" />
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Sub Total</Text>
              <Text color="blueGray.400">$298.77</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Tax</Text>
              <Text color="blueGray.400">$38.84</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Total Amount</Text>
              <Text color="green.500">$337.61</Text>
            </HStack>
            <VStack space={2} mt="2">
              <Text bold>Promo Code</Text>
              <HStack space={3}>
                <Input flex="1" />
                <Button variant="outline">Apply</Button>
              </HStack>
            </VStack>
            <Button my="2" onPress={() => setIsOpen(!isOpen)}>
              Place Order
            </Button>
          </VStack>
        </Box>
        <Slide in={isOpen} placement="top">
          <Box p="2" _text={{
          color: "orange.600"
        }} bg="orange.200" {...safeAreaProps}>
            hola uwu hola 
          </Box>
        </Slide>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Products />
            </Center>
          </NativeBaseProvider>
        );
    };

    