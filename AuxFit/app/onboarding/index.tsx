import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '../../components/universal/Button';
import Background from '../../components/universal/Background';
import { Colors, Spacing, Texts } from "@/constants/Styles";

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
          <Text style={[Texts.title, {textAlign: 'center', fontSize: 22}]}>
            Precisamos saber algumas coisas sobre você
          </Text>

          <Button
            title="Prosseguir"
            onPress={handleStart}
            bgColor={Colors.primary}
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
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingTop: "80%",
    paddingBottom: 40,
  }
});