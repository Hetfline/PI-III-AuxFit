import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface WeightCardsProps {
  initialWeight: number;
  currentWeight: number;
  goalWeight: number;
}

export default function WeightCards({ initialWeight, currentWeight, goalWeight }: WeightCardsProps) {
  return (
    <View style={styles.container}>
      
      {/* Peso Inicial */}
      <View style={styles.card}>
        <Text style={styles.weight}>{initialWeight.toFixed(1)} Kg</Text>
        <Text style={styles.label}>Peso inicial</Text>
      </View>

      {/* Peso Atual */}
      <View style={styles.card}>
        <Text style={styles.weight}>{currentWeight.toFixed(1)} Kg</Text>
        <Text style={styles.label}>Peso atual</Text>
      </View>

      {/* Peso Desejado */}
      <View style={styles.card}>
        <Text style={styles.weight}>{goalWeight.toFixed(1)} Kg</Text>
        <Text style={styles.label}>Peso desejado</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  weight: {
    ...Texts.title,
    fontSize: 20,
  },
  label: {
    ...Texts.subtext,
    fontSize: 12,
  },
});