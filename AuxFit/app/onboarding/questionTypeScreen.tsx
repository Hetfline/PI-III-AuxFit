import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";
import Toast from "@/components/universal/Toast";
import QuestionTypeSelect from "@/components/onboarding/QuestionTypeSelect";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";

export default function QuestionTypeScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!selectedPath) {
      setShowToast(true);
      return;
    }

    if (selectedPath === "workout") {
      
      router.push("/onboarding/workout/experienceScreen"); 
    } else if (selectedPath === "diet") {
      
      Alert.alert("Em breve", "O questionário detalhado de dieta será implementado em breve! Vamos para a Home.", [
        { text: "OK", onPress: () => close }
      ]);
    }
  };

  const handleSkip = () => {
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        <Toast
          message="Por favor, selecione uma categoria."
          visible={showToast}
          onHide={() => setShowToast(false)}
          type="warning"
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>
              O que você quer configurar agora?
            </Text>
            <Text style={styles.subtitle}>
              Vamos personalizar sua experiência com base na sua escolha.
            </Text>
          </View>

          <View style={styles.cardsSection}>
            <QuestionTypeSelect
              selectedPath={selectedPath}
              onSelect={setSelectedPath}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.navigationButtons}>
            <View style={styles.backButtonWrapper}>
              <Button title="Voltar" onPress={handleBack} bgColor={Colors.text} />
            </View>

            <View style={styles.nextButtonWrapper}>
              <Button
                title="Próxima"
                onPress={handleNext}
                bgColor={Colors.primary}
              />
            </View>
          </View>

          <Button
            title="Pular personalização"
            onPress={handleSkip}
            bgColor="transparent"
            color={Colors.subtext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center' },
  
  topSection: {
    alignItems: "center",
    gap: 16,
    paddingHorizontal: Spacing.lg,
    marginBottom: 50,
  },
  logo: { 
    width: 50, 
    height: 62.7,
    marginBottom: 20 
  },
  question: { 
    ...Texts.title, 
    fontSize: 24, 
    textAlign: "center" 
  },
  subtitle: {
    ...Texts.body,
    color: Colors.subtext,
    textAlign: "center",
  },

  cardsSection: {
    paddingHorizontal: Spacing.lg,
  },

  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  backButtonWrapper: { flex: 1 },
  nextButtonWrapper: { flex: 1 },
});