import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

/**
 * Componente de pergunta sobre peso
 * 
 * Localização: components/onboarding/WeightQuestion.tsx
 * Permite inserir peso em quilogramas
 */

interface WeightQuestionProps {
  weight: string;
  onChange: (weight: string) => void;
}

export default function WeightQuestion({ weight, onChange }: WeightQuestionProps) {
  
  const handleWeightChange = (text: string) => {
    // Limita a 3 dígitos e apenas números
    const weightValue = text.replace(/[^0-9]/g, '').slice(0, 3);
    onChange(weightValue);
  };

  return (
    <View style={styles.container}>
      
      {/* Ícone central */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🏋️</Text>
        </View>
      </View>

      {/* Pergunta */}
      <Text style={styles.question}>Qual o seu peso?</Text>

      {/* Input de peso */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={handleWeightChange}
          placeholder="0"
          placeholderTextColor="#8F9BB3"
          keyboardType="numeric"
          maxLength={3}
        />
        <Text style={styles.unit}>Kg</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2A2F38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 50,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    width: 150,
    height: 64,
    backgroundColor: '#2A2F38',
    borderRadius: 12,
    paddingHorizontal: 24,
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  unit: {
    fontSize: 20,
    fontWeight: '500',
    color: '#8F9BB3',
  },
});