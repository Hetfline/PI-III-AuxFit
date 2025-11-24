import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import ProgressBar from "@/components/onboarding/OnboardingProgress";
import Button from "@/components/universal/Button";
import SelectionList, { OptionItem } from "@/components/onboarding/workout/SelectionList"; 
import Toast from "@/components/universal/Toast";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";

const DIET_TYPE_OPTIONS: OptionItem[] = [
  {
    id: 'onivoro',
    label: 'Onívoro (Tradicional)',
    description: 'Come de tudo: carnes, vegetais, ovos e laticínios.',
    icon: 'food-steak',
    color: '#FF7043'
  },
  {
    id: 'vegetariano',
    label: 'Vegetariano',
    description: 'Não come carnes, mas consome ovos e/ou laticínios.',
    icon: 'leaf',
    color: '#4CAF50'
  },
  {
    id: 'vegano',
    label: 'Vegano',
    description: 'Não consome nenhum produto de origem animal.',
    icon: 'sprout',
    color: '#8BC34A'
  },
  {
    id: 'flexitariano',
    label: 'Flexitariano',
    description: 'Base vegetal, mas consome carne ocasionalmente.',
    icon: 'food-apple',
    color: '#FFC107'
  },
  {
    id: 'pescetariano',
    label: 'Pescetariano',
    description: 'Não come carne vermelha ou aves, mas consome peixes.',
    icon: 'fish',
    color: '#2196F3'
  }
];

export default function DietTypeScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string>(''); 
  const [showToast, setShowToast] = useState(false);

  const handleNext = () => {
    if (!selectedId) {
      setShowToast(true);
      return;
    }
    
  
    const isVegetarian = selectedId === 'vegetariano';
    const isVegan = selectedId === 'vegano';
    
    updateOnboardingData('tipo_dieta', selectedId);
    updateOnboardingData('vegetariano', isVegetarian);
    updateOnboardingData('vegano', isVegan);
    
    router.push("/onboarding/diet/mealsFrequencyScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        <Toast message="Selecione seu tipo de alimentação." visible={showToast} onHide={() => setShowToast(false)} type="warning" />
        
        <ProgressBar currentQuestion={2} totalQuestions={3} onBack={() => router.back()} />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>Qual seu tipo de alimentação?</Text>
            <Text style={styles.subtitle}>Isso define a base dos alimentos que vamos sugerir.</Text>
          </View>
          
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
            <SelectionList 
                options={DIET_TYPE_OPTIONS}
                selectedIds={selectedId}
                onSelect={(id) => setSelectedId(id)}
                variant="card"
                multiSelect={false}
            />
          </ScrollView>
        </View>

        <View style={styles.navigationButtons}>
          <View style={{flex: 1}}><Button title="Voltar" onPress={() => router.back()} bgColor={Colors.text} /></View>
          <View style={{flex: 1}}><Button title="Próxima" onPress={handleNext} bgColor={Colors.primary} /></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.lg },
  topSection: { marginTop: 20, alignItems: "center", gap: 10 },
  question: { ...Texts.title, fontSize: 22, textAlign: "center" },
  subtitle: { ...Texts.body, color: Colors.subtext, textAlign: "center", fontSize: 14 },
  navigationButtons: { flexDirection: "row", gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
});