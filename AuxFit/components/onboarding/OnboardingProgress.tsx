import { StyleSheet, Text, View, Pressable } from "react-native";
import { Colors, Texts, Spacing } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  onBack: () => void;
}

export default function OnboardingProgress({ currentQuestion, totalQuestions, onBack }: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} hitSlop={8}>
        <MaterialIcons name="chevron-left" size={32} color={Colors.text} />
      </Pressable>
      
      <View style={styles.bar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
      
      <Text style={Texts.bodyBold}>{currentQuestion} / {totalQuestions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between',
    gap: Spacing.sm,
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  bar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.bgLight,
    height: 8,
    borderRadius: 100,
    overflow: "hidden",
  },
  progress: {
    backgroundColor: Colors.secondary,
    borderRadius: 100,
    height: 8,
  },
});