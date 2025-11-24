import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import WeightIn from "@/components/universal/WeightIn";
import WeightChart from "./WeightChart";
import { api } from "@/services/api";
import { useFocusEffect } from "expo-router";

// Tipagem estrita para evitar erros de "implicitly any"
interface ChartDataPoint {
  date: string;
  value: number;
}

export default function ProfileGeneralTab() {
  const [weightData, setWeightData] = useState<ChartDataPoint[]>([]);
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [userMeta, setUserMeta] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
        loadData();
    }, [])
  );

  const loadData = async () => {
    try {
        setLoading(true);
        
        // 1. Buscando Histórico e Usuário em paralelo
        const [history, user] = await Promise.all([
            api.getProgressHistory().catch(() => []), // Se falhar, retorna array vazio
            api.me().catch(() => null) // Se falhar, retorna null
        ]);

        // 2. Processar Meta (Prioridade: peso_meta > objetivo > 70kg padrão)
        let meta = 70; 
        if (user) {
            if (user.peso_meta && Number(user.peso_meta) > 0) {
                meta = Number(user.peso_meta);
            } else if (user.objetivo && !isNaN(parseFloat(user.objetivo))) {
                meta = parseFloat(user.objetivo);
            }
        }
        setUserMeta(meta);

        // 3. Processar Histórico de Peso
        let cleanData: ChartDataPoint[] = [];
        
        if (Array.isArray(history) && history.length > 0) {
            cleanData = history
                .filter((h: any) => h.peso !== null && Number(h.peso) > 0) // Remove pesos zerados/nulos
                .map((h: any) => ({
                    date: h.data_registro,
                    value: Number(h.peso)
                }))
                // Ordena do mais antigo para o mais novo para o gráfico desenhar certo
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }

        // Fallback: Se não tem histórico, usa o peso inicial do cadastro
        if (cleanData.length === 0 && user && user.peso_inicial) {
            cleanData.push({
                date: user.created_at || new Date().toISOString(),
                value: Number(user.peso_inicial)
            });
        }

        setWeightData(cleanData);
        
        // Define peso atual (o último do array ordenado)
        if (cleanData.length > 0) {
            setCurrentWeight(cleanData[cleanData.length - 1].value);
        } else {
            setCurrentWeight(user?.peso_inicial || 0);
        }

    } catch (error) {
        console.log("Erro crítico no GeneralTab:", error);
    } finally {
        setLoading(false);
    }
  };

  // Cálculos Seguros
  const startWeight = weightData.length > 0 ? weightData[0].value : currentWeight;
  const change = currentWeight - startWeight;
  
  // CORREÇÃO AQUI: Substituído 'currentValue' por 'currentWeight'
  const remaining = Math.abs(currentWeight - userMeta);
  
  const lastDate = weightData.length > 0 ? weightData[weightData.length - 1].date : new Date().toISOString();

  // Formatador de Data Seguro
  const formatDate = (dt: string) => {
      try {
          const d = new Date(dt);
          return `${d.getDate()}/${d.getMonth() + 1}`;
      } catch { return "--/--"; }
  };

  if (loading) {
      return <ActivityIndicator style={{marginTop: 30}} color={Colors.primary} />;
  }

  return (
    <View style={styles.container}>
      {/* Componente de input de peso */}
      <View style={styles.card}>
        <WeightIn />
      </View>

      {/* Gráfico e Estatísticas */}
      <View style={styles.card}>
        <View style={styles.headerSection}>
          <Text style={styles.label}>PESO ATUAL</Text>
          <Text style={styles.currentValue}>
            {currentWeight > 0 ? currentWeight.toFixed(1) : "--"} kg
          </Text>
          <Text style={styles.lastDate}>Último registro: {formatDate(lastDate)}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Meta</Text>
            <Text style={styles.statValue}>{userMeta} kg</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Variação</Text>
            <Text style={[styles.statValue, { color: change <= 0 ? Colors.primary : Colors.incorrect }]}>
              {change > 0 ? "+" : ""}{change.toFixed(1)} kg
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Faltam</Text>
            <Text style={styles.statValue}>{remaining.toFixed(1)} kg</Text>
          </View>
        </View>

        {/* Renderização Condicional do Gráfico */}
        {weightData.length > 0 ? (
            <WeightChart data={weightData} color={Colors.primary} unit="kg" />
        ) : (
            <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={Texts.subtext}>Registre seu peso para ver o gráfico.</Text>
            </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.md, paddingBottom: 100 },
  card: { backgroundColor: Colors.bgMedium, borderRadius: 16, padding: Spacing.md },
  headerSection: { marginBottom: Spacing.md },
  label: { ...Texts.subtext, fontSize: 11, textTransform: "uppercase", marginBottom: 4 },
  currentValue: { ...Texts.title, fontSize: 30, marginBottom: 4 },
  lastDate: { ...Texts.subtext, fontSize: 12 },
  statsContainer: { flexDirection: "row", backgroundColor: Colors.bg, borderRadius: 16, padding: Spacing.md, marginBottom: Spacing.md, justifyContent: "space-around" },
  statItem: { alignItems: "center" },
  statLabel: { ...Texts.subtext, fontSize: 11, fontWeight: "600", marginBottom: 4 },
  statValue: { ...Texts.subtitle, fontSize: 18 },
  statDivider: { width: 1, backgroundColor: Colors.bgLight },
});