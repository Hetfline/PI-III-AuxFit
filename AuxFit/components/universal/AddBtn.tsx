// * Componente de botão de adicionar. O único prop passado pra ele é a sua função onPress
// TODO adicionar função para fazer requisições no banco também

import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Colors, Spacing} from "@/constants/Styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AddBtn(props: any) {
  return (
    <Pressable style={styles.container} onPress={() => props.onPress}>
      <MaterialIcons name="add" size={24} color={Colors.primary} />
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
    backgroundColor: Colors.bgLight
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
