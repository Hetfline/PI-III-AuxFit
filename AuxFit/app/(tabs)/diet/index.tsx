// * Tela inicial de dieta
// TODO adicionar requisições com o banco

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import MacrosProgress from "@/components/diet/MacrosProgress";
import WaterProgress from "@/components/diet/WaterProgress";
import Meal from "@/components/diet/Meal";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacrosDonutLegend from "@/components/diet/MacrosDonutLegend";
import MacrosTable from "@/components/diet/MacrosTable";
import { useRouter } from "expo-router";


export default function dietScreen() {
  const router = useRouter();
  // State que armazena a quantidade de registros de alimentos
  const [logs, setLogs] = useState(0);
 
  const [isMacro, setIsMacro] = useState(true);

  // Função que será passada como prop para um componente filho para alterar seu estado
  const handleIncreaseLogs = () => {
    setLogs((prev) => prev + 1);
  };

  // Função que será passada como prop para um componente filho para alterar seu estado
  const handleDecreaseLogs = () => {
    setLogs((prev) =>
      // Garante que o contador não seja negativo, se desejar
      Math.max(0, prev - 1)
    );
  };

  const foodItems = [
    { id: 1, name: "Alimento 1", weight: 150, calories: 357, protein: 20, carbs: 30, fats: 15 },
    { id: 2, name: "Alimento 2", weight: 100, calories: 120, protein: 10, carbs: 20, fats: 5 },
    { id: 3, name: "Alimento 3", weight: 50, calories: 50, protein: 5, carbs: 10, fats: 2 },
  ];

  const data = [
    { label: "Copo (200ml)", value: 200 },
    { label: "Garrafa (500ml)", value: 500 },
    { label: "Garrafa (1L)", value: 1000 },
  ];

  const macros: { protein: number; carbs: number; fats: number } = {
    protein: 150,
    carbs: 225,
    fats: 56,
  };

  let calories: number =
    macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      {/* Background com linhas decorativas */}
      <Background />
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.scrollContent}>
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

            {/* Container das refeições */}
            <View style={styles.mealsContainer}>
              <Text style={Texts.title}>Refeições</Text>
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
              <Meal
                name="Lanche"
                increaseLogs={() => handleIncreaseLogs()}
                decreaseLogs={() => handleDecreaseLogs()}
                onPress={() => router.push("/chat")}
              />
              <Meal
                name="Jantar"
                increaseLogs={() => handleIncreaseLogs()}
                decreaseLogs={() => handleDecreaseLogs()}
                onPress={() => router.push("/chat")}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <MacrosDonutLegend
                protein={macros.protein}
                carbs={macros.carbs}
                fats={macros.fats}
              />

              {/* <MacroDonutChart
                protein={macros.protein}
                carbs={macros.carbs}
                fats={macros.fats}
              /> */}
            </View>

            <View style={styles.macroTableContainer}>
              <View>
                <Text style={Texts.subtitle}>Tabela nutricional</Text>
                <Text style={Texts.subtext}>Soma de todos os nutrientes</Text>
              </View>
              <MacrosTable
                calories={calories}
                protein={macros.protein}
                carbs={macros.carbs}
                fats={macros.fats}
              />
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
    paddingBottom: 24,
    gap: Spacing.xl,
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
  mealsContainer: {
    gap: Spacing.md,
  },
  macroTableContainer: {
    gap: Spacing.md,
  },
});
