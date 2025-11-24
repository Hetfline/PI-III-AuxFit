import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";

type TabSelectorProps = {
  activeTab: "geral" | "dieta" | "treino";
  onTabChange?: (tab: "geral" | "dieta" | "treino") => void;
};

export default function ProfileTabSelector({
  activeTab,
  onTabChange,
}: TabSelectorProps) {
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  const handlePress = (tab: "geral" | "dieta" | "treino") => {
    onTabChange?.(tab);
  };

  useEffect(() => {
    const tabIndex =
      activeTab === "geral" ? 0 : activeTab === "dieta" ? 1 : 2;

    Animated.timing(underlineAnim, {
      toValue: tabIndex,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTabWidth(width / 3);
  };

  const translateX = underlineAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, tabWidth, tabWidth * 2],
  });

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.tabs}>
        <Pressable onPress={() => handlePress("geral")} style={styles.tab}>
          <Text
            style={[
              Texts.subtitle,
              activeTab === "geral"
                ? { color: Colors.primary }
                : { color: Colors.subtext },
            ]}
          >
            Geral
          </Text>
        </Pressable>

        <Pressable onPress={() => handlePress("dieta")} style={styles.tab}>
          <Text
            style={[
              Texts.subtitle,
              activeTab === "dieta"
                ? { color: Colors.primary }
                : { color: Colors.subtext },
            ]}
          >
            Dieta
          </Text>
        </Pressable>

        <Pressable onPress={() => handlePress("treino")} style={styles.tab}>
          <Text
            style={[
              Texts.subtitle,
              activeTab === "treino"
                ? { color: Colors.primary }
                : { color: Colors.subtext },
            ]}
          >
            Treino
          </Text>
        </Pressable>
      </View>

      <View style={styles.underlineContainer}>
        <Animated.View
          style={[styles.underline, { width: tabWidth, transform: [{ translateX }] }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  tabs: { flexDirection: "row" },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10 },
  underlineContainer: {
    height: 2,
    backgroundColor: "hsl(0, 0%, 60%)",
    position: "relative",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: Colors.correct,
  },
});
