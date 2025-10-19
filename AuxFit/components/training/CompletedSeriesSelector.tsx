import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definindo as cores como constantes
const VARIANTS = {
  green: {
    selectedBackground: 'hsl(122, 39%, 53%)',
    unselectedBorder: 'hsl(0, 0%, 30%)',
    checkmarkColor: 'hsl(0, 0%, 95%)',
  },
  white: {
    selectedBackground: 'hsl(0, 0%, 95%)',
    unselectedBorder: 'hsl(0, 0%, 30%)',
    checkmarkColor: 'hsl(122, 39%, 53%)',
  },
} as const;

type Variant = keyof typeof VARIANTS;

interface CompletedSeriesSelectorProps {
  size?: number;
  initialValue?: boolean;
  variant?: Variant;
  onToggle?: (value: boolean) => void;
}

const CompletedSeriesSelector: React.FC<CompletedSeriesSelectorProps> = ({
  size = 25,
  initialValue = false,
  variant = 'green',
  onToggle,
}) => {
  const [selected, setSelected] = useState(initialValue);

  const toggle = () => {
    const newValue = !selected;
    setSelected(newValue);
    if (onToggle) onToggle(newValue);
  };

  const colors = VARIANTS[variant];

  return (
    <TouchableOpacity
      onPress={toggle}
      style={[
        styles.container,
        selected
          ? { backgroundColor: colors.selectedBackground }
          : { borderColor: colors.unselectedBorder, borderWidth: 2 },
      ]}
      activeOpacity={0.8}
    >
      {selected && <Ionicons name="checkmark" size={size} color={colors.checkmarkColor} />}
    </TouchableOpacity>
  );
};

export default CompletedSeriesSelector;

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
