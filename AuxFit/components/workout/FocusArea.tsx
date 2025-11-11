// * Componente de área de foco de exerício. Recebe o prop de nome.

import { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface WorkoutCardProps {
  focusArea: string;
}

export default function WorkoutCard({ focusArea }: WorkoutCardProps) {
  const [isFocus, setIsFocus] = useState(false);

  const handleCardPress = () => {
    setIsFocus((prev) => !prev);
  };

  return (
    <Pressable
      style={[styles.container, isFocus ? styles.borderOn : styles.borderOff]}
      onPress={handleCardPress}
    >
      <View style={styles.content}>
        <Text style={Texts.bodyBold}>{focusArea}</Text>
        <View style={styles.imgContainer}>
          <Text>IMG</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.bgLight,
    flex: 1,
    borderRadius: 10
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  borderOn: {
    borderWidth: 3,
    borderColor: Colors.accent,
  },
  borderOff: {
    borderWidth: 3,
    borderColor: Colors.bgLight,
  },
});
