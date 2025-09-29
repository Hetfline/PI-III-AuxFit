import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatLayout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Chat IA</Text>
      <Text style={styles.subtitle}>Seu assistente fitness inteligente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#B0B0B0',
    fontSize: 16,
  },
});