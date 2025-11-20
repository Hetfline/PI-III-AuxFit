// * Componente de legenda do gráfico de donut de macros para informar as cores de cada nutriente. Recebe os valores de proteínas, carboidratos e gorduras como props. Será usado junto do componente MacrosDonutChart

import { View, StyleSheet, Text } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles"; // Importando apenas o que será usado

interface MacroPieChartProps {
  protein: number;
  carbs: number;
  fats: number;
}

export default function MacrosDonutLegend({
  protein,
  carbs,
  fats,
}: MacroPieChartProps) {
  // * Calcula as porcentagens dos macros com base no peso
  // let totalMacros = protein + carbs + fats;

  // * Calcula as porcentagens dos macros com base nas calorias
  let totalCalories = protein * 4 + carbs * 4 + fats * 9; // multiplica as gramas dos macros com as suas calorias

  const convertedMacros = [
    // * Calcula as porcentagens dos macros com base no peso
    //    protein = Math.round((protein * 100) / totalCalories),
    //    carbs = Math.round((carbs * 100) / totalCalories),
    //    fats = Math.round((fats * 100) / totalMacros)

    // * Calcula as porcentagens dos macros com base nas calorias
    (protein = Math.round(((protein * 4) / totalCalories) * 100)),
    (carbs = Math.round(((carbs * 4) / totalCalories) * 100)),
    (fats = Math.round(((fats * 9) / totalCalories) * 100)),
  ];

  return (
    <View style={styles.container}>
      {/* Legenda das Proteínas */}
      <View style={styles.legendWrapper}>
        <View
          style={[styles.legendLabel, { backgroundColor: Colors.correct }]}
        ></View>
        {protein ? (
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            Proteínas: {protein}%
          </Text>
        ) : (
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            Proteínas: 0
          </Text>
        )}
      </View>

      {/* Legenda dos Carboidratos */}
      <View style={styles.legendWrapper}>
        <View
          style={[styles.legendLabel, { backgroundColor: Colors.secondary }]}
        ></View>
        {carbs ? (
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            Carboidratos: {carbs}%
          </Text>
        ) : (
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            Carboidratos: 0
          </Text>
        )}
      </View>

      {/* Legenda das Gorduras */}
      <View style={styles.legendWrapper}>
        <View
          style={[styles.legendLabel, { backgroundColor: Colors.warning }]}
        ></View>
        {fats ? <Text style={[Texts.subtext, { color: Colors.text }]}>
          Gorduras: {fats}%
        </Text>:
        <Text style={[Texts.subtext, { color: Colors.text }]}>
          Gorduras: 0
        </Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    gap: Spacing.md,
    justifyContent: "center",
  },

  legendWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  legendLabel: {
    borderRadius: 100,
    width: 20,
    height: 20,
  },
});
