import React, { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, Animated, StyleSheet, LayoutChangeEvent } from "react-native";

type TabSelectorProps = {
  activeTab: "treino" | "exercicios";
  onTabChange?: (tab: "treino" | "exercicios") => void;
};

export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  const handlePress = (tab: "treino" | "exercicios") => {
    onTabChange?.(tab);
  };

  useEffect(() => {
    Animated.timing(underlineAnim, {
      toValue: activeTab === "treino" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTabWidth(width / 2);
  };

  const translateX = underlineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabWidth],
  });

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.tabs}>
        <Pressable onPress={() => handlePress("treino")} style={styles.tab}>
          <Text
            style={[
              styles.text,
              activeTab === "treino" ? styles.activeText : styles.inactiveText,
            ]}
          >
            Treino
          </Text>
        </Pressable>

        <Pressable onPress={() => handlePress("exercicios")} style={styles.tab}>
          <Text
            style={[
              styles.text,
              activeTab === "exercicios" ? styles.activeText : styles.inactiveText,
            ]}
          >
            Exercícios
          </Text>
        </Pressable>
      </View>

      <View style={styles.underlineContainer}>
        <Animated.View
          style={[
            styles.underline,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  tabs: { flexDirection: "row" },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10 },
  text: { fontSize: 16, fontWeight: "600" },
  activeText: { color: "hsl(151, 100%, 45%)" },
  inactiveText: { color: "hsl(0, 0%, 60%)" },
  underlineContainer: { height: 2, backgroundColor: "hsl(0, 0%, 60%)", position: "relative" },
  underline: { position: "absolute", bottom: 0, left: 0, width: "50%", height: 2, backgroundColor: "hsl(151, 100%, 45%)" },
});
