import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, Texts } from '@/constants/Styles';

export default function ExerciciosSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste</Text>
      <Text style={styles.item}>- Agachamento</Text>
      <Text style={styles.item}>- Supino reto</Text>
      <Text style={styles.item}>- Remada curvada</Text>
      <Text style={styles.item}>- Desenvolvimento militar</Text>
      <Text style={styles.item}>- Bíceps com halteres</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: Spacing.sm,
  },
  item: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 4,
  },
});
