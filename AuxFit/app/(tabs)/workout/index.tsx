import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/universal/Background";
import TabSelector from "@/components/universal/TabSelector";
import ExerciseCard from "@/components/workout/ExerciceCard";
import WorkoutCard from "@/components/workout/WorkoutCard";
import FilterBtn from "@/components/universal/FilterBtn";
import FilterModal from "@/components/universal/FilterModal";
import InputField from "@/components/universal/InputField";
import FocusArea from "@/components/workout/FocusArea";
import Button from "@/components/universal/Button";
import FilteredItem from "@/components/workout/FilteredItem";
import ManageWorkoutModal from "@/components/workout/ManageWorkoutModal";
import { api } from "@/services/api";

// Interfaces
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

interface Workout {
  id: number;
  nome: string;
  areas_foco: string; // Agora é string vindo do banco
  duracao: number;
  ativo: boolean;
  treino_exercicios?: { id: number }[];
}

interface FocusAreaItem {
  name: string;
  image: string | null;
}

export default function WorkoutScreen() {
  const router = useRouter();

  // Estados Globais
  const [activeTab, setActiveTab] = useState<"treino" | "exercicios">("treino");

  // Estados Exercícios
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados Treinos
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);

  // Estado Modal de Gestão
  const [isManageModalVisible, setIsManageModalVisible] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  // --- CARREGAMENTO DE DADOS ---

  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
    }, [])
  );

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchWorkouts = async () => {
    setLoadingWorkouts(true);
    try {
      const data = await api.getWorkouts();
      // Ordenar por ID para manter a consistência visual
      setWorkouts(data.sort((a: Workout, b: Workout) => a.id - b.id));
    } catch (error) {
      console.error("Erro ao buscar treinos", error);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const fetchExercises = async () => {
    try {
      const data = await api.getExercises();
      setExercises(data);
    } catch (error) {
      console.error("Erro ao buscar exercícios", error);
    } finally {
      setLoadingExercises(false);
    }
  };

  // --- GESTÃO DE TREINOS ---

  const handleOpenCreateModal = () => {
    setEditingWorkout(null);
    setIsManageModalVisible(true);
  };

  const handleOpenEditModal = (workout: Workout) => {
    setEditingWorkout(workout);
    setIsManageModalVisible(true);
  };

  const handleSaveWorkout = async (data: {
    nome: string;
    duracao: number;
    areas_foco: string[];
  }) => {
    try {
      // CONVERSÃO 1: Array -> String para salvar no Banco
      const areasFocoString = data.areas_foco.join(", ");

      if (editingWorkout) {
        await api.updateWorkout(editingWorkout.id, {
          nome: data.nome,
          duracao: data.duracao,
          ativo: editingWorkout.ativo,
          areas_foco: areasFocoString,
        });
        Alert.alert("Sucesso", "Treino atualizado!");
      } else {
        await api.createWorkout({
          nome: data.nome,
          duracao: data.duracao,
          areas_foco: areasFocoString,
          ativo: true,
        });
        Alert.alert("Sucesso", "Treino criado!");
      }
      setIsManageModalVisible(false);
      fetchWorkouts();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o treino.");
      console.error(error);
    }
  };

  const handleNavigateToDetails = (workoutData: Workout) => {
    const workoutDataString = JSON.stringify(workoutData);
    router.push({
      pathname: "/workout/workoutInfoScreen",
      params: { workoutData: workoutDataString },
    });
  };

  // --- FILTROS E HELPERS ---

  const handleFocusAreaToggle = (area: string) => {
    setSelectedFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleRemoveFilteredItem = (itemToRemove: string) => {
    setSelectedFocusAreas((prev) => prev.filter((i) => i !== itemToRemove));
  };

  const listaItens = selectedFocusAreas.join(", ");

  const uniqueGroups = Array.from(
    new Set(exercises.map((e) => e.grupo_muscular_geral))
  ).filter(Boolean);

  const availableFocusAreas: FocusAreaItem[] = uniqueGroups.map((group) => {
    const exerciseWithImage = exercises.find(
      (e) => e.grupo_muscular_geral === group && e.imagem_url
    );
    return { name: group, image: exerciseWithImage?.imagem_url || null };
  });

  const filteredExercises = exercises
    .filter(
      (e) =>
        selectedFocusAreas.length === 0 ||
        selectedFocusAreas.includes(e.grupo_muscular_geral)
    )
    .filter((e) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        e.nome_exercicio.toLowerCase().includes(search) ||
        e.grupo_muscular_geral.toLowerCase().includes(search)
      );
    });

  const modalInitialData = editingWorkout
    ? {
        ...editingWorkout,
        areas_foco: editingWorkout.areas_foco 
            ? editingWorkout.areas_foco.split(",").map(s => s.trim()).filter(Boolean)
            : [],
      }
    : null;

  // --- RENDERIZADORES ---

  const renderSeparator = () => <View style={{ height: 12 }} />;

  const renderTreinoHeader = () => (
    <View style={styles.headerContainer}>
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      
      <View style={{ marginTop: Spacing.md }}>
        <Text style={Texts.subtitle}>Meus treinos</Text>
      </View>
    </View>
  );

  const renderTreinoFooter = () => (
    <View style={{ marginTop: Spacing.md }}>
      <Button
        title="Adicionar treino"
        icon="add"
        onPress={handleOpenCreateModal}
        radius={10}
      />
    </View>
  );

  const renderTreinoItem = ({ item }: { item: Workout }) => {
    // Exibição direta da string (já vem formatada do banco)
    const focusString = item.areas_foco || "Sem foco definido";
    const numExercises = item.treino_exercicios ? item.treino_exercicios.length : 0;

    return (
      <WorkoutCard
        title={item.nome}
        focusAreas={focusString}
        duration={item.duracao}
        numExercises={numExercises}
        editable={true}
        onPress={() => handleNavigateToDetails(item)}
        onEdit={() => handleOpenEditModal(item)}
      />
    );
  };

  const renderExercicioHeader = () => (
    <View style={styles.headerContainer}>
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={{ flexDirection: "row", gap: Spacing.lg }}>
        <InputField
          placeholder="Pesquisar"
          icon="search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <FilterBtn onPress={() => setIsFilterModalVisible(true)} />
      </View>
      <View style={{ flexDirection: "row", gap: Spacing.md, flexWrap: "wrap" }}>
        {selectedFocusAreas.map((area) => (
          <FilteredItem
            key={area}
            name={area}
            onRemove={handleRemoveFilteredItem}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={Texts.subtitle}>Exercícios</Text>
        <Text style={[Texts.subtext, { color: Colors.accent }]}>
          {filteredExercises.length} exercícios
        </Text>
      </View>
    </View>
  );

  const renderExercicioItem = ({ item }: { item: Exercise }) => (
    <ExerciseCard
      name={item.nome_exercicio}
      focusArea={item.grupo_muscular_geral}
      imageUrl={item.imagem_url}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/workout/exerciseScreen",
          params: {
            nome: item.nome_exercicio,
            grupoGeral: item.grupo_muscular_geral,
            grupoEspecifico: item.grupo_muscular_especifico || "",
            descricao: item.descricao || "",
            execucao: item.execucao_passos || "",
            video: item.video_url || "",
          },
        })
      }
    />
  );

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
        <View style={{ flex: 1 }}>
          {activeTab === "treino" ? (
            <FlatList
              data={workouts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTreinoItem}
              ListHeaderComponent={renderTreinoHeader}
              ListFooterComponent={renderTreinoFooter}
              ItemSeparatorComponent={renderSeparator}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() =>
                !loadingWorkouts && (
                  <Text
                    style={[
                      Texts.body,
                      {
                        textAlign: "center",
                        color: Colors.subtext,
                        marginVertical: 20,
                      },
                    ]}
                  >
                    Nenhum treino encontrado. Crie o primeiro!
                  </Text>
                )
              }
            />
          ) : (
            <FlatList
              data={filteredExercises}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderExercicioItem}
              ListHeaderComponent={renderExercicioHeader}
              ListEmptyComponent={() =>
                loadingExercises ? (
                  <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                    style={{ marginTop: 20 }}
                  />
                ) : (
                  <Text
                    style={[
                      Texts.body,
                      {
                        textAlign: "center",
                        marginTop: 20,
                        color: Colors.subtext,
                      },
                    ]}
                  >
                    Nenhum exercício encontrado.
                  </Text>
                )
              }
              ItemSeparatorComponent={renderSeparator}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          )}

          {/* Modais */}
          <ManageWorkoutModal
            visible={isManageModalVisible}
            onClose={() => setIsManageModalVisible(false)}
            onSave={handleSaveWorkout}
            initialData={modalInitialData} 
          />

          <FilterModal
            filterTitle="Filtrar exercícios"
            isFilterVisible={isFilterModalVisible}
            onClose={() => setIsFilterModalVisible(false)}
          >
            <View>
              <Text style={Texts.bodyBold}>
                Áreas de foco{" "}
                <Text style={[Texts.subtext, { color: Colors.accent }]}>
                  {selectedFocusAreas.length > 0 ? `(${listaItens})` : null}
                </Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContent: { paddingVertical: 24 },
  headerContainer: { gap: Spacing.md, marginBottom: 12 },
});