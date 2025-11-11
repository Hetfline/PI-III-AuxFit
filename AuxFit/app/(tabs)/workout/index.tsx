import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import TabSelector from "@/components/universal/TabSelector";
import ExerciseCard from "@/components/workout/ExerciceCard";
import ExerciseSets from "@/components/workout/ExerciceSets";
import WorkoutCard from "@/components/workout/WorkoutCard";
import FocusArea from "@/components/workout/FocusArea";
import FilterBtn from "@/components/universal/FilterBtn";
import FilterModal from "@/components/universal/FilterModal";
import AboutExercice from "@/components/workout/AboutExercice";
import Button from "@/components/universal/Button";

export default function WorkoutScreen() {
  // * Mocks
  const planos = [
    { id: 1, name: "Plano A" },
    { id: 2, name: "Plano B" },
    { id: 3, name: "Plano C" },
    { id: 4, name: "Plano D" },
    { id: 5, name: "Plano E" },
    { id: 6, name: "Plano F" },
  ];

  const [activeTab, setActiveTab] = useState<"treino" | "exercicios">("treino");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(1);

  const handleTabChange = (tab: "treino" | "exercicios") => {
    setActiveTab(tab);
  };

  const handlePlanSelect = (id: number) => {
    setSelectedPlanId(id);
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

            {activeTab === "treino" && (
              <View style={styles.container}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: Spacing.sm }}
                  style={styles.planCardContainer}
                >
                  {planos.map((plano) => {
                    const isSelected = plano.id === selectedPlanId;

                    return (
                      <Pressable
                        key={plano.id}
                        onPress={() => handlePlanSelect(plano.id)}
                        style={[
                          styles.planCard,
                          {
                            backgroundColor: isSelected
                              ? Colors.primary
                              : Colors.bgLight,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            Texts.bodyBold,
                            {
                              color: isSelected ? Colors.bg : Colors.text,
                            },
                          ]}
                        >
                          {plano.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                  
                </ScrollView>
                <Button title="Adicionar plano" icon="add" dashBorder onPress={() => null} borderColor={Colors.subtext} radius={10} color={Colors.subtext} bgColor="transparent"/>

                  {/* Container de treinos */}
                <View>
                  <Text style={Texts.subtitle}>Meus treinos</Text>
                  <View style={{gap: Spacing.md}}>
                    {/* // TODO COMPONENTES INCOMPLETOS */}
                    <WorkoutCard focusAreas="Peito, ombro, tríceps" title="Treino 1" />
                    <WorkoutCard focusAreas="Quadríceps, glúteo, panturrilha" title="Treino 2"/>
                    <WorkoutCard focusAreas="Costas, bíceps, antebraço" title="Treino 3"/>
                    {/* // TODO COMPONENTES INCOMPLETOS */}
                  </View>
                </View>
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
            )}

            {activeTab === "exercicios" && (
              <View style={styles.container}>
                <AboutExercice about />
                <AboutExercice />
              </View>
            )}
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
  planCard: {
    borderRadius: 10,
    padding: Spacing.sm,
    backgroundColor: Colors.bgLight,
    alignItems: "center",
  },
  planCardContainer: {
    flexDirection: "row",
    overflow: "scroll",
    gap: Spacing.sm,
  },
});
