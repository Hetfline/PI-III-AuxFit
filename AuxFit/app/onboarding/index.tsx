import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '../../components/universal/Button';

/**
 * Tela de introdução do onboarding
 * 
 * Localização: app/onboarding/index.tsx
 * Primeira tela que introduz o questionário inicial
 */
export default function OnboardingIntro() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/questions');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Ícone/Logo central */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🏋️</Text>
          </View>
        </View>

        {/* Texto principal */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Precisamos saber algumas{'\n'}coisas sobre você
          </Text>
        </View>

        {/* Botão de avançar */}
        <View style={styles.buttonContainer}>
          <Button
            title="Prosseguir"
            onPress={handleStart}
            bgColor="#00D68F"
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  iconContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2A2F38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 60,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 20,
  },
});