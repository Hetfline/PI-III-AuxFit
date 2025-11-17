import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '@/components/universal/Background';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { WeightChart } from '@/components/profile/WeightChart';
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'geral':
        return (
          <View style={styles.tabContent}>
            <WeightChart />
          </View>
        );
      
      case 'dieta':
        return (
          <View style={styles.tabContent}>
            <Text style={Texts.subtitle}>Conteúdo de Dieta</Text>
          </View>
        );
      
      case 'treino':
        return (
          <View style={styles.tabContent}>
            <Text style={Texts.subtitle}>Conteúdo de Treino</Text>
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

          {/* Conteúdo da tab ativa */}
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
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espaço para bottom tab bar
    gap: Spacing.lg,
  },
  tabsContainer: {
    top: -45,
    flexDirection: 'row',
    marginTop: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#999999',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Texts.body,
    fontSize: 18,
    color: '#999999',
  },
  tabTextActive: {
    ...Texts.bodyBold,
    fontSize: 18,
    color: Colors.primary,
  },
  tabContent: {
    marginTop: Spacing.md,
    top: -90,
  },
});