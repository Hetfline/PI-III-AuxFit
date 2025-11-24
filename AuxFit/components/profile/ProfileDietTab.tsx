import React, { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacrosDonutLegend from "@/components/diet/MacrosDonutLegend";
import MacrosTable from "@/components/diet/MacrosTable";
import { api } from "@/services/api";
import { calculateMacros, Macros } from "@/utils/nutritionCalculator";

export default function ProfileDietTab() {
  const router = useRouter();
  const [despensaPreview, setDespensaPreview] = useState<any[]>([]);
  const [macros, setMacros] = useState<Macros | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadDietData();
    }, [])
  );

  const loadDietData = async () => {
    try {
      setLoading(true);

      // 1. Buscar Despensa
      const pantryData = await api.getPantry().catch((err) => {
        console.log("Erro ao buscar despensa", err);
        return [];
      });
      if (pantryData) setDespensaPreview(pantryData);

      // 2. Buscar Perfil e Peso Atual para calcular Macros
      const [user, todayProgress] = await Promise.all([
        api.me().catch((err) => null),
        api.getTodayWaterProgress().catch((err) => null),
      ]);

      if (user) {
        // Usa o peso de hoje se disponível (> 0), senão o peso inicial do utilizador
        const currentWeight =
          todayProgress?.peso && Number(todayProgress.peso) > 0
            ? Number(todayProgress.peso)
            : Number(user.peso_inicial);

        // Prepara objeto para cálculo com os dados do banco
        const profileData = {
          sexo: user.sexo || "M",
          data_nascimento: user.data_nascimento || new Date().toISOString(),
          altura: Number(user.altura) || 170,
          peso: currentWeight || 70,
          nivel_atividade: user.nivel_atividade || "moderado",
          objetivo: user.objetivo || "manter",
        };

        const calculated = calculateMacros(profileData);
        setMacros(calculated);
      }
    } catch (error) {
      console.log("Erro ao carregar dados da dieta", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !macros) {
    return (
      <View
        style={[styles.container, { alignItems: "center", paddingTop: 50 }]}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Fallback seguro se falhar o cálculo ou os dados
  const safeMacros = macros || {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 65,
  };

  return (
    <View style={styles.container}>
      {/* Seção Despensa */}
      <View style={{ gap: Spacing.md }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="fridge-outline"
              size={48}
              color={Colors.accent}
            />
            <Text style={Texts.subtitle}>Despensa</Text>
          </View>
          <Pressable
            hitSlop={15}
            onPress={() => router.push("/(tabs)/profile/pantryScreen")}
          >
            <MaterialIcons
              name="arrow-forward"
              size={30}
              color={Colors.primary}
            />
          </Pressable>
        </View>

        <View style={styles.pantryContainer}>
          {despensaPreview.length === 0 ? (
            <Text style={Texts.subtext}>A sua despensa está vazia.</Text>
          ) : (
            despensaPreview.slice(0, 5).map((item) => (
              <Pressable key={item.id} style={styles.pantryItem}>
                <Text style={Texts.body}>{item.alimentos?.nome}</Text>
              </Pressable>
            ))
          )}
        </View>
      </View>

      {/* Divisão dos macros recomendados */}
      <View style={{ gap: Spacing.md }}>
        <Text style={Texts.subtitle}>Metas Diárias Recomendadas</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <MacrosDonutLegend
            protein={safeMacros.protein}
            carbs={safeMacros.carbs}
            fats={safeMacros.fats}
          />
          <MacroDonutChart
            protein={safeMacros.protein}
            carbs={safeMacros.carbs}
            fats={safeMacros.fats}
          />
        </View>
      </View>

      {/* Tabela Nutricional */}
      <View style={{ gap: Spacing.md }}>
        <View>
          <Text style={Texts.subtitle}>Tabela Nutricional (Meta)</Text>
          <Text style={Texts.subtext}>Baseado no seu perfil e objetivo</Text>
        </View>
        <MacrosTable
          calories={safeMacros.calories}
          protein={safeMacros.protein}
          carbs={safeMacros.carbs}
          fats={safeMacros.fats}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.lg,
  },
  pantryContainer: {
    gap: Spacing.sm,
  },
  pantryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtext,
  },
});
