import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

/**
 * Componente de pergunta sobre idade/data de nascimento
 * 
 * Localização: components/onboarding/AgeQuestion.tsx
 * Permite inserir dia, mês e ano de nascimento
 */

interface AgeQuestionProps {
  birthDate: { day: string; month: string; year: string };
  onChange: (birthDate: { day: string; month: string; year: string }) => void;
}

export default function AgeQuestion({ birthDate, onChange }: AgeQuestionProps) {
  
  const handleDayChange = (text: string) => {
    // Limita a 2 dígitos e apenas números
    const day = text.replace(/[^0-9]/g, '').slice(0, 2);
    onChange({ ...birthDate, day });
  };

  const handleMonthChange = (text: string) => {
    const month = text.replace(/[^0-9]/g, '').slice(0, 2);
    onChange({ ...birthDate, month });
  };

  const handleYearChange = (text: string) => {
    const year = text.replace(/[^0-9]/g, '').slice(0, 4);
    onChange({ ...birthDate, year });
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
      <Text style={styles.question}>Qual a sua idade?</Text>

      {/* Inputs de data */}
      <View style={styles.dateContainer}>
        
        {/* Dia */}
        <View style={styles.dateInputWrapper}>
          <TextInput
            style={styles.dateInput}
            value={birthDate.day}
            onChangeText={handleDayChange}
            placeholder="Dia"
            placeholderTextColor="#8F9BB3"
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        {/* Mês */}
        <View style={styles.dateInputWrapper}>
          <TextInput
            style={styles.dateInput}
            value={birthDate.month}
            onChangeText={handleMonthChange}
            placeholder="Mês"
            placeholderTextColor="#8F9BB3"
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        {/* Ano */}
        <View style={[styles.dateInputWrapper, styles.yearInput]}>
          <TextInput
            style={styles.dateInput}
            value={birthDate.year}
            onChangeText={handleYearChange}
            placeholder="Ano"
            placeholderTextColor="#8F9BB3"
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

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
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  dateInputWrapper: {
    flex: 1,
    maxWidth: 80,
  },
  yearInput: {
    maxWidth: 100,
  },
  dateInput: {
    height: 56,
    backgroundColor: '#2A2F38',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});