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
import { api } from "@/services/api"; // Para finalizar o cadastro

const MEAL_FREQUENCY_OPTIONS: OptionItem[] = [
  {
    id: "2",
    label: "2 Refeições",
    description:
      "Jejum intermitente ou rotina muito corrida (Almoço e Jantar).",
    icon: "numeric-2-circle-outline",
    color: "#FFC107",
  },
  {
    id: "3",
    label: "3 Refeições (Padrão)",
    description: "Café da manhã, Almoço e Jantar.",
    icon: "numeric-3-circle-outline",
    color: "#4CAF50",
  },
  {
    id: "4",
    label: "4 Refeições",
    description: "Inclui um lanche. Ideal para controle de apetite.",
    icon: "numeric-4-circle-outline",
    color: "#2196F3",
  },
  {
    id: "5",
    label: "5 Refeições",
    description: "Café, Lanche, Almoço, Lanche, Jantar. Metabolismo ativo.",
    icon: "numeric-5-circle-outline",
    color: "#9C27B0",
  },
  {
    id: "6",
    label: "6+ Refeições (Atleta)",
    description: "Alto volume de comida distribuído ao longo do dia.",
    icon: "numeric-6-circle-outline",
    color: "#F44336",
  },
];

export default function MealsFrequencyScreen() {
  const router = useRouter();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string>("3"); // Padrão 3
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    try {
      setLoading(true);
      // 1. Atualiza dado local
      updateOnboardingData("refeicoes_dia", parseInt(selectedId));

      // 2. Compila todos os dados do contexto (Treino + Dieta)
      const finalProfileData = {
        ...onboardingData,
        refeicoes_dia: parseInt(selectedId),
        // Garante campos obrigatórios para o backend
        objetivo: onboardingData.objetivo || "manter",
        sexo: onboardingData.sexo || "M",
        // ... outros campos
      };

      // 3. Envia para o backend (usando o endpoint completeProfile que criamos)
      // OBS: O token já deve estar salvo no authStorage se o usuário fez login antes
      const token =
        await require("@/services/auth-storage").authStorage.getToken();
      await api.completeProfile(finalProfileData, token);

      // 4. Redireciona para a Home
      router.replace("/(tabs)/home"); // Vai para a tela principal
    } catch (error) {
      console.log("Erro ao finalizar onboarding:", error);
      // Em produção, mostraria um Toast de erro aqui
      // Mesmo com erro, se for apenas falha de rede, as vezes queremos deixar passar ou tentar novamente
      router.replace("/(tabs)/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        <ProgressBar
          currentQuestion={3}
          totalQuestions={3}
          onBack={() => router.back()}
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>
              Quantas refeições por dia você prefere?
            </Text>
            <Text style={styles.subtitle}>
              Vamos dividir suas metas de calorias e macros por essa quantidade.
            </Text>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <SelectionList
              options={MEAL_FREQUENCY_OPTIONS}
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
              title={loading ? "Salvando..." : "Finalizar"}
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
