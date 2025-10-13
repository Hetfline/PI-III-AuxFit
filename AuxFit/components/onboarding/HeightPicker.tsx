import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface HeightPickerProps {
  selectedHeight: number;
  selectedDecimal: number;
  onHeightChange: (height: number) => void;
  onDecimalChange: (decimal: number) => void;
}

const ITEM_HEIGHT = 50;

export default function HeightPicker({
  selectedHeight,
  selectedDecimal,
  onHeightChange,
  onDecimalChange,
}: HeightPickerProps) {
  
  const heightScrollRef = useRef<ScrollView>(null);
  const decimalScrollRef = useRef<ScrollView>(null);

  // Alturas de 100 a 250 cm
  const heights = Array.from({ length: 151 }, (_, i) => i + 100);
  const decimals = Array.from({ length: 10 }, (_, i) => i);

  // Scroll inicial para o item selecionado
  useEffect(() => {
    setTimeout(() => {
      const heightIndex = heights.indexOf(selectedHeight);
      heightScrollRef.current?.scrollTo({ 
        y: heightIndex * ITEM_HEIGHT, 
        animated: false 
      });
      decimalScrollRef.current?.scrollTo({ 
        y: selectedDecimal * ITEM_HEIGHT, 
        animated: false 
      });
    }, 100);
  }, []);

  const handleHeightScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newHeight = heights[index];
    if (newHeight && newHeight !== selectedHeight) {
      onHeightChange(newHeight);
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
        {/* Coluna de Altura (inteiro) */}
        <ScrollView
          ref={heightScrollRef}
          style={styles.column}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleHeightScroll}
          onScrollEndDrag={handleHeightScroll}
        >
          {heights.map((height) => (
            <View key={height} style={[styles.itemWrapper, { height: ITEM_HEIGHT }]}>
              <Text 
                style={[styles.item, selectedHeight === height && styles.selectedItem]}
                numberOfLines={1}
              >
                {height}
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
          <Text style={styles.unit}>cm</Text>
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