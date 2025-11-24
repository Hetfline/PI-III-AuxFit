import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";

export default function workoutFeedbackScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const rawFeedbackData = params.feedback;
  const feedbackString = Array.isArray(rawFeedbackData)
    ? rawFeedbackData[0]
    : rawFeedbackData;

  let feedback: any = {};

  if (feedbackString) {
    try {
      feedback = JSON.parse(feedbackString);
    } catch (e) {
      console.error("Erro ao fazer parse dos dados de feedback:", e);
    }
  }

  const {
    title,
    focusAreas,
    workoutTime: rawWorkoutTime,
    totalSetsDone,
    totalVolume,
  } = feedback;

  const workoutTimeInSeconds = Number(rawWorkoutTime) || 0;
  const setsDone = Number(totalSetsDone) || 0;
  const volumeDone = Number(totalVolume) || 0;

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number): string => num.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      <Background />

      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.viewParaConsertarEssaMerda}>
            {/*  PARTE DE CIMA (Parabéns e Métricas)  */}
            <View style={styles.container}>
              <View style={{ alignItems: "center", gap: Spacing.sm }}>
                <Text style={[Texts.title]}>Parabéns</Text>
                <View>
                  <Text style={[Texts.subtitle, { textAlign: "center" }]}>
                    Treino concluído!
                  </Text>
                  <Text
                    style={[
                      Texts.body,
                      { color: Colors.accent, textAlign: "center" },
                    ]}
                  >
                    {focusAreas}
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={[Texts.subtitle, { textAlign: "center" }]}>
                  Métricas
                </Text>
                <View style={styles.metricsContainer}>
                  {/* VOLUME TOTAL */}
                  <View style={styles.metrics}>
                    <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                      {/* Exibe o volume total calculado */}
                      {volumeDone.toLocaleString("pt-BR")} kg
                    </Text>
                    <Text style={Texts.body}>Volume</Text>
                  </View>

                  {/* ⏱️ DURAÇÃO */}
                  <View style={styles.metrics}>
                    <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                      {formatTime(workoutTimeInSeconds)}
                    </Text>
                    <Text style={Texts.body}>Duração</Text>
                  </View>

                  {/* SÉRIES CONCLUÍDAS */}
                  <View style={styles.metrics}>
                    <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                      {setsDone}
                    </Text>
                    <Text style={Texts.body}>Séries</Text>
                  </View>
                </View>
              </View>
            </View>

            {/*  PARTE DE BAIXO (Botão Concluir)  */}
            <View>
              <Button
                title="Concluir"
                onPress={() => router.push("/(tabs)/workout")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    gap: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  viewParaConsertarEssaMerda: {
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: Spacing.md,
  },
  infoContainer: {
    borderRadius: 10,
    backgroundColor: Colors.bgMedium,
    width: "100%",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  metricsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    justifyContent: "space-around",
  },
  metrics: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: 10,
    backgroundColor: Colors.bgLight,
    justifyContent: "center",
    alignItems: "center",
  },
});
