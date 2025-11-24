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

const EQUIPMENT_OPTIONS: OptionItem[] = [
  { id: "academia", label: "Academia Completa", icon: "dumbbell" },
  { id: "halteres", label: "Apenas Halteres", icon: "weight-kilogram" },
  { id: "elasticos", label: "Elásticos", icon: "infinity" },
  { id: "peso_corpo", label: "Peso do Corpo", icon: "run" },
  { id: "barra_fixa", label: "Barra Fixa / Argolas", icon: "human-handsup" },
  { id: "banco", label: "Banco Ajustável", icon: "seat" },
  { id: "nenhum", label: "Nenhum (Calistenia)", icon: "block-helper" },
];

export default function EquipmentScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    // UX: Lógica de exclusão mútua para "Nenhum"
    if (id === "nenhum") {
      if (selectedIds.includes("nenhum")) {
        setSelectedIds([]);
      } else {
        setSelectedIds(["nenhum"]);
      }
      return;
    }

    // Se selecionar qualquer outro equipamento, remove "Nenhum" da seleção
    let newIds = selectedIds.filter((item) => item !== "nenhum");

    if (newIds.includes(id)) {
      newIds = newIds.filter((item) => item !== id);
    } else {
      newIds.push(id);
    }
    setSelectedIds(newIds);
  };

  const handleNext = () => {
    updateOnboardingData("equipamentos", selectedIds);

    router.push("/onboarding/workout/styleScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        {/* Pergunta 4 de 7 */}
        <ProgressBar
          currentQuestion={4}
          totalQuestions={7}
          onBack={() => router.replace("/onboarding/workout/experienceScreen")}
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>
              Quais equipamentos você tem acesso?
            </Text>
            <Text style={styles.subtitle}>
              Isso ajuda a filtrar os exercícios que você pode fazer.
            </Text>
          </View>

          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <SelectionList
              options={EQUIPMENT_OPTIONS}
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
