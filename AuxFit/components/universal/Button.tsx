// * Componente de botão. Permite que sejam passados vários props que definem o a sua cor, o seu título, sua função e se tem ícone ou não.

import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons"; 

export default function Button(props: any) {
  return (
    <Pressable style={[styles.container, { backgroundColor: props.color || Colors.primary }]} onPress={props.onPress}>
      <Text style={[Texts.button, { color: Colors.bg }]}>{props.title || "Button"}</Text>
      {props.icon && <MaterialIcons name="add" size={24} color={Colors.bg} style={{ marginLeft: Spacing.sm }} />}
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