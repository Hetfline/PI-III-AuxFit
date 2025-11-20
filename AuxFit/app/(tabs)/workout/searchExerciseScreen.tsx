import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import ExerciseCard from "@/components/workout/ExerciceCard";
import FocusArea from "@/components/workout/FocusArea";
import FilterBtn from "@/components/universal/FilterBtn";
import FilterModal from "@/components/universal/FilterModal";
import InputField from "@/components/universal/InputField";
import FilteredItem from "@/components/workout/FilteredItem";
import AddExerciseModal from "@/components/workout/AddExerciseModal"; 
import { api } from "@/services/api";

interface Exercise {
  id: number;
  nome_exercicio: string;
  grupo_muscular_geral: string;
  grupo_muscular_especifico?: string;
  descricao?: string;
  execucao_passos?: string;
  video_url?: string;
  imagem_url?: string;
}

interface FocusAreaItem {
  name: string;
  image: string | null;
}

export default function SearchExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 💡 Recebe ID do treino se vier da tela de detalhes
  const workoutIdToAdd = params.workoutId ? Number(params.workoutId) : null;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para o Modal de Adição
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedExerciseToAdd, setSelectedExerciseToAdd] = useState<Exercise | null>(null);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const data = await api.getExercises();
      setExercises(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os exercícios.");
    } finally {
      setLoading(false);
    }
  };

  const handleFocusAreaToggle = (area: string) => {
    setSelectedFocusAreas((prevAreas) => {
      if (prevAreas.includes(area)) {
        return prevAreas.filter((a) => a !== area);
      } else {
        return [...prevAreas, area];
      }
    });
  };

  const handleRemoveFilteredItem = (itemToRemove: string) => {
    setSelectedFocusAreas((prevItems) =>
      prevItems.filter((item) => item !== itemToRemove)
    );
  };

  // --- LÓGICA DE SELEÇÃO (CORRIGIDA) ---
  const handleExercisePress = (exercise: Exercise) => {
    if (workoutIdToAdd) {
        // MODO ADIÇÃO: Abre modal de config se tivermos um ID de treino
        setSelectedExerciseToAdd(exercise);
        setIsAddModalVisible(true);
    } else {
        // MODO VISUALIZAÇÃO: Vai para detalhes se não tiver ID de treino
        router.push({
            pathname: "/(tabs)/workout/exerciseScreen",
            params: { 
              nome: exercise.nome_exercicio,
              grupoGeral: exercise.grupo_muscular_geral,
              grupoEspecifico: exercise.grupo_muscular_especifico || "",
              descricao: exercise.descricao || "",
              execucao: exercise.execucao_passos || "",
              video: exercise.video_url || ""
            }
          });
    }
  };

  const confirmAddExercise = async (config: { series: number; repeticoes: number; carga: number; descanso: number }) => {
    if (!selectedExerciseToAdd || !workoutIdToAdd) return;

    try {
        await api.addExerciseToWorkout({
            treino_fk: workoutIdToAdd,
            exercicio_fk: selectedExerciseToAdd.id,
            series: config.series,
            repeticoes: config.repeticoes,
            carga: config.carga,
            descanso_segundos: config.descanso
        });
        
        Alert.alert("Sucesso", "Exercício adicionado ao treino!");
        router.back(); // Volta para a tela do treino
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Falha ao adicionar exercício.");
    }
  };

  // --- FILTROS ---
  const listaItens = selectedFocusAreas.join(", ");
  const uniqueGroups = Array.from(
    new Set(exercises.map((e) => e.grupo_muscular_geral))
  ).filter(Boolean);

  const availableFocusAreas: FocusAreaItem[] = uniqueGroups.map(group => {
    const exerciseWithImage = exercises.find(
      e => e.grupo_muscular_geral === group && e.imagem_url
    );
    return {
      name: group,
      image: exerciseWithImage?.imagem_url || null
    };
  });

  const filteredExercisesByFocusArea = exercises.filter(
    (exercise) =>
      selectedFocusAreas.length === 0 ||
      selectedFocusAreas.includes(exercise.grupo_muscular_geral)
  );

  const finalFilteredExercises = filteredExercisesByFocusArea.filter(
    (exercise) => {
      if (!searchTerm) return true;
      const lowerCaseSearch = searchTerm.toLowerCase();
      const nameMatches = exercise.nome_exercicio.toLowerCase().includes(lowerCaseSearch);
      const focusAreaMatches = exercise.grupo_muscular_geral.toLowerCase().includes(lowerCaseSearch);
      return nameMatches || focusAreaMatches;
    }
  );

  // --- RENDER ---
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: "row", gap: Spacing.lg }}>
        <InputField
          placeholder="Pesquisar"
          icon="search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <FilterBtn onPress={() => setIsFilterModalVisible((prev) => !prev)} />
      </View>
      
      <View style={{ flexDirection: "row", gap: Spacing.md, flexWrap: "wrap" }}>
        {selectedFocusAreas.map((area) => (
          <FilteredItem key={area} name={area} onRemove={handleRemoveFilteredItem} />
        ))}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={Texts.subtitle}>
            {workoutIdToAdd ? "Selecione para Adicionar" : "Exercícios"}
        </Text>
        <Text style={[Texts.subtext, { color: Colors.accent }]}>
          {finalFilteredExercises.length} exercícios
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: Exercise }) => (
    <ExerciseCard
      name={item.nome_exercicio} 
      focusArea={item.grupo_muscular_geral}
      imageUrl={item.imagem_url}
      // AQUI ESTAVA O ERRO: Você tinha um router.push direto aqui!
      onPress={() => handleExercisePress(item)} 
    />
  );

  const renderEmpty = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />;
    }
    return (
      <Text style={[Texts.body, { textAlign: 'center', marginTop: 20, color: Colors.subtext }]}>
        Nenhum exercício encontrado.
      </Text>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Spacing.md }}>
      <Background />
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <FlatList
          data={finalFilteredExercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ paddingVertical: 24 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        <FilterModal
          filterTitle="Filtrar exercícios"
          isFilterVisible={isFilterModalVisible}
          onClose={() => setIsFilterModalVisible((prev) => !prev)}
        >
          <View>
            <Text style={Texts.bodyBold}>
              Áreas de foco <Text style={[Texts.subtext, { color: Colors.accent }]}>{selectedFocusAreas.length > 0 ? `(${listaItens})` : null}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {availableFocusAreas.map((item) => (
              <FocusArea
                key={item.name}
                focusArea={item.name}
                imageUrl={item.image}
                isSelected={selectedFocusAreas.includes(item.name)}
                onPress={handleFocusAreaToggle}
              />
            ))}
          </View>
        </FilterModal>

        {/* Modal de Adição */}
        {selectedExerciseToAdd && (
            <AddExerciseModal 
                visible={isAddModalVisible}
                exerciseName={selectedExerciseToAdd.nome_exercicio}
                onClose={() => setIsAddModalVisible(false)}
                onSave={confirmAddExercise}
            />
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: Spacing.md,
    marginBottom: 12, 
  },
});