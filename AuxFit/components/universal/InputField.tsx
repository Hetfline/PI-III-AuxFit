// * Componente de campo de input. Permite que sejam passados vários props que definem o ícone, placeholder e tipo do input (senha, texto normal, etc.)
// ? precisa adicionar prop para mudar o tamanho do input?

import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  TextInputProps,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

interface InputFieldProps extends TextInputProps {
  placeholder: string,
  // esse extends faz com que o componente InputFieldProps receba também os props que o componente padrão TextInput
  icon?: React.ComponentProps<typeof MaterialIcons>["name"];
  iconColor?: string;
  password?: boolean;
  onIconPress?: () => void;
}

export default function InputField({
  icon,
  iconColor,
  placeholder,
  password,
  onIconPress,
  ...rest
}: InputFieldProps) {
  const [seePassword, setSeePassword] = useState(false); // variável para alternar a visibilidade do input de senha

  if (password) {
    return (
      <View style={styles.passwordContainer}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={24}
            color={Colors.subtext}
            style={{ marginRight: Spacing.sm }}
          />
        )}
        <TextInput
          secureTextEntry={!seePassword}
          style={[Texts.body, { flex: 1, color: Colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.subtext}
          {...rest}
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
        {icon && (
          <Pressable onPress={onIconPress}>
            <MaterialIcons
              name={icon}
              size={24}
              color={iconColor || Colors.subtext}
              style={{ marginRight: Spacing.sm }}
            />
          </Pressable>
        )}
        <TextInput
          style={[Texts.body, { flex: 1, color: Colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.subtext}
          {...rest}
        />
      </View>
    );
  }
}

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
