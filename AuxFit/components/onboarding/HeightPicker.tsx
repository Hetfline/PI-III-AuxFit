import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface HeightPickerProps {
  selectedHeight: number;
  onHeightChange: (height: number) => void;
}

const ITEM_HEIGHT = 50;

export default function HeightPicker({
  selectedHeight,
  onHeightChange,
}: HeightPickerProps) {
  const heightScrollRef = useRef<ScrollView>(null);
  
  // Alturas de 100 a 250 cm
  const heights = Array.from({ length: 151 }, (_, i) => i + 100);
  
  // Scroll inicial para o item selecionado
  useEffect(() => {
    setTimeout(() => {
      const heightIndex = heights.indexOf(selectedHeight);
      heightScrollRef.current?.scrollTo({
        y: heightIndex * ITEM_HEIGHT,
        animated: false,
      });
    }, 100);
  }, []);
  
  const handleHeightScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const newHeight = heights[index];
    if (newHeight && newHeight !== selectedHeight) {
      onHeightChange(newHeight);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Indicador central */}
      <View style={styles.centerIndicator} />
      
      <View style={styles.pickersRow}>
        {/* Coluna de Altura */}
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
            <View
              key={height}
              style={[styles.itemWrapper, { height: ITEM_HEIGHT }]}
            >
              <Text
                style={[
                  styles.item,
                  selectedHeight === height && styles.selectedItem,
                ]}
                numberOfLines={1}
              >
                {height} cm
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
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  centerIndicator: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    marginTop: -ITEM_HEIGHT / 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    zIndex: 1,
    pointerEvents: "none",
  },
  pickersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    height: "100%",
  },
  column: {
    width: 70,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: "center",
  },
  itemWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    ...Texts.body,
    fontSize: 16,
    color: Colors.subtext,
    textAlign: "center",
  },
  selectedItem: {
    color: Colors.text,
    fontSize: 17,
    fontFamily: "MontserratBold",
  },
  unitWrapper: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  unit: {
    ...Texts.body,
    fontSize: 17,
    color: Colors.text,
    fontFamily: "MontserratBold",
  },
});