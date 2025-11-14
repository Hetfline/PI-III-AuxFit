// * Componente de item que foi filtrado pelo componente FilterModal.

import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FilteredItemProps {
  name: string;
  onRemove: (name: string) => void;
}

export default function FilteredItem({ name, onRemove }: FilteredItemProps) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Pressable onPress={() => onRemove(name)}>
        <MaterialCommunityIcons
          name="close"
          size={20}
          color={Colors.bg}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    gap: Spacing.xs,
    height: 35
  },
});
