import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/components/profile/WeightCharts/styles';
import { MetricType } from '@/components/profile/WeightCharts/types';

interface MetricSelectorProps {
  selectedMetric: MetricType;
  onSelectMetric: (metric: MetricType) => void;
}

const METRICS: { value: MetricType; label: string }[] = [
  { value: 'weight', label: 'Peso' },
  { value: 'bf', label: '% Gordura' },
];

export const MetricSelector: React.FC<MetricSelectorProps> = ({
  selectedMetric,
  onSelectMetric,
}) => {
  return (
    <View style={styles.metricSelector}>
      {METRICS.map(({ value, label }) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.metricButton,
            selectedMetric === value && styles.metricButtonActive,
          ]}
          onPress={() => onSelectMetric(value)}
        >
          <Text
            style={[
              styles.metricText,
              selectedMetric === value && styles.metricTextActive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};