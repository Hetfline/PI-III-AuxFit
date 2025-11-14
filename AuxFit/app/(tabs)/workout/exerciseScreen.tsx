

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import ExerciseInfo from "@/components/workout/ExerciseInfo";
import Header from "@/components/universal/Header";

export default function exerciseScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      {/* Background decorativo */}
      <Background />

      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Header
            backArrow
              title="Exercício supimpa"
              subtitle="Peito, Peito debaixo, Peito de cima"
              subtitleColor={Colors.accent}
            />

            <View style={{ gap: Spacing.md }}>
              {/* GIF container */}
              <View style={styles.gifContainer}></View>

              <ExerciseInfo about />
              <ExerciseInfo />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    gap: Spacing.lg,
  },
  gifContainer: {
    width: "100%",
    aspectRatio: 1 / 1,
    backgroundColor: Colors.text,
    borderRadius: 10,
  },
});
