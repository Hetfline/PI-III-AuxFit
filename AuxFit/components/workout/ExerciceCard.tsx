// * Componente de card simples de exercícios. Recebe os props de nome, quantidade total de séries e de repetições.

import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useState } from "react";

interface ExerciceSetsProps {
  name: string;
  focusArea: string;
  totalSets?: number;
  totalReps?: number;
  pressable?: boolean;
  onPress?: () => void;
}

export default function ExerciseCard({
  name,
  totalSets,
  totalReps,
  focusArea,
  pressable,
  onPress,
}: ExerciceSetsProps) {
  const [isFocus, setIsFocus] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    setIsFocus((prev) => !prev);
  };

  return (
    <Pressable
      style={[
        styles.container,
        (pressable && isFocus) ? { borderColor: Colors.accent } : null,
      ]}
      hitSlop={15}
      onPress={handlePress}
    >
      <View style={styles.imgContainer}>
        <Text>IMG</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={Texts.bodyBold}>{name}</Text>
            <Text style={[Texts.subtext, { color: Colors.accent }]}>
              {focusArea}
            </Text>
            {totalSets && totalReps && (
              <Text style={[Texts.subtext, { color: Colors.secondary }]}>
                {`${totalSets} Séries x ${totalReps} Repetições`}
              </Text>
            )}
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
    alignItems: "flex-start",
    flex: 1,
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
