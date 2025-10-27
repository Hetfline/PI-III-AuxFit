import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import MacrosProgress from "@/components/diet/MacrosProgress";
import WaterProgress from "@/components/diet/WaterProgress";
import Meal from "@/components/diet/Meal";
import FoodHistory from "@/components/diet/FoodHistory";
import Button from "@/components/universal/Button";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacrosDonutLegend from "@/components/diet/MacrosDonutLegend";
import MacrosTable from "@/components/diet/MacrosTable";

export default function DietScreen() {
  // State que armazena a quantidade de registros de alimentos
  const [logs, setLogs] = useState(0);

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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.scrollContent}>
            <MacrosProgress
              calories={calories}
              logs={logs}
              caloriesIngested={1200}
              protein={macros.protein}
              carbs={macros.carbs}
              fats={macros.fats}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <MacrosDonutLegend
                protein={macros.protein}
                carbs={macros.carbs}
                fats={macros.fats}
              />

              <MacroDonutChart
                protein={macros.protein}
                carbs={macros.carbs}
                fats={macros.fats}
              />
            </View>

            <MacrosTable
              calories={calories}
              protein={macros.protein}
              carbs={macros.carbs}
              fats={macros.fats}
            />

            <WaterProgress currentWater={0} />

            <Meal
              name="Almoço"
              increaseLogs={() => handleIncreaseLogs()}
              decreaseLogs={() => handleDecreaseLogs()}
            />
            <Meal
              name="Lanche"
              increaseLogs={() => handleIncreaseLogs()}
              decreaseLogs={() => handleDecreaseLogs()}
            />
            <Meal
              name="Jantar"
              increaseLogs={() => handleIncreaseLogs()}
              decreaseLogs={() => handleDecreaseLogs()}
            />

            <FoodHistory onPress={() => null} />
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
    gap: 20,
  },
});
