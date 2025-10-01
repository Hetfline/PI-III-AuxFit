import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '../../components/universal/Button';
import Background from '../../components/universal/Background';

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
          <Text style={styles.title}>
            Precisamos saber algumas{'\n'}coisas sobre você
          </Text>

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
    backgroundColor: '#0A0E14',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});