// * Componente de botão. Permite que sejam passados vários props que definem o a sua cor, o seu título, sua função e se tem ícone ou não.

import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons"; 

interface ButtonProps {
  bgColor?: string;
  onPress: () => void;
  title: string;
  icon?: string,
}

export default function Button({bgColor, onPress, title, icon} : ButtonProps) {
  return (
    <Pressable style={[styles.container, { backgroundColor: bgColor || Colors.primary }]} onPress={onPress}>
      <Text style={[Texts.button, { color: Colors.bg }]}>{title || "Button"}</Text>
      {icon && <MaterialIcons name="add" size={24} color={Colors.bg} style={{ marginLeft: Spacing.sm }} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})