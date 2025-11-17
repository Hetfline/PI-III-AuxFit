import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Svg, {
  Path,
  Circle,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { Colors } from '@/constants/Styles';
import { styles, CHART_WIDTH, CHART_HEIGHT } from '@/components/profile/WeightCharts/styles';
import { DataPoint, MetricConfig } from '@/components/profile/WeightCharts/types';

interface ChartProps {
  data: DataPoint[];
  metricConfig: MetricConfig;
  formatDate: (date: string) => string;
}

/**
 * SVG Chart component for visualizing metric data over time
 */
export const Chart: React.FC<ChartProps> = ({ data, metricConfig, formatDate }) => {
  // Calculate min/max values for chart scale
  const { minValue, maxValue } = useMemo(() => {
    if (data.length === 0) return { minValue: 0, maxValue: 100 };

    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1 || 1;

    return {
      minValue: min - padding,
      maxValue: max + padding,
    };
  }, [data]);

  // Create path for chart line
  const createPath = () => {
    if (data.length === 0) return '';

    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * (CHART_WIDTH - 60) + 40;
        const y =
          CHART_HEIGHT -
          ((item.value - minValue) / (maxValue - minValue)) * (CHART_HEIGHT - 50) -
          30;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    return points;
  };

  // Get X-axis labels
  const getXAxisLabels = () => {
    if (data.length === 0) return { start: '', middle: '', end: '' };

    return {
      start: formatDate(data[0].date),
      middle: formatDate(data[Math.floor(data.length / 2)].date),
      end: formatDate(data[data.length - 1].date),
    };
  };

  const xLabels = getXAxisLabels();

  if (data.length === 0) {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.emptyChart}>
          <Text style={styles.emptyChartText}>
            Nenhum dado disponível para o período selecionado
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={metricConfig.color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={metricConfig.color} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Horizontal grid lines */}
        <Line
          x1={40}
          y1={30}
          x2={CHART_WIDTH - 20}
          y2={30}
          stroke={Colors.bgLight}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <Line
          x1={40}
          y1={95}
          x2={CHART_WIDTH - 20}
          y2={95}
          stroke={Colors.bgLight}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <Line
          x1={40}
          y1={160}
          x2={CHART_WIDTH - 20}
          y2={160}
          stroke={Colors.bgLight}
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Y-axis labels */}
        <SvgText x={5} y={35} fill={Colors.subtext} fontSize="11" fontWeight="500">
          {maxValue.toFixed(metricConfig.unit === '%' ? 1 : 0)}
          {metricConfig.unit}
        </SvgText>
        <SvgText x={5} y={100} fill={Colors.subtext} fontSize="11" fontWeight="500">
          {((maxValue + minValue) / 2).toFixed(metricConfig.unit === '%' ? 1 : 0)}
          {metricConfig.unit}
        </SvgText>
        <SvgText x={5} y={165} fill={Colors.subtext} fontSize="11" fontWeight="500">
          {minValue.toFixed(metricConfig.unit === '%' ? 1 : 0)}
          {metricConfig.unit}
        </SvgText>

        {/* Chart line */}
        <Path
          d={createPath()}
          fill="none"
          stroke={metricConfig.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Highlighted point at the end */}
        {(() => {
          const lastIndex = data.length - 1;
          const x = (lastIndex / (data.length - 1)) * (CHART_WIDTH - 60) + 40;
          const y =
            CHART_HEIGHT -
            ((data[lastIndex].value - minValue) / (maxValue - minValue)) *
            (CHART_HEIGHT - 50) -
            30;

          return (
            <>
              <Circle cx={x} cy={y} r="6" fill={metricConfig.color} />
              <Circle cx={x} cy={y} r="3" fill={Colors.bg} />
            </>
          );
        })()}

        {/* X-axis labels */}
        <SvgText x={40} y={195} fill={Colors.subtext} fontSize="11">
          {xLabels.start}
        </SvgText>
        <SvgText
          x={CHART_WIDTH / 2}
          y={195}
          fill={Colors.subtext}
          fontSize="11"
          textAnchor="middle"
        >
          {xLabels.middle}
        </SvgText>
        <SvgText
          x={CHART_WIDTH - 20}
          y={195}
          fill={Colors.subtext}
          fontSize="11"
          textAnchor="end"
        >
          {xLabels.end}
        </SvgText>
      </Svg>
    </View>
  );
};