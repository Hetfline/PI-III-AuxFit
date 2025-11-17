import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Styles';
import { styles } from '@/components/profile/WeightCharts/styles';
import { Stats, MetricType } from '@/components/profile/WeightCharts/types';

interface WeightStatsProps {
  stats: Stats;
  selectedMetric: MetricType;
  onPressGoal?: () => void;
}

/**
 * Component displaying metric statistics (goal, remaining, progress/variation)
 */
export const WeightStats: React.FC<WeightStatsProps> = ({
  stats,
  selectedMetric,
  onPressGoal,
}) => {
  if (selectedMetric === 'weight') {
    return (
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statItem} onPress={onPressGoal}>
          <Text style={styles.statLabel}>Meta</Text>
          <Text style={styles.statValue}>{stats.goal}kg</Text>
        </TouchableOpacity>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Faltam</Text>
          <Text
            style={[
              styles.statValue,
              { color: (stats.remaining ?? 0) > 0 ? Colors.primary : Colors.incorrect },
            ]}
          >
            {(stats.remaining ?? 0) > 0 ? '+' : ''}
            {(stats.remaining ?? 0).toFixed(1)}kg
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Progresso</Text>
          <Text style={styles.statValue}>{(stats.progress ?? 0).toFixed(0)}%</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Meta</Text>
        <Text style={styles.statValue}>
          {stats.goal}
          {stats.unit}
        </Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Variação</Text>
        <Text
          style={[
            styles.statValue,
            { color: stats.change < 0 ? Colors.primary : Colors.incorrect },
          ]}
        >
          {stats.change > 0 ? '+' : ''}
          {stats.change.toFixed(1)}
          {stats.unit}
        </Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Faltam</Text>
        <Text
          style={[
            styles.statValue,
            { color: (stats.remaining ?? 0) > 0 ? Colors.incorrect : Colors.primary },
          ]}
        >
          {Math.abs(stats.remaining ?? 0).toFixed(1)}
          {stats.unit}
        </Text>
      </View>
    </View>
  );
};