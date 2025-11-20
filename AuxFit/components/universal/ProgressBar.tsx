import { View, StyleSheet, Text } from "react-native";
import { Colors, Texts } from "@/constants/Styles";

interface ProgressBarProps {
  fillColor: string;
  progressTextColor: string;
  progress: number; // Valor atual (ex: 500 kcal)
  total: number;    // Valor total (ex: 2000 kcal)
}

export default function ProgressBar({
  fillColor,
  progressTextColor,
  progress,
  total,
}: ProgressBarProps) {
  // Evita divisão por zero
  const safeTotal = total > 0 ? total : 1;
  const percentage = Math.min((progress / safeTotal) * 100, 100);

  return (
    <View style={styles.progressBar}>
      {percentage > 0 && (
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: fillColor },
          ]}
        >
          {/* Exibe o texto dentro da barra apenas se houver espaço suficiente (>35%) */}
          {percentage > 35 && (
            <Text
              style={[
                Texts.bodyBold,
                { color: progressTextColor, fontSize: 10, lineHeight: 12 },
              ]}
            >
              {Math.round(percentage)} %
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    height: 14, // Altura ajustada para caber no card sem ocupar muito espaço
    backgroundColor: Colors.bgLight, // Cor de fundo da barra vazia
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 4, // Espaçamento superior
  },
  progressFill: {
    height: "100%",
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
  },
});