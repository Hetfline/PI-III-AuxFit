// * Componente de histórico de alimentos. Recebe a função onPress como prop.
// TODO adicionar props para se encaixar com as requisições do banco

import { View, StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface FoodHistoryProps {
    onPress: () => void
}

export default function FoodHistory({onPress}: FoodHistoryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.foodItem}>
        <MaterialIcons name="history" size={24} color={Colors.subtext} />
        <Text style={[Texts.body, {color: Colors.subtext}]}>Alimento</Text>
      </View>
      <Pressable hitSlop={15} onPress={onPress}>
        <MaterialIcons color={Colors.primary} name="arrow-outward" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  foodItem: {
    flexDirection: "row",
    gap: Spacing.md,
  },
});
