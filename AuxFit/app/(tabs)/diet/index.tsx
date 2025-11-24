import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import MacrosProgress from "@/components/diet/MacrosProgress";
import WaterProgress from "@/components/diet/WaterProgress";
import Meal, { FoodDisplayItem } from "@/components/diet/Meal";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacrosDonutLegend from "@/components/diet/MacrosDonutLegend";
import MacrosTable from "@/components/diet/MacrosTable";
import AddBtn from "@/components/universal/AddBtn";
import CreateMealModal from "@/components/diet/CreateMealModal";
import EditMealModal from "@/components/diet/EditMealModal";
import { api } from "@/services/api";
// Importação da calculadora de nutrição
import { calculateMacros, Macros } from "@/utils/nutritionCalculator";

interface Alimento {
  id: number;
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  unidade_base: string;
}

interface MealItem {
  id: number;
  quantidade: number;
  unidade_medida: string;
  alimentos: Alimento;
}

interface MealData {
  id: number;
  nome: string;
  horario?: string;
  meta_calorias?: number;
  tipo_refeicao?: string;
  refeicao_itens: MealItem[];
}

export default function DietScreen() {
  const router = useRouter();

  const [meals, setMeals] = useState<MealData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMacro, setIsMacro] = useState(true);

  // Estado para Água
  const [waterConsumed, setWaterConsumed] = useState(0);

  // Estados dos Modais
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [mealToEdit, setMealToEdit] = useState<MealData | null>(null);

  // Estado para controlar quais refeições foram concluídas (Array de IDs)
  const [completedMealIds, setCompletedMealIds] = useState<number[]>([]);

  const [dailyTotals, setDailyTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    logs: 0,
  });

  // Metas calculadas dinamicamente (Estado inicial padrão)
  const [goals, setGoals] = useState<Macros>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 60,
  });

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    calculateTotals(meals, completedMealIds);
  }, [meals, completedMealIds]);

  const fetchData = async () => {
    try {
      // Carrega refeições, água e perfil do usuário em paralelo
      const [mealsData, waterData, userData] = await Promise.all([
        api.getMeals().catch(() => []),
        api.getTodayWaterProgress().catch(() => null),
        api.me().catch(() => null),
      ]);

      // 1. Configura Refeições
      setMeals(mealsData);

      // 2. Configura Água e Peso Atual
      let currentWeight = 0;
      if (waterData) {
        setWaterConsumed(waterData.agua_ml || 0);
        currentWeight = Number(waterData.peso) || 0;
      }

      // 3. Calcula Metas de Macros com base no Perfil
      if (userData) {
        // Se não tiver peso no registro de hoje, usa o peso inicial do perfil
        if (currentWeight === 0) {
            currentWeight = Number(userData.peso_inicial) || 70;
        }

        const profileData = {
            sexo: userData.sexo || 'M',
            data_nascimento: userData.data_nascimento || new Date().toISOString(),
            altura: Number(userData.altura) || 170,
            peso: currentWeight,
            nivel_atividade: userData.nivel_atividade || 'moderado',
            objetivo: userData.objetivo || 'manter'
        };

        const calculated = calculateMacros(profileData);
        setGoals(calculated);
      }

    } catch (error) {
      console.error("Erro ao carregar dados da dieta", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS DE ÁGUA ---
  const handleAddWater = async (amount: number) => {
    try {
      const updated = await api.updateWaterProgress(amount);
      setWaterConsumed(updated.agua_ml);
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar água.");
    }
  };

  // --- HANDLERS DE CRIAÇÃO / EDIÇÃO / REMOÇÃO DE REFEIÇÃO ---

  const handleCreateMeal = async (data: {
    nome: string;
    horario: string;
    tipo_refeicao: string;
  }) => {
    try {
      await api.createMeal(data);
      Alert.alert("Sucesso", "Refeição criada!");
      fetchData();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a refeição.");
    }
  };

  const handleOpenEditModal = (meal: MealData) => {
    setMealToEdit(meal);
    setIsEditModalVisible(true);
  };

  const handleUpdateMeal = async (id: number, data: any) => {
    try {
      await api.updateMeal(id, data);
      Alert.alert("Sucesso", "Refeição atualizada!");
      fetchData();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar.");
    }
  };

  const handleDeleteMeal = async (id: number) => {
    try {
      await api.deleteMeal(id);
      Alert.alert("Sucesso", "Refeição excluída.");
      // Remove da lista de completados para não somar mais
      setCompletedMealIds((prev) => prev.filter((mId) => mId !== id));
      fetchData();
    } catch (error) {
      Alert.alert("Erro", "Falha ao excluir.");
    }
  };

  // --- LÓGICA DE CÁLCULOS E DISPLAY ---

  const handleMealComplete = (mealId: number) => {
    setCompletedMealIds((prev) => [...prev, mealId]);
  };

  const handleMealUncomplete = (mealId: number) => {
    setCompletedMealIds((prev) => prev.filter((id) => id !== mealId));
  };

  const getAlimentoData = (alimentos: any) => {
    if (Array.isArray(alimentos)) return alimentos[0];
    return alimentos;
  };

  const calculateTotals = (mealsData: MealData[], completedIds: number[]) => {
    let totalCals = 0;
    let totalProt = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalLogs = completedIds.length;

    mealsData.forEach((meal) => {
      // SÓ SOMA SE O ID DA REFEIÇÃO ESTIVER NA LISTA DE CONCLUÍDOS
      if (completedIds.includes(meal.id) && meal.refeicao_itens) {
        meal.refeicao_itens.forEach((item) => {
          const alimento = getAlimentoData(item.alimentos);
          if (alimento) {
            const factor = item.quantidade / 100;
            totalCals += (alimento.calorias || 0) * factor;
            totalProt += (alimento.proteinas || 0) * factor;
            totalCarbs += (alimento.carboidratos || 0) * factor;
            totalFats += (alimento.gorduras || 0) * factor;
          }
        });
      }
    });

    setDailyTotals({
      calories: Math.round(totalCals),
      protein: Math.round(totalProt),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats),
      logs: totalLogs,
    });
  };

  const getMealDisplayData = (meal: MealData): FoodDisplayItem[] => {
    if (!meal.refeicao_itens) return [];

    return meal.refeicao_itens.map((item) => {
      const alimento = getAlimentoData(item.alimentos);
      const factor = item.quantidade / 100;
      const cals = alimento ? alimento.calorias * factor : 0;

      return {
        id: item.id,
        foodId: alimento ? alimento.id : 0,
        name: alimento?.nome || "Item Carregando...",
        quantity: item.quantidade,
        unit: item.unidade_medida || "g",
        calories: cals,
        protein: alimento ? alimento.proteinas * factor : 0,
        carbs: alimento ? alimento.carboidratos * factor : 0,
        fats: alimento ? alimento.gorduras * factor : 0,
        baseUnit: alimento ? alimento.unidade_base : "g",
      };
    });
  };

  const getMealSummary = (meal: MealData) => {
    const items = getMealDisplayData(meal);
    const totalCals = items.reduce((acc, curr) => acc + curr.calories, 0);
    const totalProt = items.reduce((acc, curr) => acc + (curr.protein || 0), 0);
    const totalCarbs = items.reduce((acc, curr) => acc + (curr.carbs || 0), 0);
    const totalFats = items.reduce((acc, curr) => acc + (curr.fats || 0), 0);

    return {
      id: meal.id,
      mealName: meal.nome,
      calories: Math.round(totalCals),
      totalProtein: Math.round(totalProt),
      totalCarbs: Math.round(totalCarbs),
      totalFats: Math.round(totalFats),
      meta_calorias: meal.meta_calorias,
      foodItems: items,
    };
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            
            {/* Painel de Macros e Água */}
            <View style={{ gap: Spacing.md }}>
              <Text style={Texts.subtitle}>Progresso do dia</Text>
              <View style={styles.macroWaterprogressContainer}>
                <View style={{ display: isMacro ? "flex" : "none" }}>
                  <MacrosProgress
                    caloriesGoal={goals.calories}
                    logs={dailyTotals.logs}
                    caloriesIngested={dailyTotals.calories}
                    proteinGoal={goals.protein}
                    proteinCurrent={dailyTotals.protein}
                    carbsGoal={goals.carbs}
                    carbsCurrent={dailyTotals.carbs}
                    fatsGoal={goals.fats}
                    fatsCurrent={dailyTotals.fats}
                  />
                </View>

                <View style={{ display: isMacro ? "none" : "flex" }}>
                  <WaterProgress
                    currentWater={waterConsumed}
                    onAddWater={handleAddWater}
                  />
                </View>

                <View style={styles.dotsContainer}>
                  <Pressable
                    onPress={() => setIsMacro(true)}
                    hitSlop={15}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: isMacro
                          ? Colors.primary
                          : Colors.subtext,
                      },
                    ]}
                  />
                  <Pressable
                    onPress={() => setIsMacro(false)}
                    hitSlop={15}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: isMacro
                          ? Colors.subtext
                          : Colors.primary,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Lista de Refeições */}
            <View style={styles.mealsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: Spacing.sm,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={Texts.subtitle}>Refeições</Text>
                <AddBtn
                  onPress={() => setIsCreateModalVisible(true)}
                  size={30}
                />
              </View>

              {loading ? (
                <ActivityIndicator color={Colors.primary} />
              ) : meals.length > 0 ? (
                meals.map((meal) => (
                  <Meal
                    key={meal.id}
                    name={meal.nome}
                    metaCalories={meal.meta_calorias}
                    foodItems={getMealDisplayData(meal)}
                    isCompleted={completedMealIds.includes(meal.id)}
                    increaseLogs={() => handleMealComplete(meal.id)}
                    decreaseLogs={() => handleMealUncomplete(meal.id)}
                    onPress={() =>
                      router.push({
                        pathname: "/diet/mealScreen",
                        params: {
                          data: JSON.stringify(getMealSummary(meal)),
                        },
                      })
                    }
                    onAddFood={() =>
                      router.push({
                        pathname: "/diet/foodSearchScreen",
                        params: { mealId: meal.id },
                      })
                    }
                    onFoodPress={(foodItem) =>
                      router.push({
                        pathname: "/diet/foodScreen",
                        params: {
                          data: JSON.stringify({
                            ...foodItem,
                            mealId: meal.id,
                          }),
                        },
                      })
                    }
                    onEdit={() => handleOpenEditModal(meal)}
                  />
                ))
              ) : (
                <Text
                  style={{
                    color: Colors.subtext,
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  Nenhuma refeição cadastrada. {"\n"} Clique no + para começar.
                </Text>
              )}
            </View>

            {/* Gráficos de Nutrientes (Donut) */}
            <View style={{ gap: Spacing.md }}>
              <Text style={Texts.subtitle}>Divisão Diária (Meta)</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MacrosDonutLegend
                  protein={goals.protein}
                  carbs={goals.carbs}
                  fats={goals.fats}
                />
                <MacroDonutChart
                  protein={goals.protein}
                  carbs={goals.carbs}
                  fats={goals.fats}
                />
              </View>
            </View>

            {/* Tabela de Nutrientes */}
            <View style={{ gap: Spacing.md }}>
              <View>
                <Text style={Texts.subtitle}>Tabela nutricional</Text>
                <Text style={Texts.subtext}>
                  Soma de todos os nutrientes (Meta)
                </Text>
              </View>
              <MacrosTable
                calories={goals.calories}
                protein={goals.protein}
                carbs={goals.carbs}
                fats={goals.fats}
              />
            </View>

            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modais */}
      <CreateMealModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSave={handleCreateMeal}
      />

      <EditMealModal
        visible={isEditModalVisible}
        meal={mealToEdit}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleUpdateMeal}
        onDelete={handleDeleteMeal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingTop: 24, paddingBottom: 100, gap: Spacing.xl },
  macroWaterprogressContainer: {
    backgroundColor: Colors.bgMedium,
    borderRadius: 20,
    justifyContent: "space-evenly",
    paddingBottom: Spacing.sm,
  },
  dotsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
  },
  dot: { width: 10, height: 10, borderRadius: 10 },
  mealsContainer: { gap: Spacing.md },
  macroTableContainer: { gap: Spacing.md },
});