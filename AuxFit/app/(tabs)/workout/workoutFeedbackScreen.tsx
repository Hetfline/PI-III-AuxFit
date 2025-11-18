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

  // 3. Desestruturar os dados (incluindo o novo totalVolume)
  const {
    title,
    focusAreas,
    workoutTime: rawWorkoutTime,
    totalSetsDone,
    // ✅ NOVO DADO
    totalVolume,
  } = feedback;

  const workoutTimeInSeconds = Number(rawWorkoutTime) || 0;
  const setsDone = Number(totalSetsDone) || 0;
  const volumeDone = Number(totalVolume) || 0;

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
          // Garante que o ScrollView ocupe o espaço mínimo e máximo
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled"
        >
          {/* Este container usa 'space-between' e 'flex: 1' para empurrar o botão para baixo */}
          <View style={styles.viewParaConsertarEssaMerda}>
            
            {/* ⬆️ PARTE DE CIMA (Parabéns e Métricas) ⬆️ */}
            {/* O container principal usa justifyContent: 'center' para centralizar VERTICALMENTE o conteúdo */}
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
                  {/* 🏋️ VOLUME TOTAL */}
                  <View style={styles.metrics}>
                    <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                      {/* ✅ Exibe o volume total calculado */}
                      {volumeDone.toLocaleString('pt-BR')} kg
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

                  {/* 🔢 SÉRIES CONCLUÍDAS */}
                  <View style={styles.metrics}>
                    <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
                      {/* ✅ Exibe o número de séries concluídas */}
                      {setsDone}
                    </Text>
                    <Text style={Texts.body}>Séries</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ⬇️ PARTE DE BAIXO (Botão Concluir) ⬇️ */}
            <View>
              <Button 
                title="Concluir" 
                onPress={() => router.push('/(tabs)/workout')}
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
    width: '100%'
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