import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface GoalSelectionProps {
  selectedGoal: string | null;
  onSelect: (goal: string) => void;
}

const goals = [
  {
    id: 'emagrecer',
    icon: 'trending-down',
    title: 'Emagrecer',
    description: 'Perder peso de forma saudável',
    color: '#F44336',
  },
  {
    id: 'ganhar',
    icon: 'trending-up',
    title: 'Ganhar peso',
    description: 'Aumentar massa muscular',
    color: '#4CAF50',
  },
  {
    id: 'manter',
    icon: 'minus',
    title: 'Manter peso',
    description: 'Manter peso com saúde',
    color: '#FF9800',
  },
];

export default function GoalSelection({ selectedGoal, onSelect }: GoalSelectionProps) {
  return (
    <View style={styles.container}>
      {goals.map((goal) => (
        <Pressable
          key={goal.id}
          style={[
            styles.option,
            selectedGoal === goal.id && styles.optionSelected
          ]}
          onPress={() => onSelect(goal.id)}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={goal.icon as any}
              size={32}
              color={goal.color}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{goal.title}</Text>
            <Text style={styles.description}>{goal.description}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
    width: '100%',
    top: 35,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 85,
    backgroundColor: '#17181C',
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: '#4D4D4D',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 10,
  },
  optionSelected: {
    borderColor: Colors.primary,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  title: {
    ...Texts.bodyBold,
    fontSize: 16,
  },
  description: {
    ...Texts.subtext,
    fontSize: 14,
  },
});