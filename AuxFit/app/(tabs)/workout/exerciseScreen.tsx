import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import ExerciseInfo from "@/components/workout/ExerciseInfo";
import Header from "@/components/universal/Header";
import { useLocalSearchParams } from "expo-router";
import { Video, ResizeMode } from "expo-av";

export default function ExerciseScreen() {
  const params = useLocalSearchParams();

  const { nome, grupoGeral, grupoEspecifico, descricao, execucao, video } =
    params;

  const subtitle = [grupoGeral, grupoEspecifico].filter(Boolean).join(", ");

  //*  Formatar a descrição da execução: separar por '||', numerar e quebrar linhas
  const formattedExecution = (execucao as string)
    ? (execucao as string)
        .split("||")
        .map((step, index) => `${index + 1}. ${step.trim()}`)
        .join("\n\n")
    : "";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      <Background />

      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Header
              backArrow
              title={(nome as string) || "Exercício"}
              subtitle={subtitle}
              subtitleColor={Colors.accent}
              maxWidth
            />

            <View style={{ gap: Spacing.md }}>
              {/* GIF/Video container */}
              <View style={styles.gifContainer}>
                {video ? (
                  <Video
                    source={{ uri: video as string }}
                    style={styles.video}
                    resizeMode={ResizeMode.COVER}
                    isLooping
                    shouldPlay={true}
                    isMuted={true}
                    useNativeControls={false}
                  />
                ) : (
                  <View style={styles.placeholder}>
                    <Text style={{ color: Colors.subtext }}>
                      Sem demonstração visual
                    </Text>
                  </View>
                )}
              </View>

              {/* Sobre o exercício */}
              <ExerciseInfo about description={descricao as string} />

              {/* Execução */}
              <ExerciseInfo steps={formattedExecution} />
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
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});