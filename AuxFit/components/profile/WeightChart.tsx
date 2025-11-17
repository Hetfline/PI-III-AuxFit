import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Colors } from '@/constants/Styles';
import { WeightChartHeader } from '@/components/profile/WeightCharts/WeightChartHeader';
import { WeightStats } from '@/components/profile/WeightCharts/WeightStats';
import { PeriodSelector } from '@/components/profile/WeightCharts/PeriodSelector';
import { Chart } from '@/components/profile/WeightCharts/Chart';
import { MetricSelector } from '@/components/profile/WeightCharts/MetricSelector';
import { WeightHistory } from '@/components/profile/WeightCharts/WeightHistory';
import { AddMeasurementModal } from '@/components/profile/WeightCharts/AddMeasurementModal';
import { EditGoalModal } from '@/components/profile/WeightCharts/EditGoalModal';
import { styles } from '@/components/profile/WeightCharts/styles';
import {
    MetricType,
    PeriodType,
    MetricsData,
    DataPoint,
    Stats,
    MetricConfig,
    HistoryEntry,
} from '@/components/profile/WeightCharts/types';


export const WeightChart: React.FC = () => {
    const [selectedMetric, setSelectedMetric] = useState<MetricType>('weight');
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('3M');
    const [modalVisible, setModalVisible] = useState(false);
    const [goalWeight, setGoalWeight] = useState(70);
    const [showGoalModal, setShowGoalModal] = useState(false);

    const [metricsData, setMetricsData] = useState<MetricsData>({
        weight: [
            { date: '2024-08-15', value: 66.2 },
            { date: '2024-08-16', value: 66.4 },
            { date: '2024-08-17', value: 66.3 },
            { date: '2024-08-18', value: 66.5 },
        ],
        waist: [
            { date: '2024-08-15', value: 82 },
            { date: '2024-09-01', value: 81.5 },
            { date: '2024-09-15', value: 81 },
        ],
        bf: [
            { date: '2024-08-15', value: 18.5 },
            { date: '2024-09-01', value: 18.2 },
            { date: '2024-09-15', value: 17.8 },
        ],
    });

    const getFilteredData = useMemo((): DataPoint[] => {
        const data = metricsData[selectedMetric];
        const now = new Date('2024-11-03');
        let startDate: Date;

        switch (selectedPeriod) {
            case '1M':
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 1);
                break;
            case '3M':
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 3);
                break;
            case '6M':
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 6);
                break;
            case '1A':
                startDate = new Date(now);
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            case 'ALL':
                return data;
            default:
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 3);
        }

        return data.filter((item) => new Date(item.date) >= startDate);
    }, [selectedMetric, selectedPeriod, metricsData]);


    const stats = useMemo((): Stats => {
        if (selectedMetric !== 'weight') {
            const currentData = metricsData[selectedMetric];
            const currentValue = currentData[currentData.length - 1]?.value || 0;
            const firstValue = currentData[0]?.value || 0;
            const change = currentValue - firstValue;

            return {
                current: currentValue,
                change: change,
                unit: selectedMetric === 'waist' ? 'cm' : '%',
                goal: selectedMetric === 'waist' ? 75 : 15,
                remaining:
                    selectedMetric === 'waist' ? currentValue - 75 : currentValue - 15,
            };
        }

        const weightData = metricsData.weight;
        const currentWeight = weightData[weightData.length - 1]?.value || 0;
        const initialWeight = weightData[0]?.value || currentWeight;
        const remaining = goalWeight - currentWeight;
        const progress =
            ((currentWeight - initialWeight) / (goalWeight - initialWeight)) * 100;

        return {
            current: currentWeight,
            goal: goalWeight,
            remaining: remaining,
            progress: Math.min(Math.max(progress, 0), 100),
            change: currentWeight - initialWeight,
            unit: 'kg',
        };
    }, [selectedMetric, goalWeight, metricsData]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const months = [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
        ];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    const getMetricConfig = (): MetricConfig => {
        switch (selectedMetric) {
            case 'weight':
                return { label: 'Peso Atual', unit: 'kg', color: Colors.primary, goal: goalWeight };
            case 'bf':
                return { label: '% Gordura Atual', unit: '%', color: Colors.accent, goal: 15 };
            default:
                return { label: 'Valor Atual', unit: '', color: Colors.primary, goal: 0 };
        }
    };

    const metricConfig = getMetricConfig();


    const historyData = useMemo((): HistoryEntry[] => {
        const data = [...metricsData[selectedMetric]].reverse().slice(0, 5);
        return data.map((item, index, arr) => {
            const prevValue = arr[index + 1]?.value || item.value;
            const change = item.value - prevValue;
            return {
                date: formatDate(item.date),
                value: item.value,
                change: change,
                unit: selectedMetric === 'weight' ? 'kg' : selectedMetric === 'waist' ? 'cm' : '%',
            };
        });
    }, [metricsData, selectedMetric]);

    const handleAddMeasurement = (value: number) => {
        const newEntry: DataPoint = {
            date: new Date().toISOString().split('T')[0],
            value: value,
        };

        setMetricsData((prev) => ({
            ...prev,
            [selectedMetric]: [...prev[selectedMetric], newEntry],
        }));

        setModalVisible(false);
        Alert.alert('Sucesso', 'Medição adicionada com sucesso!');
    };

    const handleUpdateGoal = (value: number) => {
        setGoalWeight(value);
        setShowGoalModal(false);
        Alert.alert('Sucesso', 'Meta atualizada com sucesso!');
    };

    return (
        <View style={styles.container}>
            {/* Header with current value */}
            <WeightChartHeader
                currentValue={stats.current}
                lastMeasurementDate={
                    metricsData[selectedMetric][metricsData[selectedMetric].length - 1]
                        ?.date
                }
                metricConfig={metricConfig}
                formatDate={formatDate}
            />

            {/* Statistics */}
            <WeightStats
                stats={stats}
                selectedMetric={selectedMetric}
                onPressGoal={() => setShowGoalModal(true)}
            />

            {/* Period selector */}
            <PeriodSelector
                selectedPeriod={selectedPeriod}
                onSelectPeriod={setSelectedPeriod}
            />

            {/* Chart */}
            <Chart
                data={getFilteredData}
                metricConfig={metricConfig}
                formatDate={formatDate}
            />

            {/* Metric selector */}
            <MetricSelector
                selectedMetric={selectedMetric}
                onSelectMetric={setSelectedMetric}
            />

            {/* History */}
            <WeightHistory
                historyData={historyData}
                selectedMetric={selectedMetric}
                onPressSeeAll={() => {
                    // TODO: Navigate to full history screen
                    Alert.alert('Em breve', 'Tela de histórico completo em desenvolvimento');
                }}
            />

            {/* Add measurement button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Adicionar Medição</Text>
            </TouchableOpacity>

            {/* Add measurement modal */}
            <AddMeasurementModal
                visible={modalVisible}
                metricConfig={metricConfig}
                onClose={() => setModalVisible(false)}
                onSubmit={handleAddMeasurement}
            />

            {/* Edit goal modal */}
            <EditGoalModal
                visible={showGoalModal}
                currentGoal={goalWeight}
                onClose={() => setShowGoalModal(false)}
                onSubmit={handleUpdateGoal}
            />
        </View>
    );
};