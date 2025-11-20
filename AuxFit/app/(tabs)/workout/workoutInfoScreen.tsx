import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "@/components/universal/Header";
import AddBtn from "@/components/universal/AddBtn";
import ExerciseCard from "@/components/workout/ExerciceCard";
import Button from "@/components/universal/Button";
import { api } from "@/services/api";
import Background from "@/components/universal/Background";
import EditWorkoutItemModal from "@/components/workout/EditWorkoutItemModal";

interface Workout {
  id: number;
  nome: string;
  duracao: number;
  ativo: boolean;
  areas_foco: string[];
}

interface WorkoutItem {
  id: number;
  treino_fk: number;
  exercicio_fk: number;
  series: number;
  repeticoes: number;
  carga: number;
  descanso_segundos: number;
  exercicios: { 
    id: number;
    nome_exercicio: string;
    grupo_muscular_geral: string;
    imagem_url?: string;
  };
}

export default function workoutInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [workoutItems, setWorkoutItems] = useState<WorkoutItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para Edição
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<WorkoutItem | null>(null);

  useEffect(() => {
    const rawData = params.workoutData;
    const workoutDataString = Array.isArray(rawData) ? rawData[0] : rawData;

    if (workoutDataString) {
      try {
        const parsed = JSON.parse(workoutDataString);
        setWorkout(parsed);
      } catch (e) {
        console.error("Erro parse workout:", e);
      }
    }
  }, [params.workoutData]);

  useFocusEffect(
    useCallback(() => {
      if (workout) {
        fetchExercises();
      }
    }, [workout?.id])
  );

  const fetchExercises = async () => {
    if (!workout) return;
    try {
        setLoading(true);
        const data = await api.getWorkoutExercises(workout.id);
        setWorkoutItems(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  const handleAddExercise = () => {
    if (!workout) return;
    router.push({
        pathname: "/(tabs)/workout/searchExerciseScreen",
        params: { workoutId: workout.id }
    });
  };

  // --- Lógica de Edição ---
  const handleItemPress = (item: WorkoutItem) => {
    setSelectedItemToEdit(item);
    setIsEditModalVisible(true);
  };

  const handleUpdateItem = async (id: number, data: any) => {
    try {
        await api.updateWorkoutItem(id, {
            series: data.series,
            repeticoes: data.repeticoes,
            carga: data.carga,
            descanso_segundos: data.descanso
        });
        Alert.alert("Sucesso", "Exercício atualizado!");
        fetchExercises(); // Recarrega lista
    } catch (error) {
        Alert.alert("Erro", "Falha ao atualizar.");
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
        await api.deleteWorkoutItem(id);
        fetchExercises(); // Recarrega lista
    } catch (error) {
        Alert.alert("Erro", "Falha ao remover.");
    }
  };

  // --- Navegação para Iniciar Treino ---
  const handleStartWorkout = () => {
    if (!workout) return;
    
    // Navega para a tela de execução passando os dados do treino
    router.push({
      pathname: "/workout/ongoingWorkoutScreen",
      params: {
        workoutData: JSON.stringify(workout),
      },
    });
  };

  if (!workout) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.bg }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const focusAreasString = workout.areas_foco && workout.areas_foco.length > 0 
    ? workout.areas_foco.join(", ") 
    : "Geral";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      <Background/>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Header
              backArrow
              title={workout.nome} 
              subtitle={focusAreasString}
              subtitleColor={Colors.accent}
            />

            <View style={{ gap: Spacing.sm }}>
              <View style={styles.workoutOverview}>
                <View style={styles.infoItem}>
                  <MaterialIcons name="alarm" size={20} color={Colors.warning} />
                  <Text style={Texts.bodyBold}>{workout.duracao} minutos</Text>
                </View>
                <View style={styles.infoItem}>
                  <MaterialCommunityIcons name="dumbbell" size={20} color={Colors.secondary} />
                  <Text style={Texts.bodyBold}>
                    {workoutItems.length} exercícios
                  </Text>
                </View>
              </View>
              
              <Button
                title="Iniciar treino"
                onPress={handleStartWorkout} // <--- AQUI ESTÁ A MUDANÇA
              />
            </View>

            <View>
              <View style={styles.listHeader}>
                <Text style={[Texts.subtitle, { marginBottom: Spacing.sm }]}>
                  Exercícios
                </Text>
                <AddBtn
                  onPress={handleAddExercise}
                  size={30}
                />
              </View>

              {loading ? (
                 <ActivityIndicator color={Colors.primary} />
              ) : (
                <View style={{ gap: 12 }}>
                    {workoutItems.map((item) => (
                    <ExerciseCard
                        key={item.id}
                        name={item.exercicios.nome_exercicio}
                        focusArea={item.exercicios.grupo_muscular_geral}
                        imageUrl={item.exercicios.imagem_url}
                        totalSets={item.series} 
                        totalReps={item.repeticoes}
                        onPress={() => handleItemPress(item)} // Abre modal de edição
                    />
                    ))}
                    {workoutItems.length === 0 && (
                        <Text style={{ color: Colors.subtext, textAlign: 'center', marginTop: 20 }}>
                            Nenhum exercício neste treino. Adicione um!
                        </Text>
                    )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Modal de Edição */}
        {selectedItemToEdit && (
            <EditWorkoutItemModal
                visible={isEditModalVisible}
                item={selectedItemToEdit}
                onClose={() => setIsEditModalVisible(false)}
                onSave={handleUpdateItem}
                onDelete={handleDeleteItem}
            />
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    gap: Spacing.xl,
  },
  workoutOverview: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoItem: {
    gap: Spacing.sm,
    alignItems: "center",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
    alignItems: 'center'
  }
});