// * Componente de botão de ativar modal do filtro. Esse componente serve apenas como um botão que ativa um modal específico

import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface FilterBtnProps {
  onPress: () => void;
}

export default function FilterBtn({onPress} : FilterBtnProps) {
  return (
    <View>
      <Pressable style={styles.button} onPress={onPress}>
        <MaterialCommunityIcons
          name="filter-outline"
          size={24}
          color={Colors.accent}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.bgLight,
    height: Spacing.xl,
    width: Spacing.xl,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
