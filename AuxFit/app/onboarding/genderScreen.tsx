import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "../../components/universal/Background";
import ProgressBar from "../../components/onboarding/OnboardingProgress";
import GenderQuestion from "../../components/onboarding/GenderPicker";
import Button from "../../components/universal/Button";
import Toast from "../../components/universal/Toast";
import { Colors, Spacing, Texts } from "../../constants/Styles";
import { useOnboarding } from "../../context/OnboardingContext";

export default function GenderScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  
  // Definição da variável que faltava
  const totalQuestions = 6; 

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!selectedGender) {
      setShowToast(true);
      return;
    }

    // LÓGICA DE MAPEAMENTO: UI -> Backend
    let genderForBackend = 'Outro';
    if (selectedGender === 'masculino') genderForBackend = 'M';
    if (selectedGender === 'feminino') genderForBackend = 'F';

    updateOnboardingData('sexo', genderForBackend); 

    router.push("/onboarding/ageScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        <Toast
          message="Por favor, selecione uma opção."
          visible={showToast}
          onHide={() => setShowToast(false)}
          type="warning"
        />

        <ProgressBar
          currentQuestion={1}
          totalQuestions={totalQuestions}
          onBack={handleBack}
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Image
              source={require("../../assets/icons/logo/logoOnboarding.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.question}>Qual o seu gênero?</Text>
          </View>

          <View style={styles.cardsSection}>
            <GenderQuestion
              selectedGender={selectedGender}
              onSelect={setSelectedGender}
            />
          </View>
        </View>

        <View style={styles.navigationButtons}>
          <View style={styles.backButtonWrapper}>
            <Button title="Voltar" onPress={handleBack} bgColor="#E8E8E8" />
          </View>

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
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1, position: "relative" },
  content: { flex: 1, position: "relative" },
  topSection: { position: "absolute", top: 50, left: Spacing.lg, right: Spacing.lg, alignItems: "center", gap: 50 },
  logo: { width: 50, height: 62.7 },
  question: { ...Texts.title, fontSize: 20, textAlign: "center" },
  cardsSection: { position: "absolute", top: 317, left: 0, right: 0, paddingHorizontal: Spacing.lg },
  navigationButtons: { flexDirection: "row", gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  backButtonWrapper: { flex: 1 },
  nextButtonWrapper: { flex: 1 },
});