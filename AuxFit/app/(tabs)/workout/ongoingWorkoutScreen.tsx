import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import Header from "@/components/universal/Header";
import { useLocalSearchParams } from "expo-router";
import ExerciseSets from "@/components/workout/ExerciceSets";
import Button from "@/components/universal/Button";
import Timer from "@/components/workout/Timer";

interface Exercise {
  id: number;
  name: string;
  totalSets: number;
  // Outras propriedades do exercício, se houver
}

interface Workout {
  id: number;
  title: string;
  duration: number;
  numExercises: number;
  focusAreas: string;
  exercises: Exercise[];
}

interface ExerciseMetrics {
  completedSets: number;
  volume: number;
}

// Função utilitária para fazer o parse
const parseWorkoutData = (rawData: any): Workout | null => {
  const workoutDataString = Array.isArray(rawData) ? rawData[0] : rawData;
  if (workoutDataString) {
    try {
      return JSON.parse(workoutDataString) as Workout;
    } catch (e) {
      console.error("Erro ao fazer parse dos dados do treino:", e);
    }
  }
  return null;
};

export default function OngoingWorkoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const initialWorkout = parseWorkoutData(params.workoutData);

  const [workout, setWorkout] = useState<Workout | null>(initialWorkout);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // ✅ NOVO ESTADO: Rastreia sets concluídos E volume por exercício
  const [exerciseMetrics, setExerciseMetrics] = useState<
    Record<number, ExerciseMetrics>
  >({});

  if (!workout) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando ou treino não encontrado...</Text>
      </View>
    );
  }

  // ✅ ATUALIZAÇÃO DA FUNÇÃO DE CALLBACK: Recebe contagem E volume
  const handleSetCompletion = (
    exerciseId: number,
    count: number,
    volume: number
  ) => {
    setExerciseMetrics((prev) => ({
      ...prev,
      [exerciseId]: { completedSets: count, volume: volume },
    }));
  };

  // ✅ FUNÇÃO PARA ADICIONAR SÉRIE (Aumenta totalSets)
  const handleSetAdd = (exerciseId: number) => {
    setWorkout((prevWorkout) => {
      if (!prevWorkout) return null;

      const updatedExercises = prevWorkout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            totalSets: exercise.totalSets + 1,
          };
        }
        return exercise;
      });

      return {
        ...prevWorkout,
        exercises: updatedExercises,
      };
    });
  };

  // 💡 CÁLCULO DAS MÉTRICAS GERAIS
  const totalCompletedSets = Object.values(exerciseMetrics).reduce(
    (sum, metrics) => sum + metrics.completedSets,
    0
  );
  
  const totalVolume = Object.values(exerciseMetrics).reduce(
    (sum, metrics) => sum + metrics.volume,
    0
  );

  const feedbackData = {
    title: workout.title,
    focusAreas: workout.focusAreas,
    workoutTime: timeInSeconds,
    // ✅ PASSANDO VOLUME E SÉRIES CONCLUÍDAS
    totalVolume: totalVolume.toString(),
    totalSetsDone: totalCompletedSets.toString(),
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
            <Header
              title={workout.title}
              subtitle={workout.focusAreas}
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
                {workout.exercises.map((exercise) => (
                  <ExerciseSets
                    key={exercise.id}
                    name={exercise.name}
                    totalSets={exercise.totalSets}
                    exerciseId={exercise.id}
                    onSetCompletion={handleSetCompletion}
                    onSetAdd={handleSetAdd}
                  />
                ))}
              </View>
              <Button
                title="Finalizar treino"
                onPress={() =>
                  router.push({
                    pathname: "/workout/workoutFeedbackScreen",
                    params: {
                      feedback: JSON.stringify(feedbackData),
                    },
                  })
                }
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