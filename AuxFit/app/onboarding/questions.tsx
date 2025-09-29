import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../components/universal/Button';
import GenderQuestion from '../../components/onboarding/GenderQuestion';

/**
 * Versão de teste - OnboardingQuestions
 * 
 * Testa apenas o GenderQuestion e navegação básica
 */
export default function OnboardingQuestions() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    console.log('Gênero selecionado:', selectedGender);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header simples */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerText}>Teste - Pergunta 1/6</Text>
        </View>

        {/* Pergunta de gênero */}
        <View style={styles.questionContainer}>
          <GenderQuestion
            selectedGender={selectedGender}
            onSelect={setSelectedGender}
          />
        </View>

        {/* Botão de avançar */}
        <View style={styles.buttonContainer}>
          <Button
            title="Próxima"
            onPress={handleNext}
            bgColor={selectedGender ? "#00D68F" : "#404852"}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1D23',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingBottom: 24,
  },
});