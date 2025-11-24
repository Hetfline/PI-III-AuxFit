import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { api } from "@/services/api";
import { useFocusEffect } from "expo-router";

interface ProgressData {
  date: string;
  volume: number;
}

export default function ProfileWorkoutTab() {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadVolumeHistory();
    }, [])
  );

  const loadVolumeHistory = async () => {
    try {
      setLoading(true);
      // Busca todo o histórico de progresso
      const history = await api.getProgressHistory().catch(() => []);

      if (Array.isArray(history)) {
        // Filtra apenas dias onde houve treino (volume > 0)
        const formatted = history
          .filter(
            (h: any) => h.volume_total !== null && Number(h.volume_total) > 0
          )
          .map((h: any) => ({
            date: h.data_registro,
            volume: Number(h.volume_total),
          }))
          // Ordena por data (Antigo -> Recente) para o gráfico
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          // Pega apenas os últimos 7 registros de treino para caber na tela
          .slice(-7);

        setProgressData(formatted);
      }
    } catch (e) {
      console.log("Erro ao carregar volume:", e);
    } finally {
      setLoading(false);
    }
  };

  // Estatísticas Seguras (Evita NaN em arrays vazios)
  const volumes = progressData.map((d) => d.volume);
  const maxVolume = volumes.length > 0 ? Math.max(...volumes) : 0;
  const minVolume = volumes.length > 0 ? Math.min(...volumes) : 0;

  const totalVolume = volumes.reduce((sum, v) => sum + v, 0);
  const avgVolume =
    volumes.length > 0 ? Math.round(totalVolume / volumes.length) : 0;
  const lastVolume = volumes.length > 0 ? volumes[volumes.length - 1] : 0;

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      // Ajuste de visualização simples dia/mês
      const dView = new Date(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate()
      );
      return `${dView.getDate()}/${dView.getMonth() + 1}`;
    } catch {
      return "-/-";
    }
  };

  if (loading)
    return (
      <ActivityIndicator style={{ marginTop: 20 }} color={Colors.primary} />
    );

  return (
    <View style={styles.container}>
      {/* Estatísticas Rápidas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={[Texts.subtext, styles.statLabel]}>Último Treino</Text>
          <Text style={[Texts.title, styles.statValue]}>
            {lastVolume.toLocaleString("pt-BR")}
          </Text>
          <Text style={[Texts.subtext, { fontSize: 12 }]}>kg totais</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[Texts.subtext, styles.statLabel]}>Média</Text>
          <Text style={[Texts.title, styles.statValue]}>
            {avgVolume.toLocaleString("pt-BR")}
          </Text>
          <Text style={[Texts.subtext, { fontSize: 12 }]}>kg / treino</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={[Texts.subtext, styles.statLabel]}>Recorde</Text>
          <Text
            style={[Texts.title, styles.statValue, { color: Colors.primary }]}
          >
            {maxVolume.toLocaleString("pt-BR")}
          </Text>
          <Text style={[Texts.subtext, { fontSize: 12 }]}>kg num dia</Text>
        </View>
      </View>

      {/* Gráfico de Volume (Barras CSS Simples) */}
      <View style={styles.chartSection}>
        <Text style={[Texts.subtitle, { marginBottom: Spacing.md }]}>
          Volume Total (Últimos Treinos)
        </Text>

        <View style={styles.chartContainer}>
          {progressData.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={Texts.subtext}>
                Nenhum dado de treino encontrado.
              </Text>
              <Text style={[Texts.subtext, { fontSize: 12, marginTop: 4 }]}>
                Finalize um treino para ver seu progresso!
              </Text>
            </View>
          ) : (
            <>
              {/* Eixo Y Simplificado */}
              <View style={styles.yAxis}>
                <Text style={styles.axisLabel}>
                  {maxVolume > 1000
                    ? (maxVolume / 1000).toFixed(1) + "k"
                    : maxVolume}
                </Text>
                <Text style={styles.axisLabel}>
                  {minVolume > 1000
                    ? (minVolume / 1000).toFixed(1) + "k"
                    : minVolume}
                </Text>
              </View>

              <View style={styles.barsContainer}>
                {progressData.map((data, index) => {
                  // Calcula a altura relativa da barra
                  // Se todos volumes forem iguais, mostra 50% de altura. Se max for 0, evita divisão por zero.
                  const range = maxVolume;
                  const safeRange = range === 0 ? 1 : range;
                  const heightPercentage = (data.volume / safeRange) * 100;

                  const isLast = index === progressData.length - 1;

                  return (
                    <View key={index} style={styles.barWrapper}>
                      {/* Container da Barra */}
                      <View style={styles.barContainer}>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: `${Math.max(heightPercentage, 10)}%`, // Mínimo 10% para visibilidade
                              backgroundColor: isLast
                                ? Colors.primary
                                : Colors.secondary,
                            },
                          ]}
                        ></View>
                      </View>
                      {/* Data */}
                      <Text style={styles.barLabel}>
                        {formatDate(data.date)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Spacing.sm },
  statsContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.bgMedium,
    borderRadius: 12,
    padding: Spacing.sm,
    alignItems: "center",
  },
  statLabel: { fontSize: 12, textAlign: "center", marginBottom: 4 },
  statValue: { fontSize: 18, marginBottom: 2 },
  chartSection: {
    backgroundColor: Colors.bgMedium,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  chartContainer: { flexDirection: "row", height: 180, marginTop: Spacing.md },
  yAxis: {
    width: 40,
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingRight: 8,
  },
  axisLabel: { ...Texts.subtext, fontSize: 10, textAlign: "right" },
  barsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
    paddingBottom: 20,
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bar: {
    minWidth: 50,
    maxWidth: 120,
    width: "80%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    ...Texts.subtext,
    fontSize: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
