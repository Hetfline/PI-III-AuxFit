import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Componente de pergunta sobre objetivo
 * 
 * Localização: components/onboarding/GoalQuestion.tsx
 * Permite selecionar categoria (Treino/Dieta) e subcategoria
 */

interface GoalQuestionProps {
  selectedGoal: { category: string; subcategory: string };
  onSelect: (goal: { category: string; subcategory: string }) => void;
}

const goals = {
  treino: [
    { id: 'emagrecer', icon: 'run', title: 'Emagrecer', description: 'Perder peso de forma saudável' },
    { id: 'ganhar-peso', icon: 'weight-lifter', title: 'Ganhar peso', description: 'Aumentar massa muscular' },
    { id: 'manter-peso', icon: 'heart-pulse', title: 'Manter peso', description: 'Manter peso com saúde' },
  ],
  dieta: [
    { id: 'emagrecer-dieta', icon: 'food-apple', title: 'Emagrecer', description: 'Perder peso de forma saudável' },
    { id: 'ganhar-peso-dieta', icon: 'food-steak', title: 'Ganhar peso', description: 'Aumentar massa muscular' },
    { id: 'manter-peso-dieta', icon: 'leaf', title: 'Manter peso', description: 'Manter peso com saúde' },
  ],
};

export default function GoalQuestion({ selectedGoal, onSelect }: GoalQuestionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'treino' | 'dieta'>('treino');

  const handleSelectGoal = (subcategory: string) => {
    onSelect({ category: selectedCategory, subcategory });
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
      <Text style={styles.question}>Qual o seu objetivo?</Text>

      {/* Instruções */}
      <Text style={styles.instructions}>
        Selecione uma categoria de pergunta para responder agora
      </Text>

      {/* Tabs de categoria */}
      <View style={styles.tabsContainer}>
        <Pressable
          style={[
            styles.tab,
            selectedCategory === 'treino' && styles.tabActive
          ]}
          onPress={() => setSelectedCategory('treino')}
        >
          <MaterialCommunityIcons
            name="dumbbell"
            size={20}
            color={selectedCategory === 'treino' ? '#00D68F' : '#8F9BB3'}
          />
          <Text style={[
            styles.tabText,
            selectedCategory === 'treino' && styles.tabTextActive
          ]}>
            Treino
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tab,
            selectedCategory === 'dieta' && styles.tabActive
          ]}
          onPress={() => setSelectedCategory('dieta')}
        >
          <MaterialCommunityIcons
            name="food-apple"
            size={20}
            color={selectedCategory === 'dieta' ? '#00D68F' : '#8F9BB3'}
          />
          <Text style={[
            styles.tabText,
            selectedCategory === 'dieta' && styles.tabTextActive
          ]}>
            Dieta
          </Text>
        </Pressable>
      </View>

      {/* Opções de objetivo */}
      <ScrollView 
        style={styles.optionsScroll}
        contentContainerStyle={styles.optionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {goals[selectedCategory].map((goal) => (
          <Pressable
            key={goal.id}
            style={[
              styles.option,
              selectedGoal.category === selectedCategory && 
              selectedGoal.subcategory === goal.id && 
              styles.optionSelected
            ]}
            onPress={() => handleSelectGoal(goal.id)}
          >
            <MaterialCommunityIcons
              name={goal.icon as any}
              size={32}
              color={
                selectedGoal.category === selectedCategory && 
                selectedGoal.subcategory === goal.id 
                  ? '#00D68F' 
                  : '#8F9BB3'
              }
            />
            <View style={styles.textContainer}>
              <Text style={[
                styles.optionTitle,
                selectedGoal.category === selectedCategory && 
                selectedGoal.subcategory === goal.id && 
                styles.textSelected
              ]}>
                {goal.title}
              </Text>
              <Text style={[
                styles.optionDescription,
                selectedGoal.category === selectedCategory && 
                selectedGoal.subcategory === goal.id && 
                styles.descriptionSelected
              ]}>
                {goal.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2A2F38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 40,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 13,
    color: '#8F9BB3',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2A2F38',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    borderColor: '#00D68F',
    backgroundColor: '#1E3A32',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8F9BB3',
  },
  tabTextActive: {
    color: '#00D68F',
  },
  optionsScroll: {
    flex: 1,
  },
  optionsContainer: {
    gap: 12,
    paddingBottom: 20,
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