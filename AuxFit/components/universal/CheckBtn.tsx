// * Componente de botão de check. Alterna entre um estado marcado e desmarcado ao ser pressionado. Recebe os valores de tamanho e a lógica de mudança de estado como props
// TODO adicionar função futuramente para mudar o estado no banco também

import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface CheckBtnProps {
  size?: number;
  iconSize?: number;
  onPress: () => void;
  isChecked: boolean;
}

export default function CheckBtn({
  size,
  iconSize,
  onPress,
  isChecked,
}: CheckBtnProps) {
  // const handlePress = () => {
  //   setIsChecked((prev) => !prev);
  //   onPress();
  // };

  return (
    <Pressable
      style={[
        styles.container,
        isChecked ? styles.containerChecked : styles.containerUnchecked,
        { width: size ?? 32, height: size ?? 32 }, // condição de estilo pra caso haja a prop "size"
      ]}
      onPress={onPress}
    >
      {isChecked && (
        <MaterialIcons
          name="check"
          size={iconSize ? iconSize : 24}
          color={Colors.bg}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  containerUnchecked: {
    borderWidth: 1,
    borderColor: Colors.subtext,
  },
  containerChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
