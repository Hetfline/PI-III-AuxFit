import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert
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

// Interface que reflete a estrutura do banco (tabela de junção + dados do exercício)
interface WorkoutItem {
  id: number; // ID da relação treino_exercicio
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
  areas_foco: string[];
}

interface ExerciseMetrics {
  completedSets: number;
  volume: number;
}

export default function OngoingWorkoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Dados básicos do treino (Header) passados pela rota anterior
  const [workoutHeader, setWorkoutHeader] = useState<WorkoutHeader | null>(null);
  
  // Lista de exercícios (Items) buscados do banco
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado do Timer
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  
  // Métricas de progresso (Sets feitos e Volume total)
  const [exerciseMetrics, setExerciseMetrics] = useState<
    Record<number, ExerciseMetrics>
  >({});

  // 1. Inicialização: Parse dos params e busca dos exercícios
  useEffect(() => {
    const initWorkout = async () => {
      const rawData = params.workoutData;
      const workoutDataString = Array.isArray(rawData) ? rawData[0] : rawData;

      if (workoutDataString) {
        try {
          const header = JSON.parse(workoutDataString);
          setWorkoutHeader(header);
          
          // IMPORTANTE: Busca os exercícios atualizados do banco via API
          // Isso garante que temos as metas (carga/reps) e imagens corretas
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

  // Callback: Atualiza métricas quando o usuário marca uma série como feita no componente filho
  const handleSetCompletion = useCallback((
    exerciseId: number,
    count: number,
    volume: number
  ) => {
    setExerciseMetrics((prev) => ({
      ...prev,
      [exerciseId]: { completedSets: count, volume: volume },
    }));
  }, []);

  // Callback: Adiciona uma série extra (apenas visualmente nesta sessão)
  const handleSetAdd = useCallback((workoutItemId: number) => {
    setWorkoutItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === workoutItemId) {
          return {
            ...item,
            series: item.series + 1,
          };
        }
        return item;
      });
    });
  }, []);

  // Cálculos Finais para o Feedback
  const totalCompletedSets = Object.values(exerciseMetrics).reduce(
    (sum, metrics) => sum + metrics.completedSets,
    0
  );
  
  const totalVolume = Object.values(exerciseMetrics).reduce(
    (sum, metrics) => sum + metrics.volume,
    0
  );

  const handleFinishWorkout = () => {
    if (!workoutHeader) return;

    const feedbackData = {
      title: workoutHeader.nome,
      focusAreas: workoutHeader.areas_foco ? workoutHeader.areas_foco.join(", ") : "Geral",
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
  };

  if (loading || !workoutHeader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.bg }}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={[Texts.body, { marginTop: 10, color: Colors.subtext }]}>Preparando seu treino...</Text>
      </View>
    );
  }

  const focusString = workoutHeader.areas_foco && workoutHeader.areas_foco.length > 0
    ? workoutHeader.areas_foco.join(", ")
    : "Geral";

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

            {/* Lista de exercícios */}
            <View style={{ gap: Spacing.xl }}>
              <View style={{ gap: 12 }}>
                <Text style={Texts.subtitle}>Exercícios</Text>
                
                {workoutItems.map((item) => (
                  <ExerciseSets
                    key={item.id}
                    // Identificadores
                    exerciseId={item.id} 
                    name={item.exercicios.nome_exercicio}
                    imageUrl={item.exercicios.imagem_url}
                    
                    // Metas vindas do treino (Target)
                    totalSets={item.series}
                    targetReps={item.repeticoes}
                    targetWeight={item.carga}
                    
                    // Callbacks
                    onSetCompletion={handleSetCompletion}
                    onSetAdd={handleSetAdd}
                  />
                ))}
                
                {workoutItems.length === 0 && (
                  <Text style={{ color: Colors.subtext, textAlign: 'center', paddingVertical: 20 }}>
                    Nenhum exercício cadastrado neste treino.
                  </Text>
                )}
              </View>
              
              <Button
                title="Finalizar treino"
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