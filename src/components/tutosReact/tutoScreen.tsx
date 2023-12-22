import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { AppTourView, AppTourSequence } from 'react-native-copilot';
import { ProductCard } from '../ProductCard';

export const TutoScreen = ({ start }) => {
  const handleStart = () => {
    const tourSteps = [
      {
        targetView: 'button1',
        title: 'Paso 1',
        description: 'Este es el botón 1',
        outerCircleColor: '#3498db',
        innerCircleColor: '#3498db',
        targetRadius: 40,
        titleTextSize: 24,
        descriptionTextSize: 16,
      },
    ];

    const tourSequence = new AppTourSequence();
    tourSteps.forEach(step => tourSequence.addStep(step));

    start(tourSequence);
  };

  return (
    <> 
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleStart}
        testID="button1"
      >
        <Text style={styles.buttonText}>Botón 1</Text>
      </TouchableOpacity>

      <AppTourView />
    </View>

    <View>
    <Button title="Start tutorial" onPress={() => start()} />
    </View>
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


