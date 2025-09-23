// * Componente de favorito. Ele consiste de uma simples função que muda o valor do useState para que a aparência do botão mude
// TODO adicionar função futuramente para mudar o estado no banco também

import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

export default function Favorite() {
  const [favorite, setFavorite] = useState(false);

  return (
    <Pressable
      onPress={() => setFavorite((prev) => !prev)}
      style={styles.container}
    >
      {favorite ? (
        <MaterialIcons
          name="favorite-border"
          size={32}
          color={Colors.subtext}
        />
      ) : (
        <MaterialIcons name="favorite" size={32} color={Colors.incorrect} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Spacing.lg,
    height: Spacing.lg,
    // backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
