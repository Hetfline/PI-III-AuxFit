// * Componente de gráfico de donut para exibir a distribuição de macronutrientes. Recebe os valores de proteínas, carboidratos e gorduras como props.

import { View, StyleSheet, Text } from "react-native";
import { Pie, PolarChart } from "victory-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface MacroPieChartProps {
  protein: number;
  carbs: number;
  fats: number;
}

export default function MacroDonutChart({
  protein,
  carbs,
  fats,
}: MacroPieChartProps) {
  // Cada item é um objeto com valor, rótulo e cor.
  const chartData = [
    { value: protein, label: "Proteínas", color: Colors.correct },
    { value: carbs, label: "Carbs", color: Colors.secondary },
    { value: fats, label: "Gorduras", color: Colors.warning },
  ];

  const totalCalories = Math.round(protein * 4 + carbs * 4 + fats * 9);

  return (
    <View style={styles.container}>
      <PolarChart
        data={chartData} 
        valueKey="value"
        labelKey="label"
        colorKey="color"
      >
        <Pie.Chart innerRadius={"75%"} startAngle={270} size={120} />
      </PolarChart>

      <View style={styles.calories}>
        <Text style={[Texts.body, { color: Colors.text }]}>
          {totalCalories} kcal
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    // backgroundColor: Colors.bgMedium,
  },
  legendContainer: {
    gap: Spacing.md,
  },
  legendWrapper: {
    flexDirection: "row",
  },
  legendLabel: {
    borderRadius: 100,
    width: 24,
    height: 24,
  },
  calories: {
    position: "absolute",
    // Faz a View ocupar todo o espaço do container pai
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Usa flexbox para centralizar o conteúdo (o Text)
    justifyContent: "center",
    alignItems: "center",
  },
});
