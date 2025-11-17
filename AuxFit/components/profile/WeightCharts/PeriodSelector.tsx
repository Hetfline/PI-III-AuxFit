import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { PeriodType } from '@/components/profile/WeightCharts/types';

interface PeriodSelectorProps {
  selectedPeriod: PeriodType;
  onSelectPeriod: (period: PeriodType) => void;
}

const PERIODS: { value: PeriodType; label: string }[] = [
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: '1A', label: '1A' },
  { value: 'ALL', label: 'Tudo' },
];

/**
 * Component for selecting time period to display in chart
 */
export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onSelectPeriod,
}) => {
  return (
    <View style={styles.periodContainer}>
      {PERIODS.map(({ value, label }) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.periodButton,
            selectedPeriod === value && styles.periodButtonActive,
          ]}
          onPress={() => onSelectPeriod(value)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === value && styles.periodButtonTextActive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};