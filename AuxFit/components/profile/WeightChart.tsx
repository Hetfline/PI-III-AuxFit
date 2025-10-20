import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Spacing, Texts } from '@/constants/Styles';

// Tipagem para os dados que o gráfico espera
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

interface WeightChartProps {
  data: ChartData;
}

export default function WeightChart({ data }: WeightChartProps) {
  // Se não houver dados, exibe uma mensagem
  if (!data || data.datasets[0].data.length === 0) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Adicione uma pesagem para ver seu progresso.</Text>
      </View>
    );
  }
  
  // Configuração de cores e estilo do gráfico para o seu tema escuro
  const chartConfig = {
    backgroundColor: '#2A2F38',
    backgroundGradientFrom: '#2A2F38',
    backgroundGradientTo: '#2A2F38',
    decimalPlaces: 1, // Casas decimais para os valores do eixo Y
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Cor das linhas e legendas
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: Colors.primary, // Cor das bolinhas nos pontos de dados
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - Spacing.lg * 2} // Largura responsiva
        height={280}
        yAxisLabel=""
        yAxisSuffix=" kg"
        chartConfig={chartConfig}
        bezier // Deixa as linhas curvadas
        style={styles.chartStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartStyle: {
    borderRadius: 20,
  },
  placeholderContainer: {
    height: 280,
    backgroundColor: '#2A2F38',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...Texts.body,
    color: '#999999',
  },
});