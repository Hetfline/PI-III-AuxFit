import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Styles';
import { styles } from '@/components/profile/WeightCharts/styles';
import { HistoryEntry, MetricType } from '@/components/profile/WeightCharts/types';

interface WeightHistoryProps {
  historyData: HistoryEntry[];
  selectedMetric: MetricType;
  onPressSeeAll?: () => void;
}

/**
 * Component displaying recent measurement history
 */
export const WeightHistory: React.FC<WeightHistoryProps> = ({
  historyData,
  selectedMetric,
  onPressSeeAll,
}) => {
  return (
    <View style={styles.historySection}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Histórico Recente</Text>
        <TouchableOpacity onPress={onPressSeeAll}>
          <Text style={styles.seeAll}>Ver tudo</Text>
        </TouchableOpacity>
      </View>

      {historyData.length > 0 ? (
        historyData.map((entry, index) => (
          <View key={index} style={styles.historyItem}>
            <View>
              <Text style={styles.historyDate}>{entry.date}</Text>
              {entry.change !== 0 && (
                <Text
                  style={[
                    styles.historyChange,
                    {
                      color:
                        entry.change > 0 ? Colors.primary : Colors.incorrect,
                    },
                  ]}
                >
                  {entry.change > 0 ? '+' : ''}
                  {entry.change.toFixed(2)}
                  {entry.unit}
                </Text>
              )}
            </View>
            <Text style={styles.historyValue}>
              {entry.value.toFixed(selectedMetric === 'bf' ? 1 : 2)}
              {entry.unit}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyHistoryText}>Nenhum registro ainda</Text>
      )}
    </View>
  );
};