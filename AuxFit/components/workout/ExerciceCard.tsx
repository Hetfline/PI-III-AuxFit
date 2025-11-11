// * Componente de card simples de exercícios. Recebe os props de nome, quantidade total de séries e de repetições.

import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface ExerciceSetsProps {
  name: string;
  totalSets: number;
  totalReps: number;
}

// const initialSets = [
//   { id: 1, set: 1, weight: 40, reps: 12 },
//   { id: 2, set: 2, weight: 40, reps: 10 },
//   { id: 3, set: 3, weight: 40, reps: 8 },
//   { id: 4, set: 4, weight: 40, reps: 6 },
// ];

export default function ExerciseCard({
  name,
  totalSets,
  totalReps,
}: ExerciceSetsProps) {
  const [isFocus, setIsFocus] = useState(false); // state para lidar com o estado do componente (aberto e fechado)

  const handleCardPress = () => {
    setIsFocus((prev) => !prev);
  };

  return (
    <Pressable style={styles.container} hitSlop={15} onPress={handleCardPress}>
      <View style={styles.imgContainer}>
        <Text>IMG</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={Texts.bodyBold}>{name}</Text>
            <Text style={[Texts.subtext, { color: Colors.secondary }]}>
              {totalSets} Séries x {totalReps} Repetições
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgMedium,
    padding: Spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
    flexDirection: "row",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    // backgroundColor: Colors.secondary
  },
  imgContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.text,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
