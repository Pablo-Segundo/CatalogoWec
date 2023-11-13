import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Home = ({ text, isMine }: any) => {
  const bubbleStyles = isMine ? styles.myBubble : styles.otherBubble;

  return (
    <View style={[styles.bubble, bubbleStyles]}>
      <Text>buenos dias 
        
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 20,
    padding: 10,
    maxWidth: '70%',
  },
  myBubble: {
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
  },
});
