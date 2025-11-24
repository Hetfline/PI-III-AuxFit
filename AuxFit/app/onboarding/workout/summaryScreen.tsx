import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useOnboarding } from "@/context/OnboardingContext";
import { api } from "@/services/api";

const formatText = (text: string | undefined) => {
  if (!text) return "Não informado";
  return text.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};

// Função auxiliar para converter os IDs do app para os valores exatos do Banco
const mapExperienceToDB = (value: string | undefined) => {
    if (!value) return 'Iniciante'; // Default seguro
    
    const normalized = value.toLowerCase();
    if (normalized.includes('iniciante')) return 'Iniciante';
    if (normalized.includes('intermediar') || normalized.includes('intermediário')) return 'Intermediário';
    if (normalized.includes('avancado') || normalized.includes('avançado')) return 'Avançado';
    
    return 'Iniciante'; // Fallback
};

export default function SummaryScreen() {
  const router = useRouter();
  const { onboardingData: data } = useOnboarding();
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    try {
      // 1. Mapeamento correto para o Schema do Banco de Dados
      // IMPORTANTE: As chaves aqui devem ser IGUAIS às colunas do banco 'perfil_treino'
      const trainingProfile = {
        // Mapeia "intermediario" -> "Intermediário" (para o CHECK constraint)
        nivel_experiencia: mapExperienceToDB(data.nivel_experiencia),
        
        // Mapeia dias_treino -> dias_por_semana (integer)
        dias_por_semana: parseInt(data.dias_treino || "3"), 
        
        // Mapeia duracao_treino -> tempo_disponivel_minutos (integer)
        // Remove caracteres não numéricos (ex: "60 min" -> 60)
        tempo_disponivel_minutos: parseInt(data.duracao_treino?.replace(/\D/g, '') || "60"), 
        
        // Mapeia lesoes -> limitacoes_lesoes (ARRAY)
        limitacoes_lesoes: data.lesoes || [], 
        
        // Mapeia preferencia_treino -> estilo_treino (text)
        estilo_treino: data.preferencia_treino?.toLowerCase() || 'tradicional',
        
        // Mapeia foco_muscular -> grupos_musculares_foco (ARRAY)
        grupos_musculares_foco: data.foco_muscular || [],

        // Mapeia equipamentos -> equipamentos_disponiveis (ARRAY)
        equipamentos_disponiveis: data.equipamentos || [],
      };

      console.log("Enviando perfil de treino corrigido:", trainingProfile);

      await api.saveTrainingProfile(trainingProfile);

      Alert.alert("Tudo pronto!", "Seu perfil de treino foi criado com sucesso.", [
        { text: "Bora treinar!", onPress: () => router.replace("/(tabs)/home") }
      ]);

    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      Alert.alert("Erro", "Não foi possível salvar seu perfil. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const SummaryItem = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
    <View style={styles.itemCard}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={24} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
      <MaterialIcons name="check-circle" size={20} color={Colors.correct} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />
        
        <View style={styles.content}>
          <View style={styles.topSection}>
            <Text style={styles.question}>Tudo pronto!</Text>
            <Text style={styles.subtitle}>
              Revisamos suas respostas e montamos o perfil ideal para você.
            </Text>
          </View>
          
          <ScrollView 
            style={styles.scroll} 
            contentContainerStyle={{ gap: Spacing.md, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <SummaryItem 
              label="Nível de Experiência" 
              value={formatText(data.nivel_experiencia)} 
              icon="star" 
            />
            <SummaryItem 
              label="Frequência" 
              value={`${data.dias_treino || 3} dias / sem`} 
              icon="calendar-today" 
            />
            <SummaryItem 
              label="Duração" 
              value={`${data.duracao_treino || 60} minutos`} 
              icon="timer" 
            />
            <SummaryItem 
              label="Estilo de Treino" 
              value={formatText(data.preferencia_treino)} 
              icon="fitness-center" 
            />
            <SummaryItem 
              label="Foco Muscular" 
              value={data.foco_muscular?.length ? `${data.foco_muscular.length} grupos` : "Geral"} 
              icon="accessibility" 
            />
            <SummaryItem 
              label="Limitações" 
              value={data.lesoes?.includes('nenhuma') ? "Nenhuma" : (data.lesoes?.join(", ") || "Nenhuma")} 
              icon="medical-services" 
            />
          </ScrollView>
        </View>

        <View style={styles.footer}>
            <Button 
                title={loading ? "Salvando..." : "Concluir Setup"} 
                onPress={handleFinish} 
                bgColor={Colors.primary} 
                color={Colors.bg}
                
            />
            {!loading && (
              <Button 
                  title="Revisar" 
                  onPress={() => router.back()} 
                  bgColor="transparent" 
                  color={Colors.subtext}
              />
            )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.lg },
  topSection: { marginTop: 20, marginBottom: 30, alignItems: "center", gap: 10 },
  question: { ...Texts.title, fontSize: 28, textAlign: "center" },
  subtitle: { ...Texts.body, color: Colors.subtext, textAlign: "center" },
  scroll: { flex: 1 },
  
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgMedium,
    padding: Spacing.md,
    borderRadius: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: {
    ...Texts.subtext,
    fontSize: 12,
    marginBottom: 2,
  },
  itemValue: {
    ...Texts.bodyBold,
    color: Colors.text,
    fontSize: 16,
  },

  footer: { 
    paddingHorizontal: Spacing.lg, 
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
  },
});