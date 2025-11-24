import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";

import Background from "@/components/universal/Background";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDietTab from "@/components/profile/ProfileDietTab";
import ProfileGeneralTab from "@/components/profile/ProfileGeneralTab";
import ProfileTabSelector from "@/components/profile/ProfileTabSelector";
import ProfileWorkoutTab from "@/components/profile/ProfileWorkoutTab";

import { Colors, Spacing } from "@/constants/Styles";
import { api } from "@/services/api";
import { authStorage } from "@/services/auth-storage";

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"geral" | "dieta" | "treino">("geral");

  // Estados dos dados globais do perfil
  const [userData, setUserData] = useState({
    name: "",
    date: "",
    caloriesConsumed: 0,
    caloriesGoal: 0,
    waterConsumed: 0,
    waterGoal: 2500,
  });

  // Função para carregar dados (Usuário, Água, Calorias)
  const loadProfileData = async () => {
    try {
      // Dados do Usuário
      const user = await api.me();
      
      // Progresso de Hoje (Água)
      const progress = await api.getTodayWaterProgress();
      
      // Calorias (Somar refeições do dia)
      const meals = await api.getMeals();
      
      let consumed = 0;
      let goal = 0;

      // Cálculo simples de calorias consumidas e meta total baseada na soma das metas das refeições
      meals.forEach((meal: any) => {
        goal += Number(meal.meta_calorias || 0);
        
        if (meal.refeicao_itens) {
           meal.refeicao_itens.forEach((item: any) => {
              // Verifica se alimento existe e tem calorias
              if (item.alimentos) {
                 const cals = item.alimentos.calorias || 0;
                 const qtd = item.quantidade || 0;
                 
                 // CORREÇÃO: Normaliza para base 100g (fator = quantidade / 100)
                 // Se a unidade for 'un', assume 1un = 100 da base ou ajuste conforme lógica do app
                 // Para manter consistência com a tela de Dieta:
                 const factor = qtd / 100;
                 
                 consumed += cals * factor; 
              }
           });
        }
      });

      // Formatar data atual
      const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
      const formattedDate = new Date().toLocaleDateString('pt-BR', dateOptions);

      setUserData({
        name: user?.nome || "Usuário",
        date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
        caloriesConsumed: consumed,
        caloriesGoal: goal > 0 ? goal : 2000, // Padrão se não tiver meta
        waterConsumed: progress?.agua_ml || 0,
        waterGoal: 2500,
      });

    } catch (error) {
      console.log("Erro ao carregar perfil", error);
    }
  };

  // Recarregar sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await authStorage.removeToken();
      router.replace("/(auth)");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair.");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "geral":
        return (
          <View style={styles.tabContentWrapper}>
            <ProfileGeneralTab />
          </View>
        );

      case "dieta":
        return (
          <View style={styles.tabContentWrapper}>
            <ProfileDietTab />
          </View>
        );

      case "treino":
        return (
          <View style={styles.tabContentWrapper}>
            <ProfileWorkoutTab />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header com Avatar e Barras de Progresso e Logout */}
          <ProfileHeader
            userName={userData.name}
            date={userData.date}
            caloriesConsumed={userData.caloriesConsumed}
            caloriesGoal={userData.caloriesGoal}
            waterConsumed={userData.waterConsumed}
            waterGoal={userData.waterGoal}
            onLogout={handleLogout}
          />

          {/* Abas de Navegação com TabSelector */}
          <View>
            <ProfileTabSelector
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </View>

          {/* Renderização do Conteúdo da Aba Ativa */}
          {renderTabContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing.sm,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    gap: Spacing.md,
  },

  tabContentWrapper: {
    marginHorizontal: Spacing.sm,
    marginTop: Spacing.md,
  },
});