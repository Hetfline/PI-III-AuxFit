import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import ProgressBar from "@/components/onboarding/OnboardingProgress";
import Button from "@/components/universal/Button";
import SelectionList, { OptionItem } from "@/components/onboarding/workout/SelectionList";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";

// Lista longa de opções simples
const MUSCLE_OPTIONS: OptionItem[] = [
  { id: 'peito', label: 'Peito' },
  { id: 'costas', label: 'Costas' },
  { id: 'pernas', label: 'Pernas' },
  { id: 'gluteos', label: 'Glúteos' },
  { id: 'ombros', label: 'Ombros' },
  { id: 'biceps', label: 'Bíceps' },
  { id: 'triceps', label: 'Tríceps' },
  { id: 'abdomen', label: 'Abdômen' },
  { id: 'panturrilha', label: 'Panturrilha' },
  { id: 'cardio', label: 'Cardio' },
];

export default function MuscleFocusScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  
  // Estado é um array de strings agora
  const [selectedIds, setSelectedIds] = useState<string[]>([]); 

  const handleSelect = (id: string) => {
    // Lógica de Toggle para múltipla escolha
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleNext = () => {
    // Salva array (pode ser vazio se "sem preferência")
    updateOnboardingData('foco_muscular', selectedIds);
    
    // Finaliza ou vai para proxima
    router.push("/onboarding/questionTypeScreen"); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        
        <ProgressBar currentQuestion={7} totalQuestions={7} onBack={() => router.replace("/onboarding/workout/experienceScreen")} />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>Tem preferência de grupos musculares?</Text>
            <Text style={styles.subtitle}>Selecione quantos quiser para darmos ênfase.</Text>
          </View>
          
          <ScrollView style={{marginTop: 20}} contentContainerStyle={{paddingBottom: 20}}>
            <SelectionList 
                options={MUSCLE_OPTIONS}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                variant="tag"       // Estilo TAG
                multiSelect={true}  // Múltipla escolha
            />
          </ScrollView>
        </View>

        <View style={styles.navigationButtons}>
          <View style={{flex: 1}}><Button title="Voltar" onPress={() => router.back()} bgColor={Colors.text} /></View>
          <View style={{flex: 1}}>
            <Button 
                title={selectedIds.length === 0 ? "Pular" : "Finalizar"} 
                onPress={handleNext} 
                bgColor={Colors.primary} 
            />
          </View>
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
  subtitle: { ...Texts.body, color: Colors.subtext, textAlign: "center" },
  navigationButtons: { flexDirection: "row", gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
});