import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import ExerciseCard from "@/components/workout/ExerciceCard";
import FocusArea from "@/components/workout/FocusArea";
import FilterBtn from "@/components/universal/FilterBtn";
import FilterModal from "@/components/universal/FilterModal";
import InputField from "@/components/universal/InputField";
import FilteredItem from "@/components/workout/FilteredItem";

export default function searchExerciseScreen() {
  const router = useRouter();

  // * Mocks
  const exerciseMocks = [
    // PEITO
    { id: 1, name: "Supino Reto", focusArea: "Peito" },
    { id: 2, name: "Supino Inclinado com Halteres", focusArea: "Peito" },
    { id: 3, name: "Crossover no Cabo", focusArea: "Peito" },

    // COSTAS
    { id: 4, name: "Remada Curvada com Barra", focusArea: "Costas" },
    { id: 5, name: "Puxada Frontal (Lat Pulldown)", focusArea: "Costas" },
    { id: 6, name: "Hiperextensão Lombar", focusArea: "Costas" },

    // PERNAS (Quads, Glúteos)
    { id: 7, name: "Agachamento Livre", focusArea: "Quads" },
    { id: 8, name: "Leg Press 45°", focusArea: "Quads" },
    { id: 9, name: "Cadeira Extensora", focusArea: "Quads" },
    {
      id: 10,
      name: "Levantamento Terra (Deadlift)",
      focusArea: "Posterior / Glúteos",
    },
    { id: 11, name: "Stiff", focusArea: "Posterior / Glúteos" },

    // OMBRO
    { id: 12, name: "Desenvolvimento com Halteres", focusArea: "Ombro" },
    { id: 13, name: "Elevação Lateral", focusArea: "Ombro" },

    // BÍCEPS
    { id: 14, name: "Rosca Direta com Barra", focusArea: "Bíceps" },
    { id: 15, name: "Rosca Concentrada", focusArea: "Bíceps" },

    // TRÍCEPS
    { id: 16, name: "Tríceps Testa", focusArea: "Tríceps" },
    {
      id: 17,
      name: "Extensão de Tríceps com Halteres Acima da Cabeça",
      focusArea: "Tríceps",
    },
  ];

  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFocusAreaToggle = (area: string) => {
    setSelectedFocusAreas((prevAreas) => {
      // Verifica se a área já está no array
      if (prevAreas.includes(area)) {
        // Se estiver, remove (desseleciona)
        return prevAreas.filter((a) => a !== area);
      } else {
        // Se não estiver, adiciona (seleciona)
        return [...prevAreas, area];
      }
    });
  };

  const handleRemoveFilteredItem = (itemToRemove: string) => {
    // Remove o item da lista
    setSelectedFocusAreas((prevItems) =>
      prevItems.filter((item) => item !== itemToRemove)
    );
  };

  // Lista de áreas de foco selecionadas
  const listaItens = selectedFocusAreas.join(", ");

  // Lista de áreas de focos únicas para ser usado no array
  const availableFocusAreas = Array.from(
    new Set(exerciseMocks.map((exercise) => exercise.focusArea))
  );

  // Exercícios filtrados para não repetir as áreas de foco no filtro
  const filteredExercisesByFocusArea = exerciseMocks.filter(
    (exercise) =>
      selectedFocusAreas.length === 0 ||
      selectedFocusAreas.includes(exercise.focusArea)
  );

  // Exercícios filtrados para pesquisa
  const finalFilteredExercises = filteredExercisesByFocusArea.filter(
    (exercise) => {
      if (!searchTerm) return true;

      const lowerCaseSearch = searchTerm.toLowerCase();

      const nameMatches = exercise.name.toLowerCase().includes(lowerCaseSearch);
      const focusAreaMatches = exercise.focusArea
        .toLowerCase()
        .includes(lowerCaseSearch);

      return nameMatches || focusAreaMatches;
    }
  );

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
            <View style={styles.container}>
              <View style={{ flexDirection: "row", gap: Spacing.lg }}>
                <InputField
                  placeholder="Pesquisar"
                  icon="search"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
                <FilterBtn
                  onPress={() => setIsFilterModalVisible((prev) => !prev)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: Spacing.md,
                  flexWrap: "wrap",
                }}
              >
                {selectedFocusAreas.map((area) => (
                  <FilteredItem
                    key={area}
                    name={area}
                    onRemove={handleRemoveFilteredItem}
                  />
                ))}
              </View>

              {/* Container de exercícios */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={Texts.subtitle}>Exercícios</Text>
                <Text style={[Texts.subtext, { color: Colors.accent }]}>
                  {finalFilteredExercises.length} exercícios
                </Text>
              </View>
              <View style={{ gap: 12 }}>
                {finalFilteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    name={exercise.name}
                    focusArea={exercise.focusArea}
                    onPress={() =>
                      router.push("/(tabs)/workout/exerciseScreen")
                    }
                  />
                ))}
              </View>

              {/* Modal */}
              <FilterModal
                filterTitle="Filtrar exercícios"
                isFilterVisible={isFilterModalVisible}
                onClose={() => setIsFilterModalVisible((prev) => !prev)}
              >
                <View>
                  <Text style={Texts.bodyBold}>
                    Áreas de foco{" "}
                    <Text style={[Texts.subtext, { color: Colors.accent }]}>
                      {selectedFocusAreas.length > 0 ? `(${listaItens})` : null}
                    </Text>
                  </Text>
                </View>
                {availableFocusAreas.map((area) => (
                  <FocusArea
                    key={area}
                    focusArea={area}
                    isSelected={selectedFocusAreas.includes(area)} // Passa o estado
                    onPress={handleFocusAreaToggle} // Passa o manipulador
                  />
                ))}
              </FilterModal>
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
    gap: Spacing.md,
  },
});
