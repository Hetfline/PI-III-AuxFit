import React from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";

export default function HomeScreen() {
  const router = useRouter();

  const handleTestOnboarding = () => {
    router.push("/onboarding");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        
        {/* Background decorativo */}
        <Background />

        {/* Conteúdo */}
        <View style={styles.content}>
          <Text style={styles.title}>Bem-vindo!</Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Testar Onboarding"
              onPress={handleTestOnboarding}
              bgColor={Colors.secondary}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  title: {
    ...Texts.title,
    fontSize: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: Spacing.xl,
    width: '100%',
    maxWidth: 300,
  },
});