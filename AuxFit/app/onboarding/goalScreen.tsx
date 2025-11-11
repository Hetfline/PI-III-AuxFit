import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "../../components/universal/Background";
import ProgressBar from "../../components/onboarding/OnboardingProgress";
import GoalSelection from "../../components/onboarding/GoalSelection";
import Button from "../../components/universal/Button";
import Toast from "../../components/universal/Toast";
import { Colors, Spacing, Texts } from "../../constants/Styles";

export default function GoalScreen() {
  const router = useRouter();
  const currentQuestion = 6;
  const totalQuestions = 6;

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleFinish = () => {
    if (!selectedGoal) {
      setShowToast(true);
      return;
    }
    router.push("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        {/* Toast */}
        <Toast
          message="Por favor, selecione uma opção."
          visible={showToast}
          onHide={() => setShowToast(false)}
          type="warning"
        />

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
              source={require("../../assets/icons/logo/logoOnboarding.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.question}>Qual o seu objetivo?</Text>
          </View>

          {/* Opções de objetivo */}
          <View style={styles.optionsSection}>
            <GoalSelection
              selectedGoal={selectedGoal}
              onSelect={setSelectedGoal}
            />
          </View>
        </View>

        {/* Botões de navegação */}
        <View style={styles.navigationButtons}>
          {/* Anterior */}
          <View style={styles.backButtonWrapper}>
            <Button title="Anterior" onPress={handleBack} bgColor="#E8E8E8" />
          </View>

          {/* Finalizar */}
          <View style={styles.nextButtonWrapper}>
            <Button
              title="Finalizar"
              onPress={handleFinish}
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
    position: "relative",
  },
  content: {
    flex: 1,
    position: "relative",
  },
  topSection: {
    position: "absolute",
    top: 50,
    left: Spacing.lg,
    right: Spacing.lg,
    alignItems: "center",
    gap: 50,
  },
  logo: {
    width: 50,
    height: 62.7,
  },
  question: {
    ...Texts.title,
    fontSize: 20,
    textAlign: "center",
  },
  optionsSection: {
    position: "absolute",
    top: 280,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
  },
  navigationButtons: {
    flexDirection: "row",
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
