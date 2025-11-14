import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/universal/Header";
import AddBtn from "@/components/universal/AddBtn";
import ExerciseCard from "@/components/workout/ExerciceCard";
import Button from "@/components/universal/Button";

interface Workout {
  id: number;
  title: string;
  duration: number;
  numExercises: number;
  focusAreas: string;
  exercises: any[];
}

export default function workoutInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // 1. Pega a string do parâmetro (pode ser string ou string[])
  const rawData = params.workoutData;

  // 2. Normaliza para string única (lida com o erro de tipagem)
  const workoutDataString = Array.isArray(rawData) ? rawData[0] : rawData;

  let workout: Workout | null = null;

  // 3. Desserializa o JSON
  if (workoutDataString) {
    try {
      // ✅ Converte a string JSON de volta para o objeto de Treino
      workout = JSON.parse(workoutDataString) as Workout;
    } catch (e) {
      console.error("Erro ao fazer parse dos dados do treino:", e);
      // Pode ser útil redirecionar o usuário se os dados forem inválidos
    }
  }

  // --- Lógica de Renderização ---

  if (!workout) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando ou treino não encontrado...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Header
            backArrow
              title={workout.title}
              subtitle={workout.focusAreas}
              subtitleColor={Colors.accent}
            />

            <View style={{ gap: Spacing.sm }}>
              <View style={styles.workoutOverview}>
                {/* Tempo de treino */}

                <View
                  style={{
                    gap: Spacing.sm,
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="alarm"
                    size={20}
                    color={Colors.warning}
                  />
                  <Text style={Texts.bodyBold}>{workout.duration} minutos</Text>
                </View>

                {/* Tempo de treino */}

                <View
                  style={{
                    gap: Spacing.sm,
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="dumbbell"
                    size={20}
                    color={Colors.secondary}
                  />
                  <Text style={Texts.bodyBold}>
                    {workout.numExercises} exercícios
                  </Text>
                </View>
              </View>
              <Button
                title="Iniciar treino"
                onPress={() =>
                  router.push({
                    pathname: "/workout/ongoingWorkoutScreen",
                    params: {
                      workoutData: workoutDataString,
                    },
                  })
                }
              />
            </View>

            {/* Container da Lista de exercícios */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: Spacing.sm,
                }}
              >
                <Text style={[Texts.subtitle, { marginBottom: Spacing.sm }]}>
                  Exercícios
                </Text>
                {/* // TODO adicionar função de adicionar alimento no botão AddBtn */}
                <AddBtn
                  onPress={() => router.push("/workout/searchExerciseScreen")}
                  size={30}
                />
              </View>

              {/* Lista de exercícios */}
              <View style={{ gap: 12 }}>
                {workout.exercises.map((exercise) => (
                  // Use o seu componente ExerciseCard aqui para cada exercício

                  <ExerciseCard
                    key={exercise.id}
                    name={exercise.name}
                    focusArea={exercise.focusArea}
                    totalSets={exercise.totalSets}
                    totalReps={exercise.totalReps}
                    onPress={() => router.push("/(tabs)/workout/exerciseScreen")}
                  />
                ))}
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
    paddingVertical: 24,
    gap: Spacing.xl,
  },
  workoutOverview: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
