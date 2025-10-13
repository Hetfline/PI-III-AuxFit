import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  type?: 'error' | 'success' | 'warning';
}

export default function Toast({ message, visible, onHide, type = 'warning' }: ToastProps) {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(-50);

  useEffect(() => {
    if (visible) {
      // Mostrar
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Esconder após 3 segundos
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const getIconName = () => {
    switch (type) {
      case 'error':
        return 'error';
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'error':
        return Colors.incorrect;
      case 'success':
        return Colors.correct;
      case 'warning':
        return Colors.warning;
      default:
        return Colors.secondary;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <MaterialIcons name={getIconName()} size={24} color={getColor()} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.bgMedium,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  message: {
    ...Texts.body,
    flex: 1,
  },
});