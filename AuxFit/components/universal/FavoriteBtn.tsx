// * Componente de favorito (Geladeira).
// Gerencia o estado visual de item na geladeira/despensa.

import { StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing } from "@/constants/Styles";

interface FavoriteBtnProps {
  initialState?: boolean;
  onToggle?: (newState: boolean) => void;
}

export default function Favorite({ initialState = false, onToggle }: FavoriteBtnProps) {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const handlePress = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      hitSlop={10}
    >
      {isFavorite ? (
        <MaterialCommunityIcons 
          name="fridge" 
          size={30} 
          color={Colors.accent} 
        />
      ) : (
        <MaterialCommunityIcons
          name="fridge-outline"
          size={30}
          color={Colors.subtext}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Spacing.lg,
    height: Spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },
});