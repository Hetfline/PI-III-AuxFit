// * Componente de botão. Permite que sejam passados vários props que definem o a sua cor, o seu título, sua função e se tem ícone ou não.

import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

interface ButtonProps {
  bgColor?: string;
  color?: string;
  onPress: () => void;
  title: string;
  icon?: string;
  radius?: number;
  dashBorder?: boolean;
  borderColor?: string;
}

export default function Button({
  bgColor,
  color,
  onPress,
  title,
  icon,
  radius,
  dashBorder,
  borderColor,
}: ButtonProps) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        styles.container,
        dashBorder ? styles.dashBorder : null,
        {
          backgroundColor: bgColor || Colors.primary,
          borderRadius: radius || 40,
          borderColor: borderColor || 'transparent',
          borderWidth: 3
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[Texts.button, { color: color || Colors.bg }]}>
          {title || "Button"}
        </Text>
        {icon && (
          <MaterialIcons
            name="add"
            size={24}
            color={color || Colors.bg}
            style={{ marginLeft: Spacing.sm }}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dashBorder: {
    borderWidth: 1,
    borderStyle: "dashed",
  },
});
