import { View, StyleSheet, Text } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useState } from "react";

interface ProgressBarProps {
  fillColor: string;
  progressTextColor: string;
  progress: number; // deve ter o valor de 0.0 a 1.0
  total: number;
}

export default function ProgressBar({
  fillColor,
  progressTextColor,
  progress,
  total,
}: ProgressBarProps) {
  const [fillProgress, setFillProgress] = useState(progress);

  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <View style={styles.progressBar}>
      {percentage > 0 && (
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: fillColor },
          ]}
        >
          {/* Garante que o texto dentro de fill não corte */}
          {progress > 35 && (
            <Text style={[styles.progressText, { color: progressTextColor }]}>
              {progress}
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
    height: 20,
    backgroundColor: Colors.bgLight,
    borderRadius: 15,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    justifyContent: "center",
    borderRadius: 15,
    alignItems: "center",
  },
  progressText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
