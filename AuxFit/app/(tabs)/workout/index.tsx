import React, { useState, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { Colors, Spacing } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../../components/universal/Background";
import TabSelector from "../../../components/universal/TabSelector";
import WorkoutSection from "./WorkoutSection";
import ExerciseSection from "./ExerciseSection";
import ExerciseCard from "@/components/workout/ExerciceCard";
import ExerciseSets from "@/components/workout/ExerciceSets";
import WorkoutCard from "@/components/workout/WorkoutCard";
import FocusArea from "@/components/workout/FocusArea";
import GenericModal from "@/components/universal/GenericModal";
import Button from "@/components/universal/Button";
import FilterBtn from "@/components/universal/FilterBtn";
import FilterModal from "@/components/universal/FilterModal";

const { width } = Dimensions.get("window");

export default function WorkoutScreen() {
  const [activeTab, setActiveTab] = useState<"treino" | "exercicios">("treino");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab: "treino" | "exercicios") => {
    setActiveTab(tab);
    Animated.spring(translateX, {
      toValue: tab === "treino" ? 0 : -width,
      useNativeDriver: true,
    }).start();
  };

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Seletor de abas */}
            <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Conteúdo animado das abas */}
            {/* <Animated.View
              style={{
                flexDirection: "row",
                width: width * 1.5, // duas abas lado a lado
                transform: [{ translateX }],
              }}
            >
              <View style={{ width }}>
                <WorkoutSection />
              </View>

              <View style={{ width }}>
                <ExerciseSection />
              </View>
            </Animated.View> */}

            <FilterModal
              filterTitle="Filtro"
              isFilterVisible={isModalVisible}
              onClose={() => setIsModalVisible((prev) => !prev)}
            >
              <FocusArea focusArea="Peito" />
              <FocusArea focusArea="Ombro" />
              <FocusArea focusArea="Bíceps" />
            </FilterModal>

            <FilterBtn onPress={() => setIsModalVisible((prev) => !prev)} />

            <FocusArea focusArea="Peito" />
            <ExerciseSets name="Supino reto" totalSets={4} />
            <ExerciseCard name="Supino reto" totalReps={12} totalSets={4} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    justifyContent: "center",
  },
});
