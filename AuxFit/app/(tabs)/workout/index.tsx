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
import TabSelector from "@/components/universal/TabSelector";
import ExerciseCard from "@/components/workout/ExerciceCard";
import WorkoutCard from "@/components/workout/WorkoutCard";
import FocusArea from "@/components/workout/FocusArea";
import FilterBtn from "@/components/universal/FilterBtn";
import FilterModal from "@/components/universal/FilterModal";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";
import FilteredItem from "@/components/workout/FilteredItem";

export default function workoutScreen() {
  const router = useRouter();
  // * Mocks
  const planos = [
    { id: 1, name: "Plano A" },
    { id: 2, name: "Plano B" },
    { id: 3, name: "Plano C" },
    { id: 4, name: "Plano D" },
    { id: 5, name: "Plano E" },
    { id: 6, name: "Plano F" },
  ];

  const exerciseMocks = [
    // --- PEITO ---
    { id: 1, name: "Supino Reto com Barra", focusArea: "Peito" },
    { id: 2, name: "Supino Inclinado com Halteres", focusArea: "Peito" },
    { id: 3, name: "Crossover no Cabo", focusArea: "Peito" },
    { id: 4, name: "Crucifixo no Cabo", focusArea: "Peito" }, // Novo do Treino 1
    { id: 5, name: "Supino com Halteres", focusArea: "Peito" }, // Novo do Treino 4

    // --- COSTAS ---
    { id: 6, name: "Remada Curvada com Barra", focusArea: "Costas" },
    { id: 7, name: "Puxada Frontal (Lat Pulldown)", focusArea: "Costas" },
    { id: 8, name: "Remada Sentada (Cabo)", focusArea: "Costas" }, // Novo do Treino 2
    { id: 9, name: "Remada Curvada (Máquina)", focusArea: "Costas" }, // Novo do Treino 4
    { id: 10, name: "Hiperextensão Lombar", focusArea: "Costas" }, // Mantenho este como extra
    { id: 11, name: "Barra Fixa (Pull-up)", focusArea: "Costas" }, // Adicional
    
    // --- BÍCEPS ---
    { id: 12, name: "Rosca Direta com Barra W", focusArea: "Bíceps" }, // Novo do Treino 2
    { id: 13, name: "Rosca Martelo", focusArea: "Bíceps" }, // Novo do Treino 2
    { id: 14, name: "Rosca Concentrada", focusArea: "Bíceps" }, // Novo do Treino 5
    { id: 15, name: "Rosca Scott", focusArea: "Bíceps" }, // Novo do Treino 5
    
    // --- TRÍCEPS ---
    { id: 16, name: "Tríceps Testa", focusArea: "Tríceps" },
    { id: 17, name: "Extensão de Tríceps na Polia", focusArea: "Tríceps" }, // Novo do Treino 1
    { id: 18, name: "Coice (Kickback)", focusArea: "Tríceps" }, // Novo do Treino 5
    { id: 19, name: "Mergulho (Dips) na Máquina", focusArea: "Tríceps" }, // Adicional

    // --- OMBRO ---
    { id: 20, name: "Desenvolvimento com Halteres", focusArea: "Ombro" }, // Novo do Treino 1
    { id: 21, name: "Elevação Lateral", focusArea: "Ombro" }, // Novo do Treino 1
    { id: 22, name: "Elevação Frontal com Halteres", focusArea: "Ombro" }, // Novo do Treino 5
    { id: 23, name: "Desenvolvimento Militar (Barra)", focusArea: "Ombro" }, // Novo do Treino 4
    
    // --- PERNAS (Quadríceps e Glúteos) ---
    { id: 24, name: "Agachamento Livre", focusArea: "Quadríceps" }, // Novo do Treino 3
    { id: 25, name: "Leg Press 45°", focusArea: "Quadríceps" }, // Novo do Treino 3
    { id: 26, name: "Cadeira Extensora", focusArea: "Quadríceps" }, // Novo do Treino 3
    { id: 27, name: "Agachamento taça (Goblet Squat)", focusArea: "Pernas" }, // Novo do Treino 4
    
    // --- PERNAS (Posterior e Glúteos) ---
    { id: 28, name: "Stiff com Halteres", focusArea: "Posterior/Glúteos" }, // Novo do Treino 3
    { id: 29, name: "Levantamento Terra (Deadlift)", focusArea: "Posterior/Glúteos" }, // Mantenho este como extra
    { id: 30, name: "Cadeira Flexora", focusArea: "Posterior" }, // Novo do Treino 3
    { id: 31, name: "Elevação de Panturrilha Sentado", focusArea: "Panturrilha" }, // Novo do Treino 3
];

  const mockWorkouts = [
    // 1. TREINO A - EMPURRAR (Push)
    {
      id: 1,
      title: "Peito, Ombro e Tríceps",
      duration: 60,
      numExercises: 6,
      focusAreas: "Peito, Ombro, Tríceps",
      exercises: [
        {
          id: 101,
          name: "Supino Reto com Barra",
          focusArea: "Peito",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 102,
          name: "Desenvolvimento com Halteres",
          focusArea: "Ombro",
          totalSets: 4,
          totalReps: 12,
        },
        {
          id: 103,
          name: "Crossover (Cabo)",
          focusArea: "Peito",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 104,
          name: "Elevação Lateral",
          focusArea: "Ombro",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 105,
          name: "Tríceps Testa",
          focusArea: "Tríceps",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 106,
          name: "Extensão de Tríceps na Polia",
          focusArea: "Tríceps",
          totalSets: 3,
          totalReps: 12,
        },
      ],
    },

    // 2. TREINO B - PUXAR (Pull)
    {
      id: 2,
      title: "Costas e Bíceps",
      duration: 55,
      numExercises: 5,
      focusAreas: "Costas, Bíceps, Antebraço",
      exercises: [
        {
          id: 201,
          name: "Puxada Frontal (Lat Pulldown)",
          focusArea: "Costas",
          totalSets: 4,
          totalReps: 12,
        },
        {
          id: 202,
          name: "Remada Curvada com Barra",
          focusArea: "Costas",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 203,
          name: "Remada Sentada (Cabo)",
          focusArea: "Costas",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 204,
          name: "Rosca Direta com Barra W",
          focusArea: "Bíceps",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 205,
          name: "Rosca Martelo",
          focusArea: "Bíceps",
          totalSets: 3,
          totalReps: 15,
        },
      ],
    },

    // 3. TREINO C - PERNAS (Legs)
    {
      id: 3,
      title: "Pernas e Glúteos",
      duration: 70,
      numExercises: 6,
      focusAreas: "Quadríceps, Glúteos, Posterior, Panturrilha",
      exercises: [
        {
          id: 301,
          name: "Agachamento Livre",
          focusArea: "Quadríceps",
          totalSets: 5,
          totalReps: 8,
        },
        {
          id: 302,
          name: "Leg Press 45°",
          focusArea: "Quadríceps",
          totalSets: 4,
          totalReps: 12,
        },
        {
          id: 303,
          name: "Stiff com Halteres",
          focusArea: "Posterior/Glúteos",
          totalSets: 4,
          totalReps: 10,
        },
        {
          id: 304,
          name: "Cadeira Extensora",
          focusArea: "Quadríceps",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 305,
          name: "Cadeira Flexora",
          focusArea: "Posterior",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 306,
          name: "Elevação de Panturrilha Sentado",
          focusArea: "Panturrilha",
          totalSets: 4,
          totalReps: 20,
        },
      ],
    },

    // 4. TREINO D - CORPO TOTAL (Full Body)
    {
      id: 4,
      title: "Full Body",
      duration: 45,
      numExercises: 4,
      focusAreas: "Peito, Costas, Pernas, Ombro",
      exercises: [
        {
          id: 401,
          name: "Supino com Halteres",
          focusArea: "Peito",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 402,
          name: "Remada Curvada (Máquina)",
          focusArea: "Costas",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 403,
          name: "Agachamento taça (Goblet Squat)",
          focusArea: "Pernas",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 404,
          name: "Desenvolvimento Militar (Barra)",
          focusArea: "Ombro",
          totalSets: 3,
          totalReps: 8,
        },
      ],
    },

    // 5. TREINO E - FOCO EM ISOLAMENTO
    {
      id: 5,
      title: "Braços e Isolamento",
      duration: 40,
      numExercises: 4,
      focusAreas: "Bíceps, Tríceps, Ombro (lateral)",
      exercises: [
        {
          id: 501,
          name: "Rosca Concentrada",
          focusArea: "Bíceps",
          totalSets: 3,
          totalReps: 10,
        },
        {
          id: 502,
          name: "Coice (Kickback)",
          focusArea: "Tríceps",
          totalSets: 3,
          totalReps: 15,
        },
        {
          id: 503,
          name: "Elevação Frontal com Halteres",
          focusArea: "Ombro",
          totalSets: 3,
          totalReps: 12,
        },
        {
          id: 504,
          name: "Rosca Scott",
          focusArea: "Bíceps",
          totalSets: 3,
          totalReps: 10,
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<"treino" | "exercicios">("treino");
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (tab: "treino" | "exercicios") => {
    setActiveTab(tab);
  };

  const handlePlanSelect = (id: number) => {
    setSelectedPlanId(id);
  };

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

  // Função que envia os dados no escopo do WorkoutScreen:
const handleNavigateToDetails = (workoutData: typeof mockWorkouts[0]) => {
  // Serializa APENAS O TREINO CLICADO
  const workoutDataString = JSON.stringify(workoutData); 
  
  router.push({
    pathname: "/workout/workoutInfoScreen",
    params: { 
        workoutData: workoutDataString // Envia apenas a string do treino atual
    },
  });
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

      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Seletor de abas */}
            <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Aba "treino" */}
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
                <Button
                  title="Adicionar plano"
                  icon="add"
                  dashBorder
                  onPress={() => null}
                  borderColor={Colors.subtext}
                  radius={10}
                  color={Colors.subtext}
                  bgColor="transparent"
                />

                {/* Container de treinos */}
                <View style={{ marginTop: Spacing.md }}>
                  <Text style={Texts.subtitle}>Meus treinos</Text>
                  <View style={{ gap: Spacing.md }}>
                    {/* // TODO COMPONENTE INCOMPLETO */}
                    {mockWorkouts.map((workout) => (
                      <WorkoutCard
                        key={workout.id}
                        onPress={() => handleNavigateToDetails(workout)}
                        focusAreas={workout.focusAreas}
                        title={workout.title}
                        duration={workout.duration}
                        numExercises={workout.numExercises}
                      />
                    ))}
                    {/* // TODO COMPONENTE INCOMPLETO */}
                    <Button
                      title="Adicionar treino"
                      icon="add"
                      dashBorder
                      onPress={() => null}
                      borderColor={Colors.subtext}
                      radius={10}
                      color={Colors.subtext}
                      bgColor="transparent"
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Aba "exercicios" */}
            {activeTab === "exercicios" && (
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
                      onPress={() => router.push("/(tabs)/workout/exerciseScreen")}
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
                        {selectedFocusAreas.length > 0
                          ? `(${listaItens})`
                          : null}
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
            )}
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
