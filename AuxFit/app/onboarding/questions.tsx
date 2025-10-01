import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../components/universal/Button';
import GenderQuestion from '../../components/onboarding/GenderQuestion';
import AgeQuestion from '../../components/onboarding/AgeQuestion';
import HeightQuestion from '../../components/onboarding/HeightQuestion';
import WeightQuestion from '../../components/onboarding/WeightQuestion';
import ActivityLevelQuestion from '../../components/onboarding/ActivityLevelQuestion';
import GoalQuestion from '../../components/onboarding/GoalQuestion';

/**
 * Tela de perguntas do onboarding
 * 
 * Localização: app/onboarding/questions.tsx
 * Gerencia o fluxo de 6 perguntas com navegação
 */

interface UserData {
  gender: string;
  birthDate: { day: string; month: string; year: string };
  height: string;
  weight: string;
  activityLevel: string;
  goal: { category: string; subcategory: string };
}

export default function OnboardingQuestions() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 6;

  // Estado para armazenar respostas
  const [userData, setUserData] = useState<UserData>({
    gender: '',
    birthDate: { day: '', month: '', year: '' },
    height: '',
    weight: '',
    activityLevel: '',
    goal: { category: '', subcategory: '' },
  });

  const progress = (currentQuestion / totalQuestions) * 100;

  const handleBack = () => {
    if (currentQuestion === 1) {
      router.back();
    } else {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === totalQuestions) {
      // Finalizar e salvar dados
      handleFinish();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    console.log('Dados do usuário:', userData);
    // Aqui você vai salvar no Supabase
    router.replace('/(tabs)/home');
  };

  const isQuestionAnswered = () => {
    switch (currentQuestion) {
      case 1:
        return userData.gender !== '';
      case 2:
        return userData.birthDate.day !== '' && userData.birthDate.month !== '' && userData.birthDate.year !== '';
      case 3:
        return userData.height !== '';
      case 4:
        return userData.weight !== '';
      case 5:
        return userData.activityLevel !== '';
      case 6:
        return userData.goal.category !== '';
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <GenderQuestion
            selectedGender={userData.gender}
            onSelect={(gender) => setUserData({...userData, gender})}
          />
        );
      case 2:
        return (
          <AgeQuestion
            birthDate={userData.birthDate}
            onChange={(birthDate) => setUserData({...userData, birthDate})}
          />
        );
      case 3:
        return (
          <HeightQuestion
            height={userData.height}
            onChange={(height) => setUserData({...userData, height})}
          />
        );
      case 4:
        return (
          <WeightQuestion
            weight={userData.weight}
            onChange={(weight) => setUserData({...userData, weight})}
          />
        );
      case 5:
        return (
          <ActivityLevelQuestion
            selectedLevel={userData.activityLevel}
            onSelect={(activityLevel) => setUserData({...userData, activityLevel})}
          />
        );
      case 6:
        return (
          <GoalQuestion
            selectedGoal={userData.goal}
            onSelect={(goal) => setUserData({...userData, goal})}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header com ProgressBar */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#FFFFFF" />
          </Pressable>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>

          <Text style={styles.progressText}>{currentQuestion} / {totalQuestions}</Text>
        </View>

        {/* Área da pergunta */}
        <View style={styles.questionContainer}>
          {renderQuestion()}
        </View>

        {/* Botões de navegação */}
        <View style={styles.buttonContainer}>
          {currentQuestion > 1 && (
            <Button
              title="Anterior"
              onPress={handlePrevious}
              bgColor="#2A2F38"
            />
          )}
          <Button
            title={currentQuestion === totalQuestions ? "Finalizar" : "Próxima"}
            onPress={handleNext}
            bgColor={isQuestionAnswered() ? "#00D68F" : "#404852"}
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
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2A2F38',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D68F',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 50,
    textAlign: 'right',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingBottom: 24,
    gap: 12,
  },
});