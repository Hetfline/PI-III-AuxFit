import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Componente de pergunta sobre gênero
 * 
 * Localização: components/onboarding/GenderQuestion.tsx
 * Permite selecionar entre Feminino e Masculino
 */

interface GenderQuestionProps {
  selectedGender: string;
  onSelect: (gender: string) => void;
}

export default function GenderQuestion({ selectedGender, onSelect }: GenderQuestionProps) {
  return (
    <View style={styles.container}>
      
      {/* Ícone central */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🏋️</Text>
        </View>
      </View>

      {/* Pergunta */}
      <Text style={styles.question}>Qual o seu gênero?</Text>

      {/* Opções */}
      <View style={styles.optionsContainer}>
        
        {/* Opção Feminino */}
        <Pressable
          style={[
            styles.option,
            selectedGender === 'feminino' && styles.optionSelected
          ]}
          onPress={() => onSelect('feminino')}
        >
          <MaterialCommunityIcons
            name="gender-female"
            size={32}
            color={selectedGender === 'feminino' ? '#00D68F' : '#8F9BB3'}
          />
          <Text style={[
            styles.optionText,
            selectedGender === 'feminino' && styles.optionTextSelected
          ]}>
            Feminino
          </Text>
        </Pressable>

        {/* Opção Masculino */}
        <Pressable
          style={[
            styles.option,
            selectedGender === 'masculino' && styles.optionSelected
          ]}
          onPress={() => onSelect('masculino')}
        >
          <MaterialCommunityIcons
            name="gender-male"
            size={32}
            color={selectedGender === 'masculino' ? '#00D68F' : '#8F9BB3'}
          />
          <Text style={[
            styles.optionText,
            selectedGender === 'masculino' && styles.optionTextSelected
          ]}>
            Masculino
          </Text>
        </Pressable>

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
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  option: {
    flex: 1,
    maxWidth: 150,
    height: 120,
    backgroundColor: '#2A2F38',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  optionSelected: {
    borderColor: '#00D68F',
    backgroundColor: '#1E3A32',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8F9BB3',
  },
  optionTextSelected: {
    color: '#00D68F',
  },
});