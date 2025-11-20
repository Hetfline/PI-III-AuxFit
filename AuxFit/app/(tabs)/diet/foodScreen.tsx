import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/universal/Header";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacrosDonutLegend from "@/components/diet/MacrosDonutLegend";
import MacrosTable from "@/components/diet/MacrosTable";
import Favorite from "@/components/universal/FavoriteBtn";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";
import { api } from "@/services/api";

interface FoodData {
  id: number; // ID do item na tabela refeicao_itens
  foodId: number; // ID original do alimento
  mealId: number;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  favorito?: boolean;
}

export default function foodScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { data } = params;

  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  // Estado para controlar o ID do item na despensa (se existir)
  const [pantryId, setPantryId] = useState<number | null>(null);

  const dropdownData = [
    { label: "Gramas", value: 1 },
    { label: "Unidade", value: 2 },
    { label: "Ml", value: 3 },
  ];
  const [measureUnit, setMeasureUnit] = useState(dropdownData[0]);

  useEffect(() => {
    const loadData = async () => {
      if (data) {
        try {
          const parsedData = JSON.parse(data as string);

          // Verifica se está na despensa ANTES de renderizar para o botão ficar correto
          const pantryCheck = await api.checkPantryItem(parsedData.foodId);

          if (pantryCheck.inPantry && pantryCheck.item) {
            setPantryId(pantryCheck.item.id);
          }

          setFoodData(parsedData);
          setQuantity(parsedData.quantity.toString());

          if (parsedData.unit === "un") setMeasureUnit(dropdownData[1]);
          else if (parsedData.unit === "ml") setMeasureUnit(dropdownData[2]);
          else setMeasureUnit(dropdownData[0]);
        } catch (e) {
          console.error("Erro ao carregar dados:", e);
        }
      }
    };
    loadData();
  }, [data]);

  const handleUpdate = async () => {
    if (!foodData || !quantity) return;
    setLoading(true);
    try {
      const newQty = parseFloat(quantity);
      await api.updateMealItem(foodData.id, {
        quantidade: newQty,
        unidade_medida:
          measureUnit.label === "Unidade"
            ? "un"
            : measureUnit.label === "Ml"
            ? "ml"
            : "g",
      });
      Alert.alert("Sucesso", "Item atualizado!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!foodData) return;
    Alert.alert(
      "Remover Item",
      "Tem certeza que deseja remover este alimento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await api.deleteMealItem(foodData.id);
              router.back();
            } catch (error) {
              Alert.alert("Erro", "Falha ao remover item.");
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Função para adicionar/remover da despensa
  const handleTogglePantry = async (newState: boolean) => {
    if (!foodData) return;

    try {
      if (newState) {
        // Adicionar à despensa
        const result = await api.addToPantry(foodData.foodId);
        setPantryId(result.id); // Salva o ID da relação criada
        Alert.alert("Adicionado", "Alimento adicionado à despensa!");
      } else {
        // Remover da despensa
        if (pantryId) {
          await api.removeFromPantry(pantryId);
          setPantryId(null);
          Alert.alert("Removido", "Removido da despensa.");
        }
      }
    } catch (error) {
      console.error("Erro na despensa:", error);
      Alert.alert("Erro", "Não foi possível atualizar a despensa.");
    }
  };

  if (!foodData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={Texts.body}>Carregando dados...</Text>
      </SafeAreaView>
    );
  }

  const factor = (parseFloat(quantity) || 0) / foodData.quantity;
  const displayCalories = Math.round(foodData.calories * factor);
  const displayProtein = Math.round(foodData.protein * factor);
  const displayCarbs = Math.round(foodData.carbs * factor);
  const displayFats = Math.round(foodData.fats * factor);

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
        >
          <View style={styles.scrollContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Header
                backArrow
                title={foodData.name}
                subtitle={`${displayCalories} kcal`}
                subtitleColor={Colors.correct}
              />
              {/* Componente Favorito agora controla a Despensa */}
              <Favorite
                initialState={!!pantryId}
                onToggle={handleTogglePantry}
              />
            </View>

            <View style={{ gap: Spacing.lg }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: Spacing.lg,
                }}
              >
                <View style={styles.inputContainer}>
                  <Text style={Texts.body}>Quantidade: </Text>
                  <InputField
                    placeholder="Peso"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Button
                    onPress={handleUpdate}
                    title={loading ? "Salvando..." : "Atualizar"}
                    icon="check"
                    bgColor={Colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    onPress={handleDelete}
                    title="Remover"
                    bgColor={Colors.incorrect}
                  />
                </View>
              </View>
            </View>

            <View style={{ gap: Spacing.md }}>
              <View>
                <Text style={Texts.subtitle}>Tabela nutricional</Text>
                <Text style={Texts.subtext}>Soma de todos os nutrientes</Text>
              </View>
              <MacrosTable
                calories={displayCalories}
                protein={displayProtein}
                carbs={displayCarbs}
                fats={displayFats}
              />
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <MacrosDonutLegend
                protein={displayProtein}
                carbs={displayCarbs}
                fats={displayFats}
              />
              <MacroDonutChart
                protein={displayProtein}
                carbs={displayCarbs}
                fats={displayFats}
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xs,
    flex: 1,
  },
});
