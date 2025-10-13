import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Background from '../../components/universal/Background';
import ProgressBar from '../../components/onboarding/ProgressBar';
import HeightPicker from '../../components/onboarding/HeightPicker';
import Button from '../../components/universal/Button';
import { Colors, Spacing, Texts } from '../../constants/Styles';

export default function HeightScreen() {
  const router = useRouter();
  const currentQuestion = 3;
  const totalQuestions = 6;

  // Estados para altura
  const [selectedHeight, setSelectedHeight] = useState(165);
  const [selectedDecimal, setSelectedDecimal] = useState(0);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/onboarding/weightScreen');
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
            <Text style={styles.question}>Qual a sua altura?</Text>
          </View>

          {/* Picker de altura */}
          <View style={styles.pickerSection}>
            <HeightPicker
              selectedHeight={selectedHeight}
              selectedDecimal={selectedDecimal}
              onHeightChange={setSelectedHeight}
              onDecimalChange={setSelectedDecimal}
            />
          </View>

        </View>

        {/* Botões de navegação */}
        <View style={styles.navigationButtons}>
          
          {/* Anterior */}
          <View style={styles.backButtonWrapper}>
            <Button
              title="Anterior"
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
  pickerSection: {
    position: 'absolute',
    top: 316,
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