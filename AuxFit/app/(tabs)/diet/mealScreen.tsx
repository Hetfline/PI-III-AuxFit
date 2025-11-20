import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Pressable,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import Header from "@/components/universal/Header";
import getFormattedDate from "@/utils/getFormattedDate";
import ProgressBar from "@/components/universal/ProgressBar";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AddBtn from "@/components/universal/AddBtn";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacrosDonutLegend from "@/components/diet/MacrosDonutLegend";
import MacrosTable from "@/components/diet/MacrosTable";
import { api } from "@/services/api";

interface FoodItem {
  id: number;
  foodId: number;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  baseUnit: string;
}

interface MealData {
  id: number;
  mealName: string;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  calories: number;
  foodItems: FoodItem[];
  meta_calorias?: number; // 1. Adicionado campo opcional para a meta
}

export default function mealScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { data } = params;

  const [mealData, setMealData] = useState<MealData | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (data && !mealData) {
      try {
        const parsedData = JSON.parse(data as string);
        setMealData(parsedData);
      } catch (e) {
        console.error("Erro ao fazer parse inicial:", e);
      }
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      let idToFetch = mealData?.id;

      if (!idToFetch && data) {
        try {
          const parsed = JSON.parse(data as string);
          idToFetch = parsed.id;
        } catch (e) {}
      }

      if (idToFetch) {
        refreshMealData(idToFetch);
      }
    }, [data, mealData?.id])
  );

  const getAlimentoData = (alimentos: any) => {
    if (Array.isArray(alimentos)) return alimentos[0];
    return alimentos;
  };

  const refreshMealData = async (id: number) => {
    try {
      const data = await api.getMeal(id);

      const items: FoodItem[] =
        data.refeicao_itens?.map((item: any) => {
          const alimento = getAlimentoData(item.alimentos);
          const factor = item.quantidade / 100;
          return {
            id: item.id,
            foodId: alimento ? alimento.id : 0,
            name: alimento?.nome || "Item Carregando...",
            quantity: item.quantidade,
            unit: item.unidade_medida || "g",
            baseUnit: alimento?.unidade_base || "g",
            calories: alimento ? alimento.calorias * factor : 0,
            protein: alimento ? alimento.proteinas * factor : 0,
            carbs: alimento ? alimento.carboidratos * factor : 0,
            fats: alimento ? alimento.gorduras * factor : 0,
          };
        }) || [];

      const totalCals = items.reduce((acc, curr) => acc + curr.calories, 0);
      const totalProt = items.reduce((acc, curr) => acc + curr.protein, 0);
      const totalCarbs = items.reduce((acc, curr) => acc + curr.carbs, 0);
      const totalFats = items.reduce((acc, curr) => acc + curr.fats, 0);

      setMealData({
        id: data.id,
        mealName: data.nome,
        meta_calorias: data.meta_calorias, // 2. Mapeando a meta vinda do banco
        calories: Math.round(totalCals),
        totalProtein: Math.round(totalProt),
        totalCarbs: Math.round(totalCarbs),
        totalFats: Math.round(totalFats),
        foodItems: items,
      });
    } catch (error) {
      console.error("Erro ao atualizar refeição:", error);
    }
  };

  const onRefresh = async () => {
    if (mealData?.id) {
      setRefreshing(true);
      await refreshMealData(mealData.id);
      setRefreshing(false);
    }
  };

  const handleRemoveItem = (item: FoodItem) => {
    Alert.alert(
      "Remover Alimento",
      `Deseja remover ${item.name} desta refeição?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            if (!mealData) return;
            setLoading(true);
            try {
              await api.deleteMealItem(item.id);
              refreshMealData(mealData.id);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível remover o alimento.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!mealData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={[Texts.body, { marginTop: 10 }]}>Carregando dados...</Text>
      </SafeAreaView>
    );
  }

  const date = getFormattedDate();

  // 3. Define o objetivo usando a meta do banco (ou 0 se não houver)
  const mealGoal = mealData.meta_calorias || 0;

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
        behavior={"padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        >
          <View style={styles.scrollContent}>
            <Header
              backArrow
              title={mealData.mealName}
              subtitle={date}
              subtitleColor={Colors.text}
            />

            <View style={styles.progressContainer}>
              <View style={styles.progressText}>
                <Text style={Texts.subtitle}>Calorias</Text>
                {/* Exibe calorias atuais / meta (se meta for 0, mostra 0) */}
                <Text style={Texts.body}>
                  {Math.round(mealData.calories)} / {mealGoal} kcal
                </Text>
              </View>
              <ProgressBar
                fillColor={Colors.warning}
                progressTextColor={Colors.bg}
                progress={mealData.calories}
                total={mealGoal > 0 ? mealGoal : 1} // Evita divisão por zero visualmente
              />
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: Spacing.sm,
                  alignItems: "center",
                }}
              >
                <Text style={[Texts.subtitle, { marginBottom: Spacing.sm }]}>
                  Alimentos
                </Text>
                <AddBtn
                  onPress={() =>
                    router.push({
                      pathname: "/diet/foodSearchScreen",
                      params: { mealId: mealData.id },
                    })
                  }
                  size={30}
                />
              </View>

              {loading && (
                <ActivityIndicator
                  color={Colors.primary}
                  style={{ marginBottom: 10 }}
                />
              )}

              <View style={{ gap: 8 }}>
                {mealData.foodItems.map((item) => (
                  <TouchableHighlight
                    key={item.id}
                    style={styles.foodItem}
                    underlayColor={Colors.bgLight}
                    onPress={() =>
                      router.push({
                        pathname: "/diet/foodScreen",
                        params: {
                          data: JSON.stringify({
                            id: item.id,
                            mealId: mealData.id,
                            foodId: item.foodId,
                            name: item.name,
                            quantity: item.quantity,
                            unit: item.unit,
                            baseUnit: item.baseUnit,
                            calories: item.calories,
                            protein: item.protein,
                            carbs: item.carbs,
                            fats: item.fats,
                          }),
                        },
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <View style={{ gap: Spacing.xs, flex: 1 }}>
                        <Text style={Texts.body}>{item.name}</Text>
                        <Text
                          style={[
                            Texts.body,
                            { color: Colors.correct, fontSize: 14 },
                          ]}
                        >
                          {item.quantity}g
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: Spacing.sm,
                          alignItems: "center",
                        }}
                      >
                        <Text style={Texts.body}>
                          {Math.round(item.calories)} kcal
                        </Text>
                        <Pressable
                          hitSlop={20}
                          onPress={() => handleRemoveItem(item)}
                          style={{ paddingLeft: 10 }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color={Colors.incorrect}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </TouchableHighlight>
                ))}

                {mealData.foodItems.length === 0 && (
                  <Text
                    style={{
                      color: Colors.subtext,
                      textAlign: "center",
                      padding: 20,
                    }}
                  >
                    Nenhum alimento nesta refeição.
                  </Text>
                )}
              </View>
            </View>

            <View style={{ gap: Spacing.md }}>
              <View>
                <Text style={Texts.subtitle}>Tabela nutricional</Text>
                <Text style={Texts.subtext}>Total desta refeição</Text>
              </View>
              <MacrosTable
                calories={mealData.calories}
                protein={mealData.totalProtein}
                carbs={mealData.totalCarbs}
                fats={mealData.totalFats}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <MacrosDonutLegend
                protein={mealData.totalProtein}
                carbs={mealData.totalCarbs}
                fats={mealData.totalFats}
              />
              <MacroDonutChart
                protein={mealData.totalProtein}
                carbs={mealData.totalCarbs}
                fats={mealData.totalFats}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 24,
    gap: Spacing.xl,
  },
  progressContainer: {
    gap: Spacing.sm,
  },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.subtext,
    paddingVertical: Spacing.sm,
    paddingHorizontal: 5,
  },
});
