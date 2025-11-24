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

const RESTRICTION_OPTIONS: OptionItem[] = [
  { id: 'lactose', label: 'Lactose (Leite)', icon: 'cup-off' },
  { id: 'gluten', label: 'Glúten', icon: 'barley-off' },
  { id: 'amendoim', label: 'Amendoim/Nozes', icon: 'peanut-off' },
  { id: 'ovos', label: 'Ovos', icon: 'egg-off' },
  { id: 'frutos_do_mar', label: 'Frutos do Mar', icon: 'fish-off' },
  { id: 'soja', label: 'Soja', icon: 'seed-off' },
  { id: 'acucar', label: 'Açúcar (Diabético)', icon: 'cube-off' },
  { id: 'nenhuma', label: 'Nenhuma', icon: 'check-circle-outline', color: Colors.correct },
];

export default function RestrictionsScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]); 

  const handleSelect = (id: string) => {
    // Lógica exclusiva: Se selecionar "Nenhuma", limpa as outras e vice-versa
    if (id === 'nenhuma') {
        if (selectedIds.includes('nenhuma')) {
            setSelectedIds([]);
        } else {
            setSelectedIds(['nenhuma']);
        }
        return;
    }

    // Se selecionar uma restrição real, remove "Nenhuma"
    let newIds = selectedIds.filter(item => item !== 'nenhuma');

    if (newIds.includes(id)) {
      newIds = newIds.filter(item => item !== id);
    } else {
      newIds.push(id);
    }
    setSelectedIds(newIds);
  };

  const handleNext = () => {
  
    updateOnboardingData('restricoes_alimentares', selectedIds);
    
  
    router.push("/onboarding/diet/dietTypeScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        
        {/* Ajuste o número da pergunta conforme sua ordem global (ex: 1 de 3 da dieta) */}
        <ProgressBar currentQuestion={1} totalQuestions={3} onBack={() => router.back()} />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>Você possui alguma restrição alimentar?</Text>
            <Text style={styles.subtitle}>Isso garante que não sugeriremos alimentos perigosos ou indesejados para você.</Text>
          </View>
          
          <ScrollView style={{marginTop: 20}} contentContainerStyle={{paddingBottom: 20}}>
            <SelectionList 
                options={RESTRICTION_OPTIONS}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                variant="tag"
                multiSelect={true}
            />
          </ScrollView>
        </View>

        <View style={styles.navigationButtons}>
          <View style={{flex: 1}}><Button title="Voltar" onPress={() => router.back()} bgColor={Colors.text} /></View>
          <View style={{flex: 1}}>
            <Button 
                title={selectedIds.length === 0 ? "Pular" : "Próxima"} 
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
  subtitle: { ...Texts.body, color: Colors.subtext, textAlign: "center", fontSize: 14 },
  navigationButtons: { flexDirection: "row", gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
});