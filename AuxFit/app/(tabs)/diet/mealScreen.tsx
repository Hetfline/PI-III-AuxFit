// * Tela de detalhes de refeição específica.
// TODO modificar a forma que os elementos são renderizados para quando o backend for feito.

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/universal/Header";
import getFormatedDate from "@/utils/getFormattedDate";
import ProgressBar from "@/components/universal/ProgressBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddBtn from "@/components/universal/AddBtn";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacrosDonutLegend from "@/components/diet/MacrosDonutLegend";
import MacrosTable from "@/components/diet/MacrosTable";

// Interface para tipar os dados da refeição
interface MealData {
  mealName: string;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  calories: number;
  foodItems: FoodItem[];
}

interface FoodItem {
  id: number;
  name: string;
  weight: number;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export default function mealScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { data } = params;

  const [mealData, setMealData] = useState<MealData | null>(null);

  useEffect(() => {
    if (data) {
      try {
        const parsedData = JSON.parse(data as string);
        setMealData(parsedData);

        // console.log("Nome da Refeição:", parsedData.mealName);
        // console.log("Total de Calorias:", parsedData.calories);
        // console.log("Alimentos:", parsedData.foodItems);
      } catch (e) {
        console.error("Erro ao fazer parse do JSON dos parâmetros:", e);
      }
    }
  }, [data]);

  if (!mealData) {
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

  let date = getFormatedDate();

  // Calcula o total de calorias ingeridas (soma dos alimentos)
  const caloriesIngested = mealData.foodItems.reduce(
    (sum, item) => sum + item.calories,
    0
  );

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
            <Header
              title={mealData.mealName}
              subtitle={date}
              subtitleColor={Colors.text}
            />

            {/* Barra de progress */}
            <View style={styles.progressContainer}>
              <View style={styles.progressText}>
                <Text style={Texts.subtitle}>Meta da refeição</Text>
                <Text style={Texts.body}>678 kcal</Text>
              </View>
              <ProgressBar
                fillColor={Colors.warning}
                progressTextColor={Colors.bg}
                progress={528}
                total={627}
              />
            </View>

            {/* Lista de alimentos da refeição */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: Spacing.sm,
                }}
              >
                <Text style={[Texts.subtitle, { marginBottom: Spacing.sm }]}>
                  Alimentos da refeição
                </Text>
                {/* // TODO adicionar função de adicionar alimento no botão AddBtn */}
                <AddBtn onPress={() => router.push("/diet/foodSearch")} size={30} />
              </View>
              {mealData.foodItems.map((item) => (
                <TouchableHighlight
                  key={item.id}
                  style={styles.foodItem}
                  onPress={() =>
                    router.push({
                      pathname: "/diet/foodScreen",
                      params: {
                        data: JSON.stringify({
                          foodName: item.name,
                          weight: item.weight,
                          protein: mealData.totalProtein,
                          carbs: mealData.totalCarbs,
                          fats: mealData.totalFats,
                          calories: item.calories,
                        }),
                      },
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ gap: Spacing.xs, flex: 1 }}>
                      <Text style={Texts.body}>{item.name}</Text>
                      <Text style={[Texts.body, { color: Colors.correct }]}>
                        {item.weight}g
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: Spacing.sm,
                        alignItems: "center",
                      }}
                    >
                      <Text style={Texts.body}>{item.calories} kcal</Text>
                      {/* // TODO adicionar função de remover item */}
                      <Pressable hitSlop={15}>
                        <MaterialCommunityIcons
                          name="close"
                          size={32}
                          color={Colors.incorrect}
                        />
                      </Pressable>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* // TODO adicionar lógica para somatório correto de macros dependendo dos alimentos da refeição */}
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

            <View style={{ gap: Spacing.md }}>
              <View>
                <Text style={Texts.subtitle}>Tabela nutricional</Text>
                <Text style={Texts.subtext}>Soma de todos os nutrientes</Text>
              </View>
              <MacrosTable
                calories={mealData.calories}
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
    paddingBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
