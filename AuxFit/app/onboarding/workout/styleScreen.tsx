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

const STYLE_OPTIONS: OptionItem[] = [
  {
    id: "tradicional",
    label: "Tradicional (Hipertrofia)",
    description:
      "Foco em ganho de massa e força. Séries com descanso controlado (Musculação clássica).",
    icon: "arm-flex",
    color: "#4CAF50",
  },
  {
    id: "intenso",
    label: "Intenso (HIIT / Metabólico)",
    description:
      "Alta frequência cardíaca, circuitos e pouco descanso. Foco em queima de gordura.",
    icon: "run-fast",
    color: "#FF5722",
  },
  {
    id: "misto",
    label: "Misto (Powerbuilding)",
    description:
      "Combina força bruta (cargas altas) com acessórios de hipertrofia.",
    icon: "weight-lifter",
    color: "#2196F3",
  },
];

export default function StyleScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  const handleNext = () => {
    if (!selectedId) {
      setShowToast(true);
      return;
    }

    updateOnboardingData("preferencia_treino", selectedId);

    router.push("/onboarding/workout/summaryScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        <Toast
          message="Selecione um estilo."
          visible={showToast}
          onHide={() => setShowToast(false)}
          type="warning"
        />

        {/* Pergunta 5 de 7 */}
        <ProgressBar
          currentQuestion={5}
          totalQuestions={7}
          onBack={() => router.replace("/onboarding/workout/experienceScreen")}
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>
              Qual estilo de treino você prefere?
            </Text>
            <Text style={styles.subtitle}>
              Isso define a metodologia (séries retas, bi-sets, circuitos, etc).
            </Text>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <SelectionList
              options={STYLE_OPTIONS}
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
