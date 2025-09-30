import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Componente de pergunta sobre nível de atividade física
 * 
 * Localização: components/onboarding/ActivityLevelQuestion.tsx
 * Permite selecionar entre Leve, Moderado e Intenso
 */

interface ActivityLevelQuestionProps {
  selectedLevel: string;
  onSelect: (level: string) => void;
}

const activityLevels = [
  {
    id: 'leve',
    icon: 'walk',
    title: 'Leve',
    description: 'Treino por dia ou raramente',
  },
  {
    id: 'moderado',
    icon: 'run',
    title: 'Moderado',
    description: 'Regularmente, com atividades físicas',
  },
  {
    id: 'intenso',
    icon: 'run-fast',
    title: 'Intenso',
    description: 'Atividades físicas intensas todos os dias',
  },
];

export default function ActivityLevelQuestion({ selectedLevel, onSelect }: ActivityLevelQuestionProps) {
  return (
    <View style={styles.container}>
      
      {/* Ícone central */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🏋️</Text>
        </View>
      </View>

      {/* Pergunta */}
      <Text style={styles.question}>
        Qual seu nível de atividade física?
      </Text>

      {/* Opções */}
      <View style={styles.optionsContainer}>
        {activityLevels.map((level) => (
          <Pressable
            key={level.id}
            style={[
              styles.option,
              selectedLevel === level.id && styles.optionSelected
            ]}
            onPress={() => onSelect(level.id)}
          >
            <MaterialCommunityIcons
              name={level.icon as any}
              size={32}
              color={selectedLevel === level.id ? '#00D68F' : '#8F9BB3'}
            />
            <View style={styles.textContainer}>
              <Text style={[
                styles.optionTitle,
                selectedLevel === level.id && styles.textSelected
              ]}>
                {level.title}
              </Text>
              <Text style={[
                styles.optionDescription,
                selectedLevel === level.id && styles.descriptionSelected
              ]}>
                {level.description}
              </Text>
            </View>
          </Pressable>
        ))}
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
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2F38',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 16,
    gap: 16,
  },
  optionSelected: {
    borderColor: '#00D68F',
    backgroundColor: '#1E3A32',
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#8F9BB3',
  },
  textSelected: {
    color: '#00D68F',
  },
  descriptionSelected: {
    color: '#6FCF97',
  },
});