import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import Header from "@/components/universal/Header";
import ExerciseSets from "@/components/workout/ExerciceSets";
import Button from "@/components/universal/Button";
import Timer from "@/components/workout/Timer";
import { api } from "@/services/api";

interface WorkoutItem {
  id: number;
  series: number;
  repeticoes: number;
  carga: number;
  exercicios: {
    id: number;
    nome_exercicio: string;
    imagem_url?: string;
  };
}

interface WorkoutHeader {
  id: number;
  nome: string;
  areas_foco: string[] | string;
}

interface ExerciseMetrics {
  completedSets: number;
  volume: number;
}

export default function OngoingWorkoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [workoutHeader, setWorkoutHeader] = useState<WorkoutHeader | null>(
    null
  );
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // Estado para loading do botão

  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const [exerciseMetrics, setExerciseMetrics] = useState<
    Record<number, ExerciseMetrics>
  >({});

  useEffect(() => {
    const initWorkout = async () => {
      const rawData = params.workoutData;
      const workoutDataString = Array.isArray(rawData) ? rawData[0] : rawData;

      if (workoutDataString) {
        try {
          const header = JSON.parse(workoutDataString);
          setWorkoutHeader(header);

          // Busca os exercícios detalhados do treino
          const items = await api.getWorkoutExercises(header.id);
          setWorkoutItems(items);
        } catch (e) {
          console.error("Erro ao carregar treino:", e);
          Alert.alert("Erro", "Falha ao carregar os dados do treino.");
        } finally {
          setLoading(false);
        }
      }
    };

    initWorkout();
  }, [params.workoutData]);

  // Callback chamado quando o usuário marca/desmarca séries no componente filho
  const handleSetCompletion = useCallback(
    (exerciseId: number, count: number, volume: number) => {
      setExerciseMetrics((prev) => ({
        ...prev,
        [exerciseId]: { completedSets: count, volume: volume },
      }));
    },
    []
  );

  // Callback para adicionar série visualmente (opcional)
  const handleSetAdd = useCallback((workoutItemId: number) => {
    setWorkoutItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === workoutItemId) {
          return { ...item, series: item.series + 1 };
        }
        return item;
      });
    });
  }, []);

  // Cálculos totais para o resumo
  const totalCompletedSets = Object.values(exerciseMetrics).reduce(
    (sum, metrics) => sum + metrics.completedSets,
    0
  );

  const totalVolume = Object.values(exerciseMetrics).reduce(
    (sum, metrics) => sum + metrics.volume,
    0
  );

  // --- INTEGRAÇÃO COM O BACKEND ---
  const handleFinishWorkout = async () => {
    if (!workoutHeader) return;

    const exercisesPayload = workoutItems.map((item) => {
      const metrics = exerciseMetrics[item.id] || {
        completedSets: 0,
        volume: 0,
      };

      return {
        exercicio_fk: item.exercicios.id,
        series_feitas: metrics.completedSets,

        repeticoes_feitas: item.repeticoes,
        carga_maxima: item.carga,

        sets: [],
      };
    });

    const finishData = {
      treino_base_fk: workoutHeader.id,
      nome_treino: workoutHeader.nome,
      duracao_segundos: timeInSeconds,
      volume_total: totalVolume,
      exercicios: exercisesPayload,
    };

    try {
      setIsSaving(true);

      await api.finishWorkout(finishData);

      let focusAreasString = "Geral";
      if (workoutHeader.areas_foco) {
        if (Array.isArray(workoutHeader.areas_foco)) {
          focusAreasString = workoutHeader.areas_foco.join(", ");
        } else {
          focusAreasString = String(workoutHeader.areas_foco);
        }
      }

      const feedbackData = {
        title: workoutHeader.nome,
        focusAreas: focusAreasString,
        workoutTime: timeInSeconds,
        totalVolume: totalVolume.toString(),
        totalSetsDone: totalCompletedSets.toString(),
      };

      router.push({
        pathname: "/workout/workoutFeedbackScreen",
        params: {
          feedback: JSON.stringify(feedbackData),
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o treino. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !workoutHeader) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.bg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={[Texts.body, { marginTop: 10, color: Colors.subtext }]}>
          Preparando seu treino...
        </Text>
      </View>
    );
  }

  let focusString = "Geral";
  if (workoutHeader.areas_foco) {
    if (Array.isArray(workoutHeader.areas_foco)) {
      if (workoutHeader.areas_foco.length > 0) {
        focusString = workoutHeader.areas_foco.join(", ");
      }
    } else {
      focusString = String(workoutHeader.areas_foco);
    }
  }

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
          <View style={styles.container}>
            <Header
              title={workoutHeader.nome}
              subtitle={focusString}
              subtitleColor={Colors.accent}
              backArrow
              onIconPress={() => null}
            />

            <Timer
              isRunning={true}
              timeInSeconds={timeInSeconds}
              setTimeInSeconds={setTimeInSeconds}
            />

            <View style={{ gap: Spacing.xl }}>
              <View style={{ gap: 12 }}>
                <Text style={Texts.subtitle}>Exercícios</Text>
                {workoutItems.map((item) => (
                  <ExerciseSets
                    key={item.id}
                    exerciseId={item.id}
                    name={item.exercicios.nome_exercicio}
                    imageUrl={item.exercicios.imagem_url}
                    totalSets={item.series}
                    targetReps={item.repeticoes}
                    targetWeight={item.carga}
                    onSetCompletion={handleSetCompletion}
                    onSetAdd={handleSetAdd}
                  />
                ))}
              </View>

              {/* Botão com LoadingState */}
              <Button
                title={isSaving ? "Salvando..." : "Finalizar treino"}
                onPress={handleFinishWorkout}
                bgColor={Colors.primary}
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
    gap: Spacing.md,
  },
});
