import { View, StyleSheet, Text } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import CircularProgress from "react-native-circular-progress-indicator";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface MacrosProgressProps {
  logs: number;
  caloriesGoal: number;
  caloriesIngested: number;
  // Macros (Meta vs Atual)
  proteinGoal: number;
  proteinCurrent: number;
  carbsGoal: number;
  carbsCurrent: number;
  fatsGoal: number;
  fatsCurrent: number;
}

export default function MacrosProgress({
  logs,
  caloriesGoal,
  caloriesIngested,
  proteinGoal,
  proteinCurrent,
  carbsGoal,
  carbsCurrent,
  fatsGoal,
  fatsCurrent,
}: MacrosProgressProps) {
  
  // Função auxiliar para calcular porcentagem sem divisão por zero
  const getPercent = (current: number, goal: number) => {
    if (goal <= 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const remainingCalories = Math.max(0, caloriesGoal - caloriesIngested);

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
            maxValue={caloriesGoal}
            showProgressValue={false}
            radius={65}
            activeStrokeWidth={12}
            inActiveStrokeWidth={12}
            activeStrokeColor={Colors.accent}
            activeStrokeSecondaryColor={Colors.warning}
            inActiveStrokeColor={Colors.border}
          />
          <View style={styles.calories}>
            <MaterialCommunityIcons
              name="fire"
              size={24}
              color={Colors.accent}
            />
            <Text style={[Texts.bodyBold, { color: Colors.text }]}>
              {Math.round(caloriesIngested)} kcal
            </Text>
            <Text style={[Texts.subtext, { color: Colors.subtext, fontSize: 10 }]}>
               de {caloriesGoal}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[Texts.bodyBold, { color: Colors.accent }]}>
            {Math.round(remainingCalories)}{" "}
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
            {Math.round(proteinCurrent)} / {proteinGoal}g
          </Text>

          <View style={styles.macroProgressBar}>
            <View
              style={[
                styles.macroProgress,
                {
                  width: `${getPercent(proteinCurrent, proteinGoal)}%`,
                  backgroundColor: Colors.correct,
                },
              ]}
            />
          </View>
          <Text style={[Texts.subtext, { color: Colors.text }]}>Proteínas</Text>
        </View>

        {/* Barra de Carboidratos */}
        <View style={styles.macros}>
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            {Math.round(carbsCurrent)} / {carbsGoal}g
          </Text>

          <View style={styles.macroProgressBar}>
            <View
              style={[
                styles.macroProgress,
                {
                  width: `${getPercent(carbsCurrent, carbsGoal)}%`,
                  backgroundColor: Colors.secondary,
                },
              ]}
            />
          </View>
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            Carboidratos
          </Text>
        </View>

        {/* Barra de Gorduras */}
        <View style={styles.macros}>
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            {Math.round(fatsCurrent)} / {fatsGoal}g
          </Text>

          <View style={styles.macroProgressBar}>
            <View
              style={[
                styles.macroProgress,
                {
                  width: `${getPercent(fatsCurrent, fatsGoal)}%`,
                  backgroundColor: Colors.warning,
                },
              ]}
            />
          </View>
          <Text style={[Texts.subtext, { color: Colors.text }]}>Gorduras</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
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
    overflow: "hidden",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calories: {
    position: "absolute",
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
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
    overflow: 'hidden', // Importante para a barra interna não vazar
  },
  macroProgress: {
    height: 8,
    borderRadius: 100,
  },
});