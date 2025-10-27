// * Componente de círculo de progressão para exibir a distribuição de macronutrientes. Recebe os valores de macros (proteínas, carboidratos e gorduras),  quantidade de registros, calorias totais e calorias ingeridas como props.

import { View, StyleSheet, Text } from "react-native";
import { Colors, Spacing, Texts, Shadows } from "@/constants/Styles";
import CircularProgress from "react-native-circular-progress-indicator";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface MacrosProgressProps {
  calories: number;
  logs: number;
  caloriesIngested: number;
  protein: number;
  carbs: number;
  fats: number;
  
}

export default function MacrosProgress({
  calories,
  logs,
  caloriesIngested,
  protein,
  carbs,
  fats,
}: MacrosProgressProps) {
  const chartData = [
    { value: calories, label: "Calorias", color: Colors.accent },
  ];

  let currentProtein: number = 75;
  let currentCarbs: number = 200;
  let currentFats: number = 16;

  return (
    <View style={styles.container}>
      <View style={styles.caloriesContainer}>
        <View style={styles.infoContainer}>
          <Text style={[Texts.bodyBold, { color: Colors.correct }]}>
            {logs}
          </Text>
          <Text style={Texts.body}>Registros</Text>
        </View>

        <View style={styles.progressContainer}>
          <CircularProgress
            value={caloriesIngested}
            maxValue={calories}
            showProgressValue={false}
            radius={65}
            // clockwise={false}
            // rotation={269} // caso for deixa o semi-círculo, o valor aqui fica 269
            activeStrokeWidth={12}
            inActiveStrokeWidth={12}
            activeStrokeColor={Colors.accent}
            activeStrokeSecondaryColor={Colors.warning}
            inActiveStrokeColor={Colors.border}
            progressValueColor={Colors.text}
          />
          <View style={styles.calories}>
            <MaterialCommunityIcons
              name="fire"
              size={24}
              color={Colors.accent}
            />
            <Text style={[Texts.bodyBold, { color: Colors.text }]}>
              {calories} kcal
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[Texts.bodyBold, { color: Colors.accent }]}>
            {Math.round(calories - caloriesIngested)}{" "}
            <MaterialCommunityIcons
              name="fire"
              size={16}
              color={Colors.accent}
            />
          </Text>

          <Text style={[Texts.bodyBold, { color: Colors.accent }]}>
            Restantes
          </Text>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        {/* Barra de Proteínas */}
        <View style={styles.macros}>
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            {currentProtein} / {protein}
          </Text>

          <View style={styles.macroProgressBar}>
            <View
              style={[
                styles.macroProgress,
                {
                  width: `${(currentProtein * 100) / protein}%`,
                  backgroundColor: Colors.correct,
                },
              ]}
            >
              <Text style={{ color: "transparent" }}>a</Text>
            </View>
          </View>
          <Text style={[Texts.subtext, { color: Colors.text }]}>Proteínas</Text>
        </View>

        {/* Barra de Carboidratos */}

        <View style={styles.macros}>
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            {currentCarbs} / {carbs}
          </Text>

          <View style={styles.macroProgressBar}>
            <View
              style={[
                styles.macroProgress,
                {
                  width: `${(currentCarbs * 100) / carbs}%`,
                  backgroundColor: Colors.secondary,
                },
              ]}
            >
              <Text style={{ color: "transparent" }}>a</Text>
            </View>
          </View>
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            Carboidratos
          </Text>
        </View>

        {/* Barra de Gorduras */}

        <View style={styles.macros}>
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            {currentFats} / {fats}
          </Text>

          <View style={styles.macroProgressBar}>
            <View
              style={[
                styles.macroProgress,
                {
                  width: `${(currentFats * 100) / fats}%`,
                  backgroundColor: Colors.warning,
                },
              ]}
            >
              <Text style={{ color: "transparent" }}>a</Text>
            </View>
          </View>
          <Text style={[Texts.subtext, { color: Colors.text }]}>Gorduras</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
    backgroundColor: Colors.bgMedium,
    borderRadius: 20,
    padding: Spacing.sm,
  },
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.sm,
  },
  progressContainer: {
    // height: 75,
    overflow: "hidden",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  calories: {
    position: "absolute",
    // Faz a View ocupar todo o espaço do container pai
    top: 0, // caso for deixar o semi-círculo, tem que deixar aqui com o valor 30
    left: 0,
    right: 0,
    bottom: 0,
    // Usa flexbox para centralizar o conteúdo (o Text)
    justifyContent: "center",
    alignItems: "center",
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.sm,
  },
  macros: {
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xs,
  },
  macroProgressBar: {
    borderRadius: 100,
    height: 8,
    width: 80,
    backgroundColor: Colors.border,
  },
  macroProgress: {
    height: 8,
    maxWidth: 100,
    borderRadius: 100,
  },
});
