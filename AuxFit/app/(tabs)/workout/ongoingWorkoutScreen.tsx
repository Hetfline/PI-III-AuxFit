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

interface Workout {
  id: number;
  title: string;
  duration: number;
  numExercises: number;
  focusAreas: string;
  exercises: any[];
}

export default function ongoingWorkoutScreen() {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true); // Timer começa rodando
  // Ex: { 101: 4, 102: 3 } -> (4 sets concluídos para o exercício 101 e 3 para o 102)
  const [completedSetsCount, setCompletedSetsCount] = useState<
    Record<number, number>
  >({});

  const router = useRouter();
  const params = useLocalSearchParams();
  const rawData = params.workoutData;
  const workoutDataString = Array.isArray(rawData) ? rawData[0] : rawData;

  let workout: Workout | null = null;

  if (workoutDataString) {
    try {
      workout = JSON.parse(workoutDataString) as Workout;
    } catch (e) {
      console.error("Erro ao fazer parse dos dados do treino:", e);
    }
  }

  if (!workout) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando ou treino não encontrado...</Text>
      </View>
    );
  }

  // Atualiza a contagem quando um set é marcado como concluído
  const handleSetCompletion = (exerciseId: number, count: number) => {
    // Atualiza a contagem de sets concluídos para aquele exercício específico
    setCompletedSetsCount((prev) => ({
      ...prev,
      [exerciseId]: count,
    }));
  };

  // 💡 CALCULA O TOTAL FINAL: Soma todos os valores do objeto de contagem
  const totalCompletedSets = Object.values(completedSetsCount).reduce(
    (sum, count) => sum + count,
    0
  );

    const feedbackData = {
      title: workout.title,
      focusAreas: workout.focusAreas,
      workoutTime: (timeInSeconds),
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
                  />
                ))}
              </View>
              <Button
                title="Finalizar treino"
                onPress={() =>
                  router.push({
                    pathname: "/workout/workoutFeedbackScreen",
                    params: {
                      feedback: JSON.stringify(feedbackData)
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
