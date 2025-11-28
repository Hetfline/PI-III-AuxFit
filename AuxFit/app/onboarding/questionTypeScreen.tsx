import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";
import Toast from "@/components/universal/Toast";
import QuestionTypeSelect from "@/components/onboarding/QuestionTypeSelect";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";
import { api } from "@/services/api";

export default function QuestionTypeScreen() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Estados para controle da IA e Perfis
  const [hasWorkoutProfile, setHasWorkoutProfile] = useState(false);
  const [hasDietProfile, setHasDietProfile] = useState(false);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // * Checar se já existem perfis ao carregar a tela
  useEffect(() => {
    checkProfiles();
  }, []);

  const checkProfiles = async () => {
    try {
      setIsLoadingProfiles(true);
      // Busca usuário para pegar o ID
      const user = await api.me();
      if (user) setUserId(user.id);

      // Busca perfis em paralelo
      const [workoutProfile, dietProfile] = await Promise.all([
        api.getTrainingProfile(),
        api.getDietProfile(),
      ]);

      setHasWorkoutProfile(!!workoutProfile);
      setHasDietProfile(!!dietProfile);
    } catch (error) {
      console.log("Erro ao checar perfis:", error);
    } finally {
      setIsLoadingProfiles(false);
    }
  };

  // * Função para chamar os Webhooks
  const handleGenerateAI = async () => {
    if (!userId) {
      Alert.alert("Erro", "Usuário não identificado.");
      return;
    }

    if (!hasWorkoutProfile && !hasDietProfile) {
      Alert.alert(
        "Aviso",
        "Você precisa preencher o formulário de treino ou dieta antes de gerar."
      );
      return;
    }

    try {
      setIsGenerating(true);
      const promises = [];

      // Chama webhook de treino se tiver perfil
      if (hasWorkoutProfile) {
        promises.push(api.generateAIPlan("gerar-treino", userId));
      }

      // Chama webhook de dieta se tiver perfil
      if (hasDietProfile) {
        promises.push(api.generateAIPlan("gerar-dieta", userId));
      }

      await Promise.all(promises);

      Alert.alert(
        "Sucesso!",
        "Sua solicitação foi enviada para a IA. Em instantes seu plano estará pronto.",
        [{ text: "Ir para Home", onPress: () => router.push("/(tabs)/home") }]
      );
    } catch (error) {
      console.error("Erro detalhado:", error);
      Alert.alert(
        "Erro",
        "Falha ao comunicar com a IA. Verifique se o servidor de webhook está rodando e acessível."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!selectedPath) {
      setShowToast(true);
      return;
    }

    if (selectedPath === "workout") {
      router.push("/onboarding/workout/experienceScreen");
    } else if (selectedPath === "diet") {
      router.push("/onboarding/diet/restrictionsScreen");
    }
  };

  const handleSkip = () => {
    router.push("/(tabs)/home");
  };

  // Verifica se tem algum perfil
  const hasAnyProfile = hasWorkoutProfile || hasDietProfile;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        <Toast
          message="Por favor, selecione uma categoria."
          visible={showToast}
          onHide={() => setShowToast(false)}
          type="warning"
        />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>
              O que você quer configurar agora?
            </Text>
            <Text style={styles.subtitle}>
              Vamos personalizar sua experiência com base na sua escolha.
            </Text>
          </View>

          <View style={styles.cardsSection}>
            <QuestionTypeSelect
              selectedPath={selectedPath}
              onSelect={setSelectedPath}
            />
          </View>

          {/* BOTÃO DE GERAR COM IA (Aparece apenas se tiver perfis) */}
          {!isLoadingProfiles && hasAnyProfile && (
            <View style={styles.aiSection}>
              <Button
                title={isGenerating ? "Gerando..." : "✨ Gerar Plano com IA"}
                onPress={handleGenerateAI}
                bgColor={Colors.accent}
              />
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.navigationButtons}>
            <View style={styles.backButtonWrapper}>
              <Button
                title="Voltar"
                onPress={handleBack}
                bgColor={Colors.text}
              />
            </View>

            <View style={styles.nextButtonWrapper}>
              {/* Agora o botão "Próxima" aparece sempre, permitindo continuar o fluxo */}
              <Button
                title="Próxima"
                onPress={handleNext}
                bgColor={Colors.primary}
              />
            </View>
          </View>

          {/* Botão de ir para home aparece apenas se JÁ EXISTIR algum perfil */}
          
            <Button
              title="Pular perguntas"
              onPress={handleSkip}
              bgColor="transparent"
              color={Colors.subtext}
            />
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center" },

  topSection: {
    alignItems: "center",
    gap: 16,
    paddingHorizontal: Spacing.lg,
    marginBottom: 30,
  },
  question: {
    ...Texts.title,
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    ...Texts.body,
    color: Colors.subtext,
    textAlign: "center",
  },

  cardsSection: {
    paddingHorizontal: Spacing.lg,
  },

  aiSection: {
    marginTop: 30,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: "rgba(53, 225, 255, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.accent,
    gap: 12,
  },
  aiText: {
    ...Texts.subtext,
    color: Colors.accent,
    textAlign: "center",
    fontSize: 12,
  },

  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  backButtonWrapper: { flex: 1 },
  nextButtonWrapper: { flex: 1 },
});