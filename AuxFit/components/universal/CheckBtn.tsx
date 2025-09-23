// * Componente de botão de check. Alterna entre um estado marcado e desmarcado ao ser pressionado.
// TODO adicionar função futuramente para mudar o estado no banco também

import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CheckBtn() {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable
      style={[
        styles.container,
        checked ? styles.containerChecked : styles.containerUnchecked,
      ]}
      onPress={() => setChecked((prev) => !prev)}
    >
      {checked && <MaterialIcons name="check" size={24} color={Colors.bg} />}
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
