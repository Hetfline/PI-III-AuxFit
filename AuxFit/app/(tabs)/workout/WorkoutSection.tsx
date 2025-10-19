import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '@/constants/Styles';
import CompletedSeriesSelector from '../../../components/training/CompletedSeriesSelector';
import AboutSpecificExercise from '../../../components/training/AboutSpecificExercise';
import PerformExercise from '../../../components/training/PerformExercise';

export default function WorkoutSection() {
  return (
    <View style={styles.container}>
      <CompletedSeriesSelector variant="green" />
      <CompletedSeriesSelector variant="white" />

      <AboutSpecificExercise 
        description="Exercício clássico de peito, realizado deitado em banco reto, utilizando barra.
                     Trabalha principalmente o peitoral maior, além de deltoides anteriores e tríceps.
                     É um dos movimentos básicos de força e hipertrofia para a parte superior do corpo. "
      />

      <PerformExercise 
        description={`Deite-se no banco reto e posicione os pés firmes no chão.
                    Segure a barra com pegada um pouco maior que a largura dos ombros.
                    Retire a barra do suporte e mantenha os braços estendidos acima do peito.
                    Desça a barra de forma controlada até encostar levemente no meio do peito.
                    Empurre a barra para cima até estender completamente os braços novamente.`} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
});
