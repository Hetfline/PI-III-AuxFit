import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "../../components/universal/Background";
import ProgressBar from "../../components/onboarding/OnboardingProgress";
import GoalSelection from "../../components/onboarding/GoalSelection";
import Button from "../../components/universal/Button";
import Toast from "../../components/universal/Toast";
import { Colors, Spacing, Texts } from "../../constants/Styles";

// Imports para Backend
import { useOnboarding } from "../../context/OnboardingContext";
import { api } from "../../services/api";
import { authStorage } from "../../services/auth-storage";

export default function GoalScreen() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const currentQuestion = 6;
  const totalQuestions = 6;

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.replace("/onboarding/genderScreen");
  };

  const handleFinish = async () => {
    if (!selectedGoal) {
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
     
      const finalData = {
        ...onboardingData,
        objetivo: selectedGoal
      };

      
      const token = await authStorage.getToken();
      if (!token) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        router.replace("/");
        return;
      }


      console.log("Enviando dados:", finalData);
      await api.completeProfile(finalData, token);

      // Sucesso
      router.replace("/onboarding/questionTypeScreen");
      
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        <Toast message="Por favor, selecione uma opção." visible={showToast} onHide={() => setShowToast(false)} type="warning" />
        <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} onBack={handleBack} />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Image source={require("../../assets/icons/logo/logoOnboarding.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.question}>Qual o seu objetivo?</Text>
          </View>
          <View style={styles.optionsSection}>
            <GoalSelection selectedGoal={selectedGoal} onSelect={setSelectedGoal} />
          </View>
        </View>

        <View style={styles.navigationButtons}>
          <View style={styles.backButtonWrapper}>
            <Button title="Anterior" onPress={handleBack} bgColor="#E8E8E8" />
          </View>
          <View style={styles.nextButtonWrapper}>
            {loading ? (
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                   <ActivityIndicator size="small" color={Colors.primary} />
                </View>
            ) : (
                <Button title="Finalizar" onPress={handleFinish} bgColor={Colors.primary} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, position: "relative" },
  content: { flex: 1, position: "relative" },
  topSection: { position: "absolute", top: 50, left: Spacing.lg, right: Spacing.lg, alignItems: "center", gap: 50 },
  logo: { width: 50, height: 62.7 },
  question: { ...Texts.title, fontSize: 20, textAlign: "center" },
  optionsSection: { position: "absolute", top: 280, left: 0, right: 0, paddingHorizontal: Spacing.lg },
  navigationButtons: { flexDirection: "row", gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  backButtonWrapper: { flex: 1 },
  nextButtonWrapper: { flex: 1 },
});