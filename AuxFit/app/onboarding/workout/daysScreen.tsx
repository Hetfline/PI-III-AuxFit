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

const DAYS_OPTIONS: OptionItem[] = [
  {
    id: '3_dias',
    label: '3 dias por semana',
    description: 'Ideal para Full Body (Corpo todo). Ótimo para quem tem pouco tempo.',
    icon: 'calendar-weekend',
    color: '#4CAF50'
  },
  {
    id: '4_dias',
    label: '4 dias por semana',
    description: 'Divisão AB (Upper/Lower). Equilíbrio perfeito entre treino e descanso.',
    icon: 'calendar-month',
    color: '#2196F3'
  },
  {
    id: '5_dias',
    label: '5 dias por semana',
    description: 'Divisão ABC ou Upper/Lower híbrido. Para quem gosta de ir quase todo dia.',
    icon: 'calendar-check',
    color: '#FFC107'
  },
  {
    id: '6_dias',
    label: '6 dias por semana',
    description: 'Divisão ABC (Push/Pull/Legs). Alta frequência e volume.',
    icon: 'fire',
    color: '#FF5722'
  }
];

export default function DaysScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string>(''); 
  const [showToast, setShowToast] = useState(false);

  const handleNext = () => {
    if (!selectedId) {
      setShowToast(true);
      return;
    }
    
    updateOnboardingData('dias_treino', selectedId);
    
    // Próxima tela sugerida: Duração do Treino
    router.push("/onboarding/workout/durationScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        <Toast message="Selecione quantos dias quer treinar." visible={showToast} onHide={() => setShowToast(false)} type="warning" />
        
        {/* Pergunta 2 de 7 */}
        <ProgressBar currentQuestion={2} totalQuestions={7} onBack={() => router.replace("/onboarding/workout/experienceScreen")} />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>Quantos dias por semana você quer treinar?</Text>
            <Text style={styles.subtitle}>Isso define a divisão do seu treino (Ex: Full Body, ABC, etc).</Text>
          </View>
          
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
            <SelectionList 
                options={DAYS_OPTIONS}
                selectedIds={selectedId}
                onSelect={(id) => setSelectedId(id)}
                variant="card" // Card fica melhor aqui para explicar a divisão
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