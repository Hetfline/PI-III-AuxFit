import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

interface FoodCardProps {
  name: string;
  calories: number;
  baseUnit: string; // ex: "100g", "1un"
  onPress: () => void;
}

export default function FoodCard({ name, calories, baseUnit, onPress }: FoodCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 }
      ]}
      onPress={onPress}
    >
      
      <View style={styles.infoContainer}>
        <Text style={Texts.bodyBold}>{name}</Text>
        <Text style={[Texts.subtext, { color: Colors.subtext }]}>
          {calories} kcal ({baseUnit})
        </Text>
      </View>

      <MaterialIcons name="add-circle-outline" size={28} color={Colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgMedium,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
});