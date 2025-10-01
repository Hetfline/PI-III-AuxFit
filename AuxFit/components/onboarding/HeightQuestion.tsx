import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

/**
 * Componente de pergunta sobre altura
 * 
 * Localização: components/onboarding/HeightQuestion.tsx
 * Permite inserir altura em centímetros
 */

interface HeightQuestionProps {
  height: string;
  onChange: (height: string) => void;
}

export default function HeightQuestion({ height, onChange }: HeightQuestionProps) {
  
  const handleHeightChange = (text: string) => {
    // Limita a 3 dígitos e apenas números
    const heightValue = text.replace(/[^0-9]/g, '').slice(0, 3);
    onChange(heightValue);
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
      <Text style={styles.question}>Qual a sua altura?</Text>

      {/* Input de altura */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={handleHeightChange}
          placeholder="0"
          placeholderTextColor="#8F9BB3"
          keyboardType="numeric"
          maxLength={3}
        />
        <Text style={styles.unit}>cm</Text>
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