import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import ProgressBar from "@/components/onboarding/OnboardingProgress";
import Button from "@/components/universal/Button";
import SelectionList, {
  OptionItem,
} from "@/components/onboarding/workout/SelectionList";
import Toast from "@/components/universal/Toast";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";

const DURATION_OPTIONS: OptionItem[] = [
  {
    id: "20_min",
    label: "20 minutos",
    description:
      "Treino express. Foco total em intensidade e poucos descansos.",
    icon: "timer-sand",
    color: "#4CAF50",
  },
  {
    id: "30_min",
    label: "30 minutos",
    description: "Rápido e eficiente. Ideal para rotinas muito corridas.",
    icon: "timer",
    color: "#8BC34A",
  },
  {
    id: "45_min",
    label: "45 minutos",
    description: "Tempo padrão. Ótimo equilíbrio entre volume e tempo.",
    icon: "clock-time-four",
    color: "#2196F3",
  },
  {
    id: "60_min",
    label: "60 minutos",
    description: "Treino completo. Permite maior volume e descanso adequado.",
    icon: "clock-time-eight",
    color: "#FFC107",
  },
  {
    id: "mais_60_min",
    label: "Mais de 60 min",
    description: "Para quem gosta de treinar com calma e alto volume.",
    icon: "history",
    color: "#FF5722",
  },
];

export default function DurationScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  const handleNext = () => {
    if (!selectedId) {
      setShowToast(true);
      return;
    }

    updateOnboardingData("duracao_treino", selectedId);

    router.push("/onboarding/workout/equipmentScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        <Toast
          message="Selecione a duração ideal."
          visible={showToast}
          onHide={() => setShowToast(false)}
          type="warning"
        />

        {/* Pergunta 3 de 7 */}
        <ProgressBar
          currentQuestion={3}
          totalQuestions={7}
          onBack={() => router.back()}
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>
              Quanto tempo você tem disponível por treino?
            </Text>
            <Text style={styles.subtitle}>
              Isso define o volume (quantidade de séries e exercícios) do seu
              dia.
            </Text>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <SelectionList
              options={DURATION_OPTIONS}
              selectedIds={selectedId}
              onSelect={(id) => setSelectedId(id)}
              variant="card"
              multiSelect={false}
            />
          </ScrollView>
        </View>

        <View style={styles.navigationButtons}>
          <View style={{ flex: 1 }}>
            <Button
              title="Voltar"
              onPress={() => router.back()}
              bgColor={Colors.text}
            />
          </View>
          <View style={{ flex: 1 }}>
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
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.lg },
  topSection: { marginTop: 20, alignItems: "center", gap: 10 },
  question: { ...Texts.title, fontSize: 22, textAlign: "center" },
  subtitle: {
    ...Texts.body,
    color: Colors.subtext,
    textAlign: "center",
    fontSize: 14,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});
