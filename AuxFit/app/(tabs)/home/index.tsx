import React, { useState, useCallback, useEffect } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useFocusEffect } from "expo-router";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";
import WaterProgress from "@/components/diet/WaterProgress";
import MacrosProgress from "@/components/diet/MacrosProgress";
import WorkoutCard from "@/components/workout/WorkoutCard";
import Header from "@/components/universal/Header";
import getFormattedDate from "@/utils/getFormattedDate";
import Meal from "@/components/diet/Meal"; 
import EditMealModal from "@/components/diet/EditMealModal";

// Importações da API e Storage
import { api } from "@/services/api";
import { authStorage } from "@/services/auth-storage";
import { calculateMacros, Macros } from "@/utils/nutritionCalculator";

export default function HomeScreen() {
  const router = useRouter();

  // --- ESTADOS DO BACKEND ---
  const [userName, setUserName] = useState("Usuário");
  const [currentWater, setCurrentWater] = useState(0);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [nextMeal, setNextMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE DIETA E MACROS ---
  const [completedMealIds, setCompletedMealIds] = useState<number[]>([]);
  
  // Metas calculadas dinamicamente (estado inicial padrão)
  const [macroGoals, setMacroGoals] = useState<Macros>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 65,
  });

  const [dailyTotals, setDailyTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    logs: 0 
  });

  // --- ESTADOS VISUAIS ---
  const [isMacro, setIsMacro] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [mealToEdit, setMealToEdit] = useState<any>(null);

  // --- FUNÇÕES AUXILIARES ---
  const getAlimentoData = (alimentos: any) => {
    if (Array.isArray(alimentos)) return alimentos[0];
    return alimentos;
  };

  // Transforma os dados para o formato visual
  const getMealDisplayData = (meal: any) => {
    if (!meal || !meal.refeicao_itens) return [];

    return meal.refeicao_itens.map((item: any) => {
       const alimento = getAlimentoData(item.alimentos);
       const factor = item.quantidade / 100; 
       const cals = alimento ? (alimento.calorias * factor) : 0;
       
       return {
           id: item.id, 
           foodId: alimento ? alimento.id : 0,
           name: alimento?.nome || "Item Carregando...",
           quantity: item.quantidade,
           unit: item.unidade_medida || "g",
           calories: cals,
           protein: alimento ? (alimento.proteinas * factor) : 0,
           carbs: alimento ? (alimento.carboidratos * factor) : 0,
           fats: alimento ? (alimento.gorduras * factor) : 0,
           baseUnit: alimento ? alimento.unidade_base : 'g'
       };
    });
  };

  const getMealSummary = (meal: any) => {
     const items = getMealDisplayData(meal);
     const totalCals = items.reduce((acc: number, curr: any) => acc + curr.calories, 0);
     
     const totalProt = items.reduce((acc: number, curr: any) => acc + (curr.protein || 0), 0);
     const totalCarbs = items.reduce((acc: number, curr: any) => acc + (curr.carbs || 0), 0);
     const totalFats = items.reduce((acc: number, curr: any) => acc + (curr.fats || 0), 0);

     return {
        id: meal.id,
        mealName: meal.nome,
        calories: Math.round(totalCals), 
        meta_calorias: meal.meta_calorias,
        totalProtein: Math.round(totalProt),
        totalCarbs: Math.round(totalCarbs),
        totalFats: Math.round(totalFats),
        foodItems: items
     };
  };

  // --- CÁLCULO DE TOTAIS DIÁRIOS ---
  const calculateTotals = (mealsData: any[], completedIds: number[]) => {
    let totalCals = 0;
    let totalProt = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalLogs = completedIds.length;

    mealsData.forEach(meal => {
      if (completedIds.includes(meal.id) && meal.refeicao_itens) {
        meal.refeicao_itens.forEach((item: any) => {
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
      logs: totalLogs
    });
  };

  useEffect(() => {
    calculateTotals(meals, completedMealIds);
  }, [meals, completedMealIds]);

  // --- BUSCA DE DADOS ---
  const fetchData = async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) {
        setLoading(false);
        return; 
      }

      const [userData, waterData, workoutsData, mealsData] = await Promise.all([
        api.me().catch(() => null),                     
        api.getTodayWaterProgress().catch(() => null), 
        api.getWorkouts().catch(() => []),             
        api.getMeals().catch(() => [])                 
      ]);

      if (userData) {
        setUserName(userData.nome?.split(" ")[0] || "Usuário"); 

        // --- CALCULAR MACROS RECOMENDADOS ---
        // Usa o peso de hoje se disponível, senão o peso inicial
        const currentWeight = (waterData?.peso && Number(waterData.peso) > 0)
            ? Number(waterData.peso)
            : Number(userData.peso_inicial);

        const profileData = {
            sexo: userData.sexo || 'M',
            data_nascimento: userData.data_nascimento || new Date().toISOString(),
            altura: Number(userData.altura) || 170,
            peso: currentWeight || 70,
            nivel_atividade: userData.nivel_atividade || 'moderado',
            objetivo: userData.objetivo || 'manter'
        };

        const calculatedGoals = calculateMacros(profileData);
        setMacroGoals(calculatedGoals);
      }

      if (waterData) {
        setCurrentWater(waterData.agua_ml || 0);
      }

      if (workoutsData) {
        setUserWorkouts(workoutsData);
      }

      if (mealsData) {
        setMeals(mealsData);
        if (mealsData.length > 0) {
            findNextMeal(mealsData);
        } else {
            setNextMeal(null);
        }
      }

    } catch (error) {
      console.log("Erro ao carregar Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const findNextMeal = (mealsList: any[]) => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeValue = currentHours * 60 + currentMinutes;

    const sortedMeals = [...mealsList].sort((a, b) => {
      if (!a.horario || !b.horario) return 0;
      const [hA, mA] = a.horario.split(':').map(Number);
      const [hB, mB] = b.horario.split(':').map(Number);
      return (hA * 60 + mA) - (hB * 60 + mB);
    });

    const next = sortedMeals.find(meal => {
        if (!meal.horario) return false;
        const [h, m] = meal.horario.split(':').map(Number);
        const mealTimeValue = h * 60 + m;
        return mealTimeValue > currentTimeValue;
    });

    setNextMeal(next || sortedMeals[0]);
  };

  // --- HANDLERS ---

  const handleUpdateWater = async (amount: number) => {
    try {
      const newWater = Math.max(0, currentWater + amount);
      setCurrentWater(newWater);
      await api.updateWaterProgress(amount);
    } catch (error) {
      console.error("Erro ao atualizar água:", error);
      setCurrentWater((prev) => prev - amount); 
    }
  };

  const handleMealComplete = (mealId: number) => {
    setCompletedMealIds(prev => [...prev, mealId]);
  };

  const handleMealUncomplete = (mealId: number) => {
    setCompletedMealIds(prev => prev.filter(id => id !== mealId));
  };
  
  const handleNavigateToDetails = (workoutData: any) => {
    router.push({
      pathname: "/workout/workoutInfoScreen",
      params: {
        workoutData: JSON.stringify(workoutData),
      },
    });
  };

  const handleOpenEditModal = (meal: any) => {
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
        setCompletedMealIds(prev => prev.filter(mId => mId !== id));
        fetchData(); 
    } catch (error) {
        Alert.alert("Erro", "Falha ao excluir.");
    }
  };

  const date = getFormattedDate();

  if (loading) {
      return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg}}>
              <ActivityIndicator size="large" color={Colors.primary} />
          </View>
      )
  }

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
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>

            <View>
              <Button onPress={() => router.push("/onboarding/diet/restrictionsScreen")} title="Dieta"/>
            </View>
            
            <Header
              title={`Olá, ${userName}`}
              subtitle={date}
              subtitleColor={Colors.text}
            />

            <View style={{ gap: Spacing.md }}>
              <Text style={Texts.subtitle}>Progresso do dia</Text>
              <View style={styles.macroWaterprogressContainer}>
                <View style={{ display: isMacro ? "flex" : "none" }}>
                  <MacrosProgress
                    // Props dinâmicas com os valores calculados
                    caloriesGoal={macroGoals.calories}
                    caloriesIngested={dailyTotals.calories}
                    logs={dailyTotals.logs}
                    proteinGoal={macroGoals.protein}
                    proteinCurrent={dailyTotals.protein}
                    carbsGoal={macroGoals.carbs}
                    carbsCurrent={dailyTotals.carbs}
                    fatsGoal={macroGoals.fats}
                    fatsCurrent={dailyTotals.fats}
                  />
                </View>
                <View style={{ display: isMacro ? "none" : "flex" }}>
                  <WaterProgress 
                    currentWater={currentWater} 
                    onAddWater={handleUpdateWater} 
                  />
                </View>
                <View style={styles.dotsContainer}>
                  <Pressable
                    onPress={() => setIsMacro(true)}
                    hitSlop={15}
                    style={[styles.dot, { backgroundColor: isMacro ? Colors.primary : Colors.subtext }]}
                  />
                  <Pressable
                    onPress={() => setIsMacro(false)}
                    hitSlop={15}
                    style={[styles.dot, { backgroundColor: isMacro ? Colors.subtext : Colors.primary }]}
                  />
                </View>
              </View>
            </View>

            <View>
              <Text style={Texts.subtitle}>Próxima refeição</Text>
              <View>
                {nextMeal ? (
                    <Meal
                      name={`${nextMeal.nome}`}
                      metaCalories={nextMeal.meta_calorias || 0}
                      foodItems={getMealDisplayData(nextMeal)}
                      
                      isCompleted={completedMealIds.includes(nextMeal.id)}
                      increaseLogs={() => handleMealComplete(nextMeal.id)}
                      decreaseLogs={() => handleMealUncomplete(nextMeal.id)}
                      
                      onPress={() =>
                          router.push({
                          pathname: "/diet/mealScreen",
                          params: {
                              mealId: nextMeal.id,
                              data: JSON.stringify(getMealSummary(nextMeal)),
                          },
                          })
                      }
                      
                      onAddFood={() => 
                        router.push({
                          pathname: "/diet/foodSearchScreen",
                          params: { mealId: nextMeal.id }
                        })
                      }

                      onFoodPress={(foodItem) => 
                         router.push({
                           pathname: "/diet/foodScreen",
                           params: { 
                              data: JSON.stringify({
                                  ...foodItem,
                                  mealId: nextMeal.id
                              }) 
                           }
                         })
                      }

                      onEdit={() => handleOpenEditModal(nextMeal)}
                    />
                ) : (
                    <View style={{padding: 20, backgroundColor: Colors.bgMedium, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={[Texts.body, {color: Colors.subtext}]}>Nenhuma refeição cadastrada.</Text>
                        <Pressable onPress={() => router.push("/(tabs)/diet")}>
                            <Text style={[Texts.bodyBold, {color: Colors.primary, marginTop: 5}]}>Criar refeição</Text>
                        </Pressable>
                    </View>
                )}
              </View>
            </View>

            <View style={{ gap: Spacing.md }}>
              <Text style={Texts.subtitle}>Meus treinos</Text>
              {userWorkouts.length > 0 ? (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12 }}
                    style={{ gap: Spacing.sm, flexDirection: "row" }}
                  >
                    {userWorkouts.map((workout: any) => (
                      <WorkoutCard
                        key={workout.id}
                        onPress={() => handleNavigateToDetails(workout)}
                        focusAreas={Array.isArray(workout.areas_foco) ? workout.areas_foco.join(", ") : workout.areas_foco || "Geral"}
                        title={workout.nome}
                        duration={workout.duracao}
                        numExercises={workout.treino_exercicios ? workout.treino_exercicios.length : 0}
                      />
                    ))}
                  </ScrollView>
              ) : (
                  <View style={{padding: 20, backgroundColor: Colors.bgMedium, borderRadius: 10}}>
                      <Text style={{color: Colors.subtext}}>Você ainda não criou nenhum treino.</Text>
                  </View>
              )}
              <View style={{ paddingHorizontal: 32 }}>
                <Button
                  title="Explorar exercícios"
                  bgColor={Colors.accent}
                  onPress={() => router.push("/(tabs)/workout/searchExerciseScreen")}
                />
              </View>
            </View>

            <View style={styles.widgetsContainer}>
              <View>
                <Text style={[Texts.subtitle, { color: Colors.primary }]}>Widgets AuxFit</Text>
                <Text style={Texts.body}>Acompanhe os seus registros de forma rápida e direta na sua tela inicial</Text>
              </View>
              <View style={{ paddingHorizontal: 32 }}>
                <Button title="Adicionar widgets" icon="add" onPress={() => null} />
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
  scrollContent: { paddingTop: 24, paddingBottom: 100, gap: Spacing.lg },
  macroWaterprogressContainer: { backgroundColor: Colors.bgMedium, borderRadius: 20, justifyContent: "space-evenly", paddingBottom: Spacing.sm },
  dotsContainer: { flex: 1, flexDirection: "row", justifyContent: "center", gap: Spacing.md },
  dot: { width: 10, height: 10, borderRadius: 10 },
  exploreExercices: { padding: Spacing.sm, backgroundColor: Colors.bgMedium },
  weightInContainer: { backgroundColor: Colors.bgMedium, borderRadius: 10 },
  widgetsContainer: { backgroundColor: Colors.bgMedium, borderRadius: 10, gap: Spacing.md, padding: Spacing.md },
});