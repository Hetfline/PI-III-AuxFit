import React, { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";
import WaterProgress from "@/components/diet/WaterProgress";
import MacrosProgress from "@/components/diet/MacrosProgress";
import WorkoutCard from "@/components/workout/WorkoutCard";
import Header from "@/components/universal/Header";
import getFormattedDate from "@/utils/getFormattedDate";
import Meal from "@/components/diet/Meal";
import WeightIn from "@/components/universal/WeightIn";

export default function HomeScreen() {
  // * Mocks
  const foodItems = [
    {
      id: 1,
      name: "Alimento 1",
      weight: 150,
      calories: 357,
      protein: 20,
      carbs: 30,
      fats: 15,
    },
    {
      id: 2,
      name: "Alimento 2",
      weight: 100,
      calories: 120,
      protein: 10,
      carbs: 20,
      fats: 5,
    },
    {
      id: 3,
      name: "Alimento 3",
      weight: 50,
      calories: 50,
      protein: 5,
      carbs: 10,
      fats: 2,
    },
  ];

  const data = [
    { label: "Copo (200ml)", value: 200 },
    { label: "Garrafa (500ml)", value: 500 },
    { label: "Garrafa (1L)", value: 1000 },
  ];

  const mockWorkouts = [
    // 1. TREINO A - EMPURRAR (Push)
    {
      id: 1,
      title: "Peito, Ombro e Tríceps",
      duration: 60,
      numExercises: 6,
      focusAreas: "Peito, Ombro, Tríceps",
      exercises: [
        {
          id: 101,
          name: "Supino Reto com Barra",
          focusArea: "Peito",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 102,
          name: "Desenvolvimento com Halteres",
          focusArea: "Ombro",
          totalSets: 4,
          totalReps: 12,
        },
        {
          id: 103,
          name: "Crossover (Cabo)",
          focusArea: "Peito",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 104,
          name: "Elevação Lateral",
          focusArea: "Ombro",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 105,
          name: "Tríceps Testa",
          focusArea: "Tríceps",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 106,
          name: "Extensão de Tríceps na Polia",
          focusArea: "Tríceps",
          totalSets: 3,
          totalReps: 12,
        },
      ],
    },

    // 2. TREINO B - PUXAR (Pull)
    {
      id: 2,
      title: "Costas e Bíceps",
      duration: 55,
      numExercises: 5,
      focusAreas: "Costas, Bíceps, Antebraço",
      exercises: [
        {
          id: 201,
          name: "Puxada Frontal (Lat Pulldown)",
          focusArea: "Costas",
          totalSets: 4,
          totalReps: 12,
        },
        {
          id: 202,
          name: "Remada Curvada com Barra",
          focusArea: "Costas",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 203,
          name: "Remada Sentada (Cabo)",
          focusArea: "Costas",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 204,
          name: "Rosca Direta com Barra W",
          focusArea: "Bíceps",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 205,
          name: "Rosca Martelo",
          focusArea: "Bíceps",
          totalSets: 3,
          totalReps: 15,
        },
      ],
    },

    // 3. TREINO C - PERNAS (Legs)
    {
      id: 3,
      title: "Pernas e Glúteos",
      duration: 70,
      numExercises: 6,
      focusAreas: "Quadríceps, Glúteos, Posterior, Panturrilha",
      exercises: [
        {
          id: 301,
          name: "Agachamento Livre",
          focusArea: "Quadríceps",
          totalSets: 5,
          totalReps: 8,
        },
        {
          id: 302,
          name: "Leg Press 45°",
          focusArea: "Quadríceps",
          totalSets: 4,
          totalReps: 12,
        },
        {
          id: 303,
          name: "Stiff com Halteres",
          focusArea: "Posterior/Glúteos",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 304,
          name: "Cadeira Extensora",
          focusArea: "Quadríceps",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 305,
          name: "Cadeira Flexora",
          focusArea: "Posterior",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 306,
          name: "Elevação de Panturrilha Sentado",
          focusArea: "Panturrilha",
          totalSets: 4,
          totalReps: 20,
        },
      ],
    },

    // 4. TREINO D - CORPO TOTAL (Full Body)
    {
      id: 4,
      title: "Full Body",
      duration: 45,
      numExercises: 4,
      focusAreas: "Peito, Costas, Pernas, Ombro",
      exercises: [
        {
          id: 401,
          name: "Supino com Halteres",
          focusArea: "Peito",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 402,
          name: "Remada Curvada (Máquina)",
          focusArea: "Costas",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 403,
          name: "Agachamento taça (Goblet Squat)",
          focusArea: "Pernas",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 404,
          name: "Desenvolvimento Militar (Barra)",
          focusArea: "Ombro",
          totalSets: 3,
          totalReps: 8,
        },
      ],
    },

    // 5. TREINO E - FOCO EM ISOLAMENTO
    {
      id: 5,
      title: "Braços e Isolamento",
      duration: 40,
      numExercises: 4,
      focusAreas: "Bíceps, Tríceps, Ombro (lateral)",
      exercises: [
        {
          id: 501,
          name: "Rosca Concentrada",
          focusArea: "Bíceps",
          totalSets: 3,
          totalReps: 10,
        },
        {
          id: 502,
          name: "Coice (Kickback)",
          focusArea: "Tríceps",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 503,
          name: "Elevação Frontal com Halteres",
          focusArea: "Ombro",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 504,
          name: "Rosca Scott",
          focusArea: "Bíceps",
          totalSets: 3,
          totalReps: 10,
        },
      ],
    },
  ];

  const macros: { protein: number; carbs: number; fats: number } = {
    protein: 150,
    carbs: 225,
    fats: 56,
  };

  let calories: number =
    macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;

  const [logs, setLogs] = useState(0);
  const [isMacro, setIsMacro] = useState(true);

  const handleIncreaseLogs = () => {
    setLogs((prev) => prev + 1);
  };

  const handleDecreaseLogs = () => {
    setLogs((prev) => Math.max(0, prev - 1));
  };
  const router = useRouter();
  const [isModalVisible] = useState(false);

  const handleTestOnboarding = () => {
    router.push("/onboarding");
  };

  const handleNavigateToDetails = (workoutData: (typeof mockWorkouts)[0]) => {
    const workoutDataString = JSON.stringify(workoutData);

    router.push({
      pathname: "/workout/workoutInfoScreen",
      params: {
        workoutData: workoutDataString,
      },
    });
  };

  const date = getFormattedDate();

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            <Button
              title="Testar Onboarding"
              onPress={handleTestOnboarding}
              bgColor="#35e1ffff"
            />

            <Button
              title="Testar Login"
              onPress={() => router.push("/(auth)")}
              bgColor="#35e1ffff"
            />

            <Header
              title="Olá, Virgulino"
              subtitle={date}
              subtitleColor={Colors.text}
              streak
            />

            {/* Progresso do dia */}
            <View style={{ gap: Spacing.md }}>
              <Text style={Texts.subtitle}>Progresso do dia</Text>
              <View style={styles.macroWaterprogressContainer}>
                <View style={{ display: isMacro ? "flex" : "none" }}>
                  <MacrosProgress
                    calories={calories}
                    logs={logs}
                    caloriesIngested={1200}
                    protein={macros.protein}
                    carbs={macros.carbs}
                    fats={macros.fats}
                  />
                </View>

                <View style={{ display: isMacro ? "none" : "flex" }}>
                  <WaterProgress currentWater={0} />
                </View>
                <View style={styles.dotsContainer}>
                  <Pressable
                    onPress={() => setIsMacro(true)}
                    hitSlop={15}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: isMacro
                          ? Colors.primary
                          : Colors.subtext,
                      },
                    ]}
                  ></Pressable>

                  <Pressable
                    onPress={() => setIsMacro(false)}
                    hitSlop={15}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: isMacro
                          ? Colors.subtext
                          : Colors.primary,
                      },
                    ]}
                  ></Pressable>
                </View>
              </View>
            </View>

            {/* Próxima refeição */}
            <View>
              <Text style={Texts.subtitle}>Próxima refeição</Text>
              <View>
                <Meal
                  name="Almoço"
                  increaseLogs={() => handleIncreaseLogs()}
                  decreaseLogs={() => handleDecreaseLogs()}
                  onPress={() =>
                    router.push({
                      pathname: "/diet/mealScreen",
                      params: {
                        data: JSON.stringify({
                          mealName: "Almoço",
                          totalProtein: macros.protein,
                          totalCarbs: macros.carbs,
                          totalFats: macros.fats,
                          calories: calories,
                          foodItems: foodItems,
                        }),
                      },
                    })
                  }
                />
              </View>
            </View>

            {/* Meus treunos */}
            <View style={{ gap: Spacing.md }}>
              <Text style={Texts.subtitle}>Meus treinos</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
                style={{ gap: Spacing.sm, flexDirection: "row" }}
              >
                {mockWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    onPress={() => handleNavigateToDetails(workout)}
                    focusAreas={workout.focusAreas}
                    title={workout.title}
                    duration={workout.duration}
                    numExercises={workout.numExercises}
                  />
                ))}
              </ScrollView>
              <View style={{ paddingHorizontal: 32 }}>
                <Button
                  title="Explorar exercícios"
                  bgColor={Colors.accent}
                  onPress={() =>
                    router.push("/(tabs)/workout/searchExerciseScreen")
                  }
                />
              </View>
            </View>

            {/* Adicionar pesagem */}
            <View style={{gap: Spacing.md}}>
              <Text style={Texts.subtitle}>Adicionar nova pesagem</Text>
            <View style={styles.weightInContainer}>
              <WeightIn />
            </View>
            </View>

            {/* Widgets */}
            <View style={styles.widgetsContainer}>
              <View>
                <Text style={[Texts.subtitle, { color: Colors.primary }]}>
                Widgets AuxFit
              </Text>
              <Text style={Texts.body}>
                Acompanhe os seus registros de forma rápida e direta na sua tela
                inicial
              </Text>
              </View>
              <View style={{ paddingHorizontal: 32 }}>
                <Button
                  title="Adicionar widgets"
                  icon="add"
                  onPress={() => null}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 100,
    gap: Spacing.lg,
  },
  macroWaterprogressContainer: {
    backgroundColor: Colors.bgMedium,
    borderRadius: 20,
    justifyContent: "space-evenly",
    paddingBottom: Spacing.sm,
  },
  dotsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  exploreExercices: {
    padding: Spacing.sm,
    backgroundColor: Colors.bgMedium,
  },
  weightInContainer: {
    backgroundColor: Colors.bgMedium,
    borderRadius: 10,
  },
  widgetsContainer: {
    backgroundColor: Colors.bgMedium,
    borderRadius: 10,
    gap: Spacing.md,
    padding: Spacing.md
  },
});
