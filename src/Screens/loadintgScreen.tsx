// import React from "react";
// import { Spinner, HStack, Center, NativeBaseProvider } from "native-base";

// const Example = () => {
//   return <HStack space={8} justifyContent="center" alignItems="center">
//       <Spinner size="sm" />
//       <Spinner size="lg" />
//     </HStack>;
// };

//     export default () => {
//         return (
//           <NativeBaseProvider>
//             <Center flex={1} px="3">
//                 <Example />
//             </Center>
//           </NativeBaseProvider>
//         );
//     };
    




import { Text } from 'native-base';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';



 const LoadingScreen: React.FC = () => (



  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000FF" />
  </View>

);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
}); 

export default LoadingScreen;


