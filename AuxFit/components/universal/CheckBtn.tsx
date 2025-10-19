// * Componente de botão de check. Alterna entre um estado marcado e desmarcado ao ser pressionado. Recebe os valores de tamanho e a lógica de mudança de estado como props
// TODO adicionar função futuramente para mudar o estado no banco também

import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface CheckBtnProps {
  size?: number;
  onPress: () => void;
}

export default function CheckBtn({ size, onPress }: CheckBtnProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    setIsChecked((prev) => !prev);
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.container,
        isChecked ? styles.containerChecked : styles.containerUnchecked,
      ]}
      onPress={handlePress}
    >
      {isChecked && (
        <MaterialIcons name="check" size={size ? size : 24} color={Colors.bg} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Spacing.lg,
    height: Spacing.lg,
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
