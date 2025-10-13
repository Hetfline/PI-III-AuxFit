import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface WeightPickerProps {
  selectedWeight: number; // em kg (ex: 98)
  selectedDecimal: number; // 0-9
  onWeightChange: (weight: number) => void;
  onDecimalChange: (decimal: number) => void;
}

const ITEM_HEIGHT = 50;

export default function WeightPicker({
  selectedWeight,
  selectedDecimal,
  onWeightChange,
  onDecimalChange,
}: WeightPickerProps) {
  
  const weightScrollRef = useRef<ScrollView>(null);
  const decimalScrollRef = useRef<ScrollView>(null);

  // Pesos de 30 a 200 kg
  const weights = Array.from({ length: 171 }, (_, i) => i + 30);
  const decimals = Array.from({ length: 10 }, (_, i) => i);

  // Scroll inicial para o item selecionado
  useEffect(() => {
    setTimeout(() => {
      const weightIndex = weights.indexOf(selectedWeight);
      weightScrollRef.current?.scrollTo({ 
        y: weightIndex * ITEM_HEIGHT, 
        animated: false 
      });
      decimalScrollRef.current?.scrollTo({ 
        y: selectedDecimal * ITEM_HEIGHT, 
        animated: false 
      });
    }, 100);
  }, []);

  const handleWeightScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newWeight = weights[index];
    if (newWeight && newWeight !== selectedWeight) {
      onWeightChange(newWeight);
    }
  };

  const handleDecimalScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newDecimal = decimals[index];
    if (newDecimal !== undefined && newDecimal !== selectedDecimal) {
      onDecimalChange(newDecimal);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Indicador central */}
      <View style={styles.centerIndicator} />

      <View style={styles.pickersRow}>
        {/* Coluna de Peso (inteiro) */}
        <ScrollView
          ref={weightScrollRef}
          style={styles.column}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleWeightScroll}
          onScrollEndDrag={handleWeightScroll}
        >
          {weights.map((weight) => (
            <View key={weight} style={[styles.itemWrapper, { height: ITEM_HEIGHT }]}>
              <Text 
                style={[styles.item, selectedWeight === weight && styles.selectedItem]}
                numberOfLines={1}
              >
                {weight}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Vírgula fixa */}
        <View style={styles.separatorWrapper}>
          <Text style={styles.separator}>,</Text>
        </View>

        {/* Coluna de Decimal */}
        <ScrollView
          ref={decimalScrollRef}
          style={styles.column}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleDecimalScroll}
          onScrollEndDrag={handleDecimalScroll}
        >
          {decimals.map((decimal) => (
            <View key={decimal} style={[styles.itemWrapper, { height: ITEM_HEIGHT }]}>
              <Text 
                style={[styles.item, selectedDecimal === decimal && styles.selectedItem]}
                numberOfLines={1}
              >
                {decimal}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Unidade fixa */}
        <View style={styles.unitWrapper}>
          <Text style={styles.unit}>Kg</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    position: 'relative',
  },
  centerIndicator: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    marginTop: -ITEM_HEIGHT / 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    zIndex: 1,
    pointerEvents: 'none',
  },
  pickersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: '100%',
  },
  column: {
    width: 70,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  item: {
    ...Texts.body,
    fontSize: 16,
    color: Colors.subtext,
    textAlign: 'center',
  },
  selectedItem: {
    color: Colors.text,
    fontSize: 17,
    fontFamily: 'MontserratBold',
  },
  separatorWrapper: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    ...Texts.body,
    fontSize: 17,
    color: Colors.text,
    fontFamily: 'MontserratBold',
  },
  unitWrapper: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Spacing.xs,
  },
  unit: {
    ...Texts.body,
    fontSize: 17,
    color: Colors.text,
  },
});