import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";

export default function workoutFeedbackScreen() {
  const params = useLocalSearchParams();

  // 1. Normalizar o parâmetro 'feedback' para garantir que seja uma única string (ou undefined)
  const rawFeedbackData = params.feedback;
  const feedbackString = Array.isArray(rawFeedbackData)
    ? rawFeedbackData[0]
    : rawFeedbackData;

  let feedback: any = {}; // Inicializa como objeto vazio para evitar erros de leitura

  // 2. Desserializar o JSON
  if (feedbackString) {
    try {
      // Converte a string JSON de volta para o objeto de feedback
      feedback = JSON.parse(feedbackString);
    } catch (e) {
      console.error("Erro ao fazer parse dos dados de feedback:", e);
    }
  }

  // 3. Desestruturar os dados (para uso limpo no JSX)
  const {
    title,
    focusAreas,
    workoutTime: rawWorkoutTime,
    totalSetsDone,
  } = feedback;

  const workoutTimeInSeconds = Number(rawWorkoutTime) || 0;

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Função auxiliar para padding
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
      {/* Background decorativo */}
      <Background />

      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={{ alignItems: "center", gap: Spacing.sm }}>
              <Text style={[Texts.title]}>Parabéns</Text>
              <View>
                <Text style={[Texts.subtitle, { textAlign: "center" }]}>
                  Treino concluído!
                </Text>
                <Text style={[Texts.body, { color: Colors.accent }]}>
                  {focusAreas}
                </Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[Texts.subtitle, { textAlign: "center" }]}>
                Métricas
              </Text>
              <View style={styles.metricsContainer}>
                <View style={styles.metrics}>
                  <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                    3200 kg
                  </Text>
                  <Text style={Texts.body}>Volume</Text>
                </View>

                <View style={styles.metrics}>
                  <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                    {formatTime(workoutTimeInSeconds)}
                  </Text>
                  <Text style={Texts.body}>Duração</Text>
                </View>

                <View style={styles.metrics}>
                  <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                    20
                  </Text>
                  <Text style={Texts.body}>Séries</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    gap: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
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
