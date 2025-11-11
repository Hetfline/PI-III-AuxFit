// * Tela de detalhes de alimento específico.
// TODO modificar a forma que os elementos são renderizados para quando o backend for feito.

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
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
import DropdownSelector from "@/components/universal/DropdownSelector";
import Button from "@/components/universal/Button";

// Interface para tipar os dados da refeição
interface FoodData {
  id: number;
  foodName: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default function foodScreen() {
  // * Mocks para o componente de dropdown
  const dropdownData = [
    { label: "Gramas", value: 1 },
    { label: "Unidade", value: 2 },
    { label: "Ml", value: 3 },
  ];

  const [measureUnit, setMeasureUnit] = useState(dropdownData[0]);
  console.log(measureUnit);

  const router = useRouter();
  const params = useLocalSearchParams();

  const { data } = params;

  const [foodData, setMealData] = useState<FoodData | null>(null);

  const handleDropdownChange = (value: number) => {
    const selectedItem = dropdownData.find((item) => item.value === value);
    if (selectedItem) {
      setMeasureUnit(selectedItem);
    }
  };

  useEffect(() => {
    if (data) {
      try {
        const parsedData = JSON.parse(data as string);
        setMealData(parsedData);

        // console.log("Nome da comida:", parsedData.mealName);
        // console.log("Total de Calorias:", parsedData.calories);
        // console.log("Peso:", parsedData.foodItems);
      } catch (e) {
        console.error("Erro ao fazer parse do JSON dos parâmetros:", e);
      }
    }
  }, [data]);

  if (!foodData) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={Texts.body}>Carregando dados...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      {/* Background com linhas decorativas */}
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Header
                title={foodData.foodName}
                subtitle={`${foodData.weight}g`}
                subtitleColor={Colors.correct}
              />
              {/* // TODO adicionar funcionalidade de favorito com o backend */}
              <Favorite />
            </View>

            {/* Container dos inputs */}
            <View style={{gap: Spacing.lg}}>
              <View style={{ flexDirection: "row", alignItems: 'flex-end', gap: Spacing.lg }}>
                <View style={{justifyContent: 'center', alignItems: 'center', gap: Spacing.xs}}>
                <Text style={Texts.body}>Quantidade: </Text>
                <InputField placeholder="Peso"/>
              </View>
              <DropdownSelector data={dropdownData} onValueChange={handleDropdownChange} placeholder="Medida"/>
              </View>
              <Button onPress={() => null} title="Adicionar" icon="add"/>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* // TODO adicionar lógica para somatório correto de macros dependendo dos alimentos da refeição */}
              <MacrosDonutLegend
                protein={foodData.protein}
                carbs={foodData.carbs}
                fats={foodData.fats}
              />

              <MacroDonutChart
                protein={foodData.protein}
                carbs={foodData.carbs}
                fats={foodData.fats}
              />
            </View>

            <View style={{ gap: Spacing.md }}>
              <View>
                <Text style={Texts.subtitle}>Tabela nutricional</Text>
                <Text style={Texts.subtext}>Soma de todos os nutrientes</Text>
              </View>
              <MacrosTable
                calories={foodData.calories}
                protein={foodData.protein}
                carbs={foodData.carbs}
                fats={foodData.fats}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
