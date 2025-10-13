// * Componente de tabela para exibir a distribuição de macronutrientes. Recebe os valores de proteínas, carboidratos e gorduras como props.
// ? os valores precisam ser passados como props mesmo?

import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface MacrosTableProps {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default function MacrosTable({
  calories,
  protein,
  carbs,
  fats,
}: MacrosTableProps) {
  return (
    <View style={styles.container}>
      {/* Linha de calorias */}
      <View style={styles.darkLine}>
        <Text style={Texts.body}>Calorias</Text>
        <Text style={Texts.body}>{calories}</Text>
      </View>

      {/* Linha de proteínas */}
      <View style={styles.lightLine}>
        <Text style={[Texts.body, { color: Colors.correct }]}>Proteínas</Text>
        <Text style={Texts.body}>{protein.toFixed(1)}</Text>
      </View>

      {/* Linha de Carboidratos */}
      <View style={styles.darkLine}>
        <Text style={[Texts.body, { color: Colors.secondary }]}>
          Carboidratos
        </Text>
        <Text style={Texts.body}>{carbs.toFixed(1)}</Text>
      </View>

      {/* Linha de Carboidratos */}
      <View style={styles.lightLine}>
        <Text style={[Texts.body, { color: Colors.warning }]}>Gorduras</Text>
        <Text style={Texts.body}>{fats.toFixed(1)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  lightLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.bgLight,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
  },
  darkLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.bgMedium,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
  },
});
