import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface GenderQuestionProps {
  selectedGender: string | null;
  onSelect: (gender: string) => void;
}

export default function GenderQuestion({ selectedGender, onSelect }: GenderQuestionProps) {
  return (
    <View style={styles.container}>
      
      {/* Opções de gênero */}
      <View style={styles.optionsContainer}>
        
        {/* Feminino */}
        <Pressable
          style={[
            styles.option,
            styles.optionFeminino,
            selectedGender === 'feminino' && styles.optionSelected
          ]}
          onPress={() => onSelect('feminino')}
        >
          <MaterialCommunityIcons
            name="gender-female"
            size={40}
            color="#EC407A"
          />
          <Text style={styles.optionText}>Feminino</Text>
        </Pressable>

        {/* Masculino */}
        <Pressable
          style={[
            styles.option,
            styles.optionMasculino,
            selectedGender === 'masculino' && styles.optionSelected
          ]}
          onPress={() => onSelect('masculino')}
        >
          <MaterialCommunityIcons
            name="gender-male"
            size={40}
            color="#42A5F5"
          />
          <Text style={styles.optionText}>Masculino</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 48,
  },
  option: {
    flex: 1,
    minHeight: 126,
    paddingVertical: 24,
    paddingHorizontal: 10,
    backgroundColor: '#17181C',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  optionFeminino: {
    borderRadius: 50,
  },
  optionMasculino: {
    borderRadius: 20,
  },
  optionSelected: {
    borderColor: '#4D4D4D',
  },
  optionText: {
    ...Texts.body,
    fontSize: 16,
    fontFamily: 'MontserratSemiBold',
  },
});