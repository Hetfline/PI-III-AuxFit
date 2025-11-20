// * Componente de header de tela. Ele mostra uma seta para retornar à tela anterior, um título, subtítulo e um botão de opções
// TODO adicionar função de abrir opções ao clicar no ícone "more-vert" e adicionar dropdown no título

import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useState, useEffect } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  backArrow?: boolean;
  streak?: boolean;
  onIconPress?: () => void;
}

export default function Header({
  title,
  subtitle,
  subtitleColor,
  backArrow,
  streak,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.containerArrowTitles}>
        {backArrow && (
          <MaterialIcons
            name="arrow-back"
            size={32}
            color={Colors.primary}
            style={{ marginRight: Spacing.md }}
            onPress={() => router.back()}
          />
        )}
        <View style={styles.containerTitles}>
          <Text style={Texts.subtitle}>{title}</Text>
          {subtitle && (
            <Text style={[Texts.subtext, { color: subtitleColor, flexShrink: 1,
        flexWrap: "wrap" }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {streak && (
        <View style={styles.streakContainer}>
          <MaterialIcons
            name="local-fire-department"
            size={24}
            color={Colors.accent}
          />
          <Text style={[Texts.bodyBold, { color: Colors.accent }]}>3</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: Spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerArrowTitles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerTitles: {
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "90%",
  },
  streakContainer: {
    flexDirection: "row",
    gap: Spacing.xs,
    alignItems: "center",
  },
});
