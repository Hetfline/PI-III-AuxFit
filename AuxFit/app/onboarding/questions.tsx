import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Background from '../../components/universal/Background';
import ProgressBar from '../../components/onboarding/ProgressBar';
import GenderQuestion from '../../components/onboarding/GenderQuestion';
import Button from '../../components/universal/Button';
import { Colors, Spacing, Texts } from '../../constants/Styles';

export default function OnboardingQuestions() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const totalQuestions = 6;

  const handleBack = () => {
    if (currentQuestion === 1) {
      router.back();
    } else {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (!selectedGender) return;
    
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedGender(null);
    } else {
      router.push('/home');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <Background />
        
        {/* ProgressBar */}
        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          onBack={handleBack}
        />
        
        <View style={styles.content}>
          
          {/* Logo e Pergunta */}
          <View style={styles.topSection}>
            <Image
              source={require('../../assets/icons/logo/logoOnboarding.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.question}>Qual o seu gênero?</Text>
          </View>

          {/* Cards de gênero */}
          <View style={styles.cardsSection}>
            <GenderQuestion
              selectedGender={selectedGender}
              onSelect={setSelectedGender}
            />
          </View>

        </View>

        {/* Botões de navegação */}
        <View style={styles.navigationButtons}>
          
          {/* Voltar */}
          <View style={styles.backButtonWrapper}>
            <Button
              title="Voltar"
              onPress={handleBack}
              bgColor="#E8E8E8"
            />
          </View>

          {/* Próxima */}
          <View style={styles.nextButtonWrapper}>
            <Button
              title="Próxima"
              onPress={handleNext}
              bgColor={Colors.primary}
            />
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  topSection: {
    position: 'absolute',
    top: 50,
    left: Spacing.lg,
    right: Spacing.lg,
    alignItems: 'center',
    gap: 50,
  },
  logo: {
    width: 50,
    height: 62.7,
  },
  question: {
    ...Texts.title,
    fontSize: 20,
    textAlign: 'center',
  },
  cardsSection: {
    position: 'absolute',
    top: 317,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  backButtonWrapper: {
    flex: 1,
  },
  nextButtonWrapper: {
    flex: 1,
  },
});