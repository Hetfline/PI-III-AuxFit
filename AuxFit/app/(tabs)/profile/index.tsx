import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '@/components/universal/Background';
import ProfileHeader from '@/components/profile/ProfileHeader';
import WeightCards from '@/components/profile/WeightCards';
import Button from '@/components/universal/Button';
import { Colors, Spacing, Texts } from '@/constants/Styles';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'geral' | 'dieta' | 'treino'>('geral');

  // Dados mockados - depois virão do contexto/backend
  const userData = {
    name: 'Nome de usuário',
    photo: undefined,
    date: 'Segunda-feira, set. 15',
    streak: 3,
    caloriesConsumed: 2100,
    caloriesGoal: 3000,
    waterConsumed: 2500,
    waterGoal: 3500,
    initialWeight: 98.0,
    currentWeight: 98.0,
    goalWeight: 95.0,
  };

  const handleAddWeight = () => {
    console.log('Adicionar pesagem');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Background />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header com foto, nome, streak e barras */}
        <ProfileHeader
          userName={userData.name}
          userPhoto={userData.photo}
          date={userData.date}
          streak={userData.streak}
          caloriesConsumed={userData.caloriesConsumed}
          caloriesGoal={userData.caloriesGoal}
          waterConsumed={userData.waterConsumed}
          waterGoal={userData.waterGoal}
        />

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable 
            style={[styles.tab, activeTab === 'geral' && styles.tabActive]}
            onPress={() => setActiveTab('geral')}
          >
            <Text style={[styles.tabText, activeTab === 'geral' && styles.tabTextActive]}>
              Geral
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.tab, activeTab === 'dieta' && styles.tabActive]}
            onPress={() => setActiveTab('dieta')}
          >
            <Text style={[styles.tabText, activeTab === 'dieta' && styles.tabTextActive]}>
              Dieta
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.tab, activeTab === 'treino' && styles.tabActive]}
            onPress={() => setActiveTab('treino')}
          >
            <Text style={[styles.tabText, activeTab === 'treino' && styles.tabTextActive]}>
              Treino
            </Text>
          </Pressable>
        </View>

        {/* Cards de Peso */}
        <WeightCards
          initialWeight={userData.initialWeight}
          currentWeight={userData.currentWeight}
          goalWeight={userData.goalWeight}
        />

        {/* Botão Adicionar Pesagem */}
        <View style={styles.addWeightButton}>
          <Button
            title="Adicionar uma pesagem"
            icon='add'
            onPress={handleAddWeight}
            bgColor={Colors.primary}
          />
        </View>

        {/* Gráfico - Placeholder por enquanto */}
        <View style={styles.chartContainer}>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Gráfico de evolução do peso
            </Text>
            <Text style={styles.chartPlaceholderSubtext}>
              (ainda vou importar a biblioteca de gráficos)
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Texts.body,
    color: Colors.subtext,
  },
  tabTextActive: {
    ...Texts.bodyBold,
    color: Colors.primary,
  },
  addWeightButton: {
    paddingHorizontal: Spacing.lg,
  },
  chartContainer: {
    paddingHorizontal: Spacing.lg,
    minHeight: 250,
  },
  chartPlaceholder: {
    flex: 1,
    backgroundColor: Colors.bgLight,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  chartPlaceholderText: {
    ...Texts.bodyBold,
    fontSize: 18,
  },
  chartPlaceholderSubtext: {
    ...Texts.subtext,
    fontSize: 14,
  },
});