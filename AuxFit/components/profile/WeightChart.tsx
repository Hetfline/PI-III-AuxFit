import React, { useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors, Spacing, Texts } from '@/constants/Styles';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - (Spacing.md * 4); 
const CHART_HEIGHT = 200;

interface DataPoint {
  date: string;
  value: number;
}

interface WeightChartProps {
  data: DataPoint[];
  color: string;
  unit: string;
}

export default function WeightChart({ data, color, unit }: WeightChartProps) {
  // 1. Calcula os valores mínimos e máximos para a escala Y
  const { minValue, maxValue } = useMemo(() => {
    if (data.length === 0) return { minValue: 0, maxValue: 100 };
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    // Adiciona um "respiro" de 10% acima e abaixo (ou 5kg se for apenas um ponto)
    const padding = (max - min) * 0.1 || (min * 0.05); 
    return { 
      minValue: min - padding, 
      maxValue: max + padding 
    };
  }, [data]);

  // 2. Cria o caminho (path) da linha do gráfico
  const createPath = () => {
    if (data.length === 0) return '';
    return data.map((item, index) => {
        // CORREÇÃO: Evita divisão por zero se houver apenas 1 ponto
        const divisor = data.length > 1 ? data.length - 1 : 1; 
        
        // Eixo X: Distribui os pontos uniformemente (se só 1 ponto, fica no meio ou esquerda)
        const x = data.length > 1 
            ? (index / divisor) * (CHART_WIDTH - 60) + 40
            : (CHART_WIDTH / 2) + 10; // Centraliza se for ponto único
        
        // Eixo Y
        const safeRange = (maxValue - minValue) || 1; // Evita divisão por zero no Y
        const y = CHART_HEIGHT - ((item.value - minValue) / safeRange) * (CHART_HEIGHT - 50) - 30;
        
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    // Ajuste para fuso horário
    const dView = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[dView.getMonth()]} ${dView.getDate()}`;
  };

  if (data.length === 0) return null;

  return (
    <View style={styles.chartContainer}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Linhas de Grade */}
        {[30, 95, 160].map((y, i) => (
          <Line key={i}
            x1={40} y1={y}
            x2={CHART_WIDTH} y2={y}
            stroke={Colors.bgLight} 
            strokeWidth="1" 
            strokeDasharray="4 4"
          />
        ))}

        {/* Labels Eixo Y */}
        <SvgText x={5} y={35} fill={Colors.subtext} fontSize="10" fontWeight="600">
            {maxValue.toFixed(unit === '%' ? 1 : 0)}{unit}
        </SvgText>
        <SvgText x={5} y={100} fill={Colors.subtext} fontSize="10" fontWeight="600">
            {((maxValue + minValue) / 2).toFixed(unit === '%' ? 1 : 0)}{unit}
        </SvgText>
        <SvgText x={5} y={165} fill={Colors.subtext} fontSize="10" fontWeight="600">
            {minValue.toFixed(unit === '%' ? 1 : 0)}{unit}
        </SvgText>

        {/* Linha do Gráfico (Só desenha se tiver > 1 ponto ou usa Path simples para 1 ponto) */}
        <Path
          d={createPath()}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Pontos de Destaque */}
        {data.map((item, index) => {
             // Lógica de X igual à do createPath para alinhar os pontos
             const divisor = data.length > 1 ? data.length - 1 : 1;
             const x = data.length > 1 
                ? (index / divisor) * (CHART_WIDTH - 60) + 40
                : (CHART_WIDTH / 2) + 10;

             const safeRange = (maxValue - minValue) || 1;
             const y = CHART_HEIGHT - ((item.value - minValue) / safeRange) * (CHART_HEIGHT - 50) - 30;

             // Mostra ponto se for o último OU se for o único
             const isLast = index === data.length - 1;
             if (!isLast) return null;

             return (
                <React.Fragment key={index}>
                  <Circle cx={x} cy={y} r="6" fill={color} />
                  <Circle cx={x} cy={y} r="3" fill={Colors.bg} />
                </React.Fragment>
             );
        })}

        {/* Labels Eixo X */}
        {data.length === 1 ? (
             // Label Centralizado para 1 ponto
             <SvgText x={(CHART_WIDTH / 2) + 10} y={195} fill={Colors.subtext} fontSize="10" textAnchor="middle">
                {formatDate(data[0].date)}
             </SvgText>
        ) : (
            <>
                <SvgText x={40} y={195} fill={Colors.subtext} fontSize="10">
                    {formatDate(data[0].date)}
                </SvgText>
                <SvgText x={CHART_WIDTH} y={195} fill={Colors.subtext} fontSize="10" textAnchor="end">
                    {formatDate(data[data.length - 1].date)}
                </SvgText>
            </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});