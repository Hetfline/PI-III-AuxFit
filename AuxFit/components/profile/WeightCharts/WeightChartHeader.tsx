import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/components/profile/WeightCharts/styles';
import { MetricConfig } from '@/components/profile/WeightCharts/types';

interface WeightChartHeaderProps {
  currentValue: number;
  lastMeasurementDate: string;
  metricConfig: MetricConfig;
  formatDate: (date: string) => string;
}

export const WeightChartHeader: React.FC<WeightChartHeaderProps> = ({
  currentValue,
  lastMeasurementDate,
  metricConfig,
  formatDate,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.label}>{metricConfig.label}</Text>
      <Text style={styles.currentWeight}>
        {currentValue.toFixed(metricConfig.unit === '%' ? 1 : 2)}
        {metricConfig.unit}
      </Text>
      <Text style={styles.date}>
        Última medição: {formatDate(lastMeasurementDate)}
      </Text>
    </View>
  );
};