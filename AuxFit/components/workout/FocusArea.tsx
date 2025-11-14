// * Componente de área de foco de exerício. Recebe o prop de nome.

import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface WorkoutCardProps {
  focusArea: string;
  isSelected: boolean; // 💡
  onPress: (area: string) => void;
}

export default function WorkoutCard({ focusArea, isSelected, onPress }: WorkoutCardProps) {
  

  // const handleCardPress = () => {
  //   setIsFocus((prev) => !prev);
  // };

  return (
    <Pressable
      style={[styles.container, isSelected ? styles.borderOn : styles.borderOff]}
      onPress={() => onPress(focusArea)}
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
