// app/onboarding/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '../../components/universal/Button';
import Background from '../../components/universal/Background';
import { Colors, Spacing, Texts } from '../../constants/Styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DESIGN_WIDTH = 412;
const DESIGN_HEIGHT = 917;

export default function OnboardingIntro() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/questions');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Background com linhas decorativas */}
        <Background />

        {/* Conteúdo principal */}
        <View style={styles.content}>

          {/* Texto central grande */}
          <View style={styles.centerContent}>
            <Text style={styles.mainTitle}>
              Precisamos saber algumas{'\n'}coisas sobre você
            </Text>
          </View>

          {/* Botão na parte inferior */}
          <View style={styles.buttonContainer}>
            <Button
              title="Prosseguir"
              onPress={handleStart}
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
  topTitle: {
    ...Texts.subtext,
    fontSize: 13,
    textAlign: 'left',
    marginTop: Spacing.md,
  },
  centerContent: {
    position: 'absolute',
    top: 395,
    left: 22.5,
    right: 22.5,
    alignItems: 'center',
  },
  mainTitle: {
    ...Texts.title,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 34,
    fontFamily: 'MontserratBold',
  },
  buttonContainer: {
    position: 'absolute',
    top: 660,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});