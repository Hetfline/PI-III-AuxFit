import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface ActivityLevelProps {
  selectedLevel: string | null;
  onSelect: (level: string) => void;
}

const activityLevels = [
  {
    id: 'leve',
    icon: 'walk',
    title: 'Leve',
    description: 'Trabalho em pé ou caminhadas leves',
    color: '#FFFFFF',
  },
  {
    id: 'moderado',
    icon: 'run',
    title: 'Moderado',
    description: 'Trabalho pesado ou atividades físicas regulares',
    color: '#FF9800',
  },
  {
    id: 'intenso',
    icon: 'run-fast',
    title: 'Intenso',
    description: 'Atividades físicas intensas todos os dias',
    color: '#F44336',
  },
];

export default function ActivityLevel({ selectedLevel, onSelect }: ActivityLevelProps) {
  return (
    <View style={styles.container}>
      {activityLevels.map((level) => (
        <Pressable
          key={level.id}
          style={[
            styles.option,
            selectedLevel === level.id && styles.optionSelected
          ]}
          onPress={() => onSelect(level.id)}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={level.icon as any}
              size={32}
              color={level.color}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{level.title}</Text>
            <Text style={styles.description}>{level.description}</Text>
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