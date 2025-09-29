// * Componente de campo de input. Permite que sejam passados vários props que definem o ícone, placeholder e tipo do input (senha, texto normal, etc.)
// ? precisa adicionar prop para mudar o tamanho do input?

import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

const InputField = (props: any) => {
  const [seePassword, setSeePassword] = useState(false); // variável para alternar a visibilidade do input de senha

  if (props.password) {
    return (
      <View style={styles.passwordContainer}>
        <MaterialIcons
          name={props.icon}
          size={24}
          color={Colors.subtext}
          style={{ marginRight: Spacing.sm }}
        />
        <TextInput
          secureTextEntry={!seePassword}
          style={[Texts.body, { flex: 1 }]}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.subtext}
        />

        <Pressable onPress={() => setSeePassword((prev) => !prev)}>
          <MaterialIcons
            name={seePassword ? "visibility" : "visibility-off"}
            size={24}
            color={Colors.subtext}
          />
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {props.icon && (
          <Pressable onPress={() => props.onPress}>
            <MaterialIcons
              name={props.icon}
              size={24}
              color={props.iconColor ? props.color : Colors.subtext}
              style={{ marginRight: Spacing.sm }}
            />
          </Pressable>
        )}
        <TextInput
          style={[Texts.body, { flex: 1 }]}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.subtext}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    minWidth: 200,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.bgLight,
    paddingHorizontal: Spacing.md,
    borderRadius: 40,
  },
  passwordContainer: {
    height: 48,
    minWidth: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgLight,
    paddingHorizontal: Spacing.md,
    borderRadius: 40,
  },
});

export default InputField;
