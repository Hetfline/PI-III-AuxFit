import { StyleSheet, Text, View, Pressable, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Button from "./Button";
import { api } from "@/services/api";

export default function WeightIn() {
  const [weight, setWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);
  const [recordId, setRecordId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Busca peso de hoje e dados do usuário (meta)
      const [todayData, userData] = await Promise.all([
        api.getTodayWaterProgress().catch(() => null),
        api.me().catch(() => null)
      ]);

      // 1. Configura Peso Atual
      if (todayData) {
        // Se já tem peso hoje, usa ele. Se não, tenta pegar o peso inicial do usuário ou 0.
        const currentWeight = Number(todayData.peso) > 0 
            ? Number(todayData.peso) 
            : (Number(userData?.peso_inicial) || 0);
            
        setWeight(currentWeight);
        setRecordId(todayData.id);
      } else if (userData) {
         // Se não tem registro de hoje ainda, usa o peso inicial
         setWeight(Number(userData.peso_inicial) || 0);
      }

      // 2. Configura Meta (Lógica unificada com GeneralTab)
      if (userData) {
        let meta = Number(userData.peso_meta);
        
        // Se peso_meta for 0 ou inválido, tenta pegar do objetivo (ex: "70kg" -> 70)
        if (isNaN(meta) || meta === 0) {
            meta = parseFloat(userData.objetivo);
        }
        
        if (!isNaN(meta) && meta > 0) {
            setTargetWeight(meta);
        }
      }

    } catch (error) {
      console.log("Erro ao carregar dados de peso", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Se não tiver ID (caso raro de falha na criação automática), não salva
    if (!recordId) {
        // Tenta recarregar para obter o ID ou criar
        await loadData();
        if(!recordId) return; 
    }

    try {
      setSaving(true);
      await api.saveWeight(recordId, weight);
      Alert.alert("Sucesso", "Peso atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar peso.");
    } finally {
      setSaving(false);
    }
  };

  // Formatação
  let formattedWeight = weight.toLocaleString('pt-BR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let formattedTarget = targetWeight.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const addWeight = () => {
    setWeight(prev => parseFloat((prev + 0.1).toFixed(2)));
  };

  const removeWeight = () => {
    setWeight(prev => parseFloat((prev - 0.1).toFixed(2)));
  };

  if (loading) {
    return (
      <View style={[styles.container, { height: 150 }]}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={Texts.title}>Peso</Text>
      
      <Text style={Texts.body}>
        Objetivo: <Text style={[Texts.body, { color: Colors.correct }]}>
          {targetWeight > 0 ? `${formattedTarget} Kg` : "Definir meta"}
        </Text>
      </Text>

      <View style={styles.weightControls}>
        <Pressable onPress={removeWeight} hitSlop={15}>
          <MaterialIcons
            name="remove-circle-outline"
            size={32}
            color={Colors.incorrect}
          />
        </Pressable>
        
        <Text style={Texts.subtitle}>
          Peso:{" "}
          <Text style={[Texts.subtitle, { color: Colors.correct }]}>
            {formattedWeight}
          </Text>
        </Text>
        
        <Pressable onPress={addWeight} hitSlop={15}>
          <MaterialIcons
            name="add-circle-outline"
            size={32}
            color={Colors.primary}
          />
        </Pressable>
      </View>

      <Button 
        title={saving ? "Salvando..." : "Atualizar Peso"} 
        onPress={handleSave} 
        icon="check"
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.md
  },
  weightControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md
  },
});