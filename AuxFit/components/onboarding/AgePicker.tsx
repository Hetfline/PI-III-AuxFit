import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface BirthdatePickerProps {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const ITEM_HEIGHT = 50;

export default function BirthdatePicker({
  selectedDay,
  selectedMonth,
  selectedYear,
  onDayChange,
  onMonthChange,
  onYearChange,
}: BirthdatePickerProps) {
  
  const dayScrollRef = useRef<ScrollView>(null);
  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 99 + i); // Crescente: 1925, 1926... 2024
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Scroll inicial para o item selecionado
  useEffect(() => {
    setTimeout(() => {
      dayScrollRef.current?.scrollTo({ 
        y: (selectedDay - 1) * ITEM_HEIGHT, 
        animated: false 
      });
      monthScrollRef.current?.scrollTo({ 
        y: (selectedMonth - 1) * ITEM_HEIGHT, 
        animated: false 
      });
      const yearIndex = years.indexOf(selectedYear);
      yearScrollRef.current?.scrollTo({ 
        y: yearIndex * ITEM_HEIGHT, 
        animated: false 
      });
    }, 100);
  }, []);

  const handleDayScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newDay = days[index];
    if (newDay && newDay !== selectedDay) {
      onDayChange(newDay);
    }
  };

  const handleMonthScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newMonth = index + 1;
    if (newMonth >= 1 && newMonth <= 12 && newMonth !== selectedMonth) {
      onMonthChange(newMonth);
    }
  };

  const handleYearScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newYear = years[index];
    if (newYear && newYear !== selectedYear) {
      onYearChange(newYear);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Indicador central */}
      <View style={styles.centerIndicator} />

      <View style={styles.pickersRow}>
        {/* Coluna de Dia */}
        <ScrollView
          ref={dayScrollRef}
          style={styles.column}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleDayScroll}
          onScrollEndDrag={handleDayScroll}
        >
          {days.map((day) => (
            <View key={day} style={[styles.itemWrapper, { height: ITEM_HEIGHT }]}>
              <Text 
                style={[styles.item, selectedDay === day && styles.selectedItem]}
                numberOfLines={1}
              >
                {day}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Coluna de Mês */}
        <ScrollView
          ref={monthScrollRef}
          style={styles.column}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleMonthScroll}
          onScrollEndDrag={handleMonthScroll}
        >
          {months.map((month, index) => (
            <View key={index} style={[styles.itemWrapper, { height: ITEM_HEIGHT }]}>
              <Text 
                style={[styles.item, selectedMonth === index + 1 && styles.selectedItem]}
                numberOfLines={1}
              >
                {month}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Coluna de Ano */}
        <ScrollView
          ref={yearScrollRef}
          style={styles.column}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleYearScroll}
          onScrollEndDrag={handleYearScroll}
        >
          {years.map((year) => (
            <View key={year} style={[styles.itemWrapper, { height: ITEM_HEIGHT }]}>
              <Text 
                style={[styles.item, selectedYear === year && styles.selectedItem]}
                numberOfLines={1}
              >
                {year}
              </Text>
            </View>
          ))}
        </ScrollView>
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
    gap: Spacing.sm,
    height: '100%',
  },
  column: {
    flex: 1,
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
});