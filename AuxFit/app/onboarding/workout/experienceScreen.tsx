import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import ProgressBar from "@/components/onboarding/OnboardingProgress";
import Button from "@/components/universal/Button";
import SelectionList, { OptionItem } from "@/components/onboarding/workout/SelectionList";
import Toast from "@/components/universal/Toast";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";

const EXPERIENCE_OPTIONS: OptionItem[] = [
  {
    id: 'iniciante',
    label: 'Iniciante',
    description: '0 - 6 meses de treino. Foco em aprendizado.',
    icon: 'sprout',
    color: '#8BC34A'
  },
  {
    id: 'intermediario',
    label: 'Intermediário',
    description: '6 meses - 2 anos. Já conhece os movimentos.',
    icon: 'arm-flex',
    color: '#FFC107'
  },
  {
    id: 'avancado',
    label: 'Avançado',
    description: 'Mais de 2 anos. Busca performance.',
    icon: 'trophy',
    color: '#FF5722'
  }
];

export default function ExperienceScreen() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string>(''); // String única
  const [showToast, setShowToast] = useState(false);

  const handleNext = () => {
    if (!selectedId) {
      setShowToast(true);
      return;
    }
    // Salva no contexto
    updateOnboardingData('nivel_experiencia', selectedId);
    // Vai para a próxima (ex: Dias por semana)
    router.push("/onboarding/workout/daysScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        <Toast message="Selecione seu nível." visible={showToast} onHide={() => setShowToast(false)} type="warning" />
        
        {/* ProgressBar atualizada */}
        <ProgressBar currentQuestion={1} totalQuestions={7} onBack={() => router.back()} />

        <View style={styles.content}>
          <View style={styles.topSection}>
            {/* Você pode mudar o logo/imagem por pergunta se quiser */}
            <Text style={styles.question}>Qual seu nível de experiência na musculação?</Text>
          </View>
          
          <View style={styles.listSection}>
            <SelectionList 
                options={EXPERIENCE_OPTIONS}
                selectedIds={selectedId}
                onSelect={(id) => setSelectedId(id)}
                variant="card" // Usa o estilo detalhado
            />
          </View>
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
  topSection: { marginTop: 20, alignItems: "center", gap: 20 },
  question: { ...Texts.title, fontSize: 22, textAlign: "center" },
  listSection: { marginTop: 40 },
  navigationButtons: { flexDirection: "row", gap: Spacing.md, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
});