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
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";

const INJURY_OPTIONS: OptionItem[] = [
  { id: "ombro", label: "Ombro", icon: "arm-flex-outline" },
  { id: "joelho", label: "Joelho", icon: "human-male" },
  { id: "lombar", label: "Lombar (Costas)", icon: "human-handsdown" },
  { id: "punho", label: "Punho / Mão", icon: "hand-back-right" },
  { id: "tornozelo", label: "Tornozelo / Pé", icon: "foot-print" },
  { id: "quadril", label: "Quadril", icon: "human" },
  { id: "pescoço", label: "Pescoço", icon: "head" },
  {
    id: "nenhuma",
    label: "Nenhuma (100% Saudável)",
    icon: "check-circle-outline",
    color: Colors.correct,
  },
];

export default function InjuriesScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    // Lógica inteligente: "Nenhuma" é exclusivo
    if (id === "nenhuma") {
      if (selectedIds.includes("nenhuma")) {
        setSelectedIds([]);
      } else {
        setSelectedIds(["nenhuma"]);
      }
      return;
    }

    // Se selecionar uma lesão real, remove "Nenhuma"
    let newIds = selectedIds.filter((item) => item !== "nenhuma");

    if (newIds.includes(id)) {
      newIds = newIds.filter((item) => item !== id);
    } else {
      newIds.push(id);
    }
    setSelectedIds(newIds);
  };

  const handleNext = () => {
    updateOnboardingData("lesoes", selectedIds);

    router.push("/onboarding/workout/muscleFocusScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        {/* Pergunta 6 de 7 */}
        <ProgressBar
          currentQuestion={6}
          totalQuestions={7}
          onBack={() => router.replace("/onboarding/workout/experienceScreen")}
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>
              Você possui alguma dor, lesão ou limitação?
            </Text>
            <Text style={styles.subtitle}>
              Isso é muito importante para evitarmos exercícios perigosos para
              você.
            </Text>
          </View>

          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <SelectionList
              options={INJURY_OPTIONS}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              variant="tag"
              multiSelect={true}
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
              title={selectedIds.length === 0 ? "Pular" : "Próxima"}
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
